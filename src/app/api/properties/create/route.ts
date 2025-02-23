import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { isAdmin } from "@/lib/roles";
import { slugify } from "@/utils/helpers";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { z } from "zod";

const generatePropertyCode = async (): Promise<string> => {
  const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let code: string;
  let existingProperty; // Declare variable before the loop

  do {
    code = "GPH"; // Prefix
    for (let i = 0; i < 5; i++) {
      code += characters.charAt(Math.floor(Math.random() * characters.length));
    }

    // Check if the generated code already exists in the database
    existingProperty = await prisma.property.findUnique({
      where: { propertyCode: code },
    });

  } while (existingProperty); // Keep generating if a duplicate is found

  return code;
};



// Zod schema for property validation
const propertySchema = z.object({
  name: z.string().min(3, "Name must be at least 3 characters"),
  description: z.string().min(10, "Description must be at least 10 characters"),
  location: z.string().min(3, "Location must be at least 3 characters"),
  price: z.number().positive("Price must be a positive number"),
  type: z.string().optional(),
  beds: z.number().int().positive("Beds must be a positive integer").optional(),
  lobbies: z
    .number()
    .int()
    .positive("Lobbies must be a positive integer")
    .optional(),
  baths: z
    .number()
    .int()
    .positive("Baths must be a positive integer")
    .optional(),
  squareFeet: z
    .number()
    .positive("Square feet must be a positive number")
    .optional(),
  amenities: z.array(z.string()).optional(),
  features: z.array(z.string()).optional(),
  virtualTour: z.boolean().optional(),
});

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Check if user is admin/superadmin
    if (!isAdmin(session)) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    const body = await req.json();
    const validation = propertySchema.safeParse(body);

    if (!validation.success) {
      return NextResponse.json(
        { errors: validation.error.flatten() },
        { status: 400 }
      );
    }

    const slug = slugify(validation.data.name);
    const existingSlug = await prisma.property.findUnique({ where: { slug } });

    if (existingSlug) {
      return NextResponse.json(
        { error: "Property with this name already exists" },
        { status: 409 }
      );
    }

    const propertyCode = await generatePropertyCode();

    const property = await prisma.property.create({
      data: {
        ...validation.data,
        slug,
        propertyCode,
      },
    });

    return NextResponse.json(property, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: `Failed to create property>>> ${error}` },
      { status: 500 }
    );
  }
}

