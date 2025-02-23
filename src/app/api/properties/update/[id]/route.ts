import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { isAdmin } from "@/lib/roles";
import { slugify } from "@/utils/helpers";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

const propertySchema = z.object({
  name: z.string().min(3, "Name must be at least 3 characters"),
  description: z.string().min(10, "Description must be at least 10 characters"),
  status: z.enum(["available", "unavailable"]),
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

export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Check if user is admin/superadmin
    if (!isAdmin(session)) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    const { id } = await params;

    const body = await req.json();
    const validation = propertySchema.safeParse(body);

    if (!validation.success) {
      return NextResponse.json(
        { errors: validation.error.flatten() },
        { status: 400 }
      );
    }

    const existingProperty = await prisma.property.findUnique({
      where: { id },
    });

    if (!existingProperty) {
      return NextResponse.json(
        { error: "Property not found" },
        { status: 404 }
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

    const updatedProperty = await prisma.property.update({
      where: { id },
      data: {
        ...validation.data,
        slug,
      },
    });

    return NextResponse.json(updatedProperty);
  } catch (error) {
    return NextResponse.json(
      { error: `Failed to update property>>> ${error}` },
      { status: 500 }
    );
  }
}
