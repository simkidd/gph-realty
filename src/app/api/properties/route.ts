import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { z } from "zod";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { slugify } from "@/utils/helpers/slugify";
import { isAdmin } from "@/lib/roles";

// Zod schema for property validation
const propertySchema = z.object({
  name: z.string().min(3, "Name must be at least 3 characters"),
  description: z.string().min(10, "Description must be at least 10 characters"),
  images: z
    .array(
      z.object({
        publicId: z.string(),
        imageUrl: z.string().url("Invalid image URL format"),
      })
    )
    .min(1, "At least one image is required"),
  status: z.enum([
    "development",
    "construction",
    "completed",
    "sale",
    "rent",
    "sold",
  ]),
  location: z.string().min(3, "Location must be at least 3 characters"),
  price: z.number().positive("Price must be a positive number"),
  type: z.string().optional(),
  beds: z.number().int().positive("Beds must be a positive integer").optional(),
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
  address: z.string().optional(),
  features: z.array(z.string()).optional(),
  virtualTour: z.boolean().optional(),
  rooms: z
    .array(
      z.object({
        name: z.string().min(1, "Room name is required"),
        publicId: z.string(),
        imageUrl: z.string().url("Invalid room image URL"),
      })
    )
    .optional(),
});

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");
    const slug = searchParams.get("slug");

    // Get single property by ID
    if (id) {
      const property = await prisma.property.findUnique({
        where: { id },
        include: { reviews: true },
      });

      if (!property) {
        return NextResponse.json(
          {
            error: "Property not found",
          },
          { status: 404 }
        );
      }
      return NextResponse.json(property);
    }

    // Get single property by slug
    if (slug) {
      const property = await prisma.property.findUnique({
        where: { slug },
        include: { reviews: true },
      });

      if (!property) {
        return NextResponse.json(
          { error: "Property not found" },
          { status: 404 }
        );
      }
      return NextResponse.json(property);
    }

    // Get all properties with pagination
    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "10");
    const skip = (page - 1) * limit;

    const [properties, total] = await Promise.all([
      prisma.property.findMany({
        skip,
        take: limit,
        orderBy: { createdAt: "desc" },
      }),
      prisma.property.count(),
    ]);

    return NextResponse.json({
      data: properties,
      meta: {
        total,
        page,
        totalPages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    return NextResponse.json(
      { error: `Failed to fetch properties>>> ${error}` },
      { status: 500 }
    );
  }
}

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

    const property = await prisma.property.create({
      data: {
        ...validation.data,
        slug,
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

export async function PUT(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Check if user is admin/superadmin
    if (!isAdmin(session)) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");
    if (!id) {
      return NextResponse.json(
        { error: "Property ID required" },
        { status: 400 }
      );
    }

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

    const updatedProperty = await prisma.property.update({
      where: { id },
      data: validation.data,
    });

    return NextResponse.json(updatedProperty);
  } catch (error) {
    return NextResponse.json(
      { error: `Failed to update property>>> ${error}` },
      { status: 500 }
    );
  }
}

export async function DELETE(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Check if user is admin/superadmin
    if (!isAdmin(session)) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");
    if (!id) {
      return NextResponse.json(
        { error: "Property ID required" },
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

    await prisma.property.delete({ where: { id } });
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json(
      { error: `Failed to delete property>>> ${error}` },
      { status: 500 }
    );
  }
}
