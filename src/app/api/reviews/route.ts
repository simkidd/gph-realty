// app/api/reviews/route.ts
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { z } from "zod";
import { isAdmin } from "@/lib/roles";

// Zod schema for review validation
const reviewSchema = z.object({
  content: z.string().min(10, "Review must be at least 10 characters"),
  rating: z.number().int().min(1).max(5),
  propertyId: z.string().min(1, "Property ID is required"),
});

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const propertyId = searchParams.get("propertyId");
    const userId = searchParams.get("userId");

    // Get reviews for a specific property
    if (propertyId) {
      const reviews = await prisma.review.findMany({
        where: { propertyId },
        include: {
          user: {
            select: {
              id: true,
              name: true,
              image: true,
            },
          },
          property: {
            select: {
              id: true,
              name: true,
            },
          },
        },
        orderBy: { createdAt: "desc" },
      });
      return NextResponse.json(reviews);
    }

    // Get reviews by a specific user
    if (userId) {
      const reviews = await prisma.review.findMany({
        where: { userId },
        include: {
          property: {
            select: {
              id: true,
              name: true,
              slug: true,
            },
          },
        },
        orderBy: { createdAt: "desc" },
      });
      return NextResponse.json(reviews);
    }

    return NextResponse.json(
      { error: "propertyId or userId required" },
      { status: 400 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: `Failed to fetch reviews>>>> ${error}` },
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

    const body = await req.json();
    const validation = reviewSchema.safeParse(body);

    if (!validation.success) {
      return NextResponse.json(
        { errors: validation.error.flatten() },
        { status: 400 }
      );
    }

    // Check if user already reviewed this property
    const existingReview = await prisma.review.findFirst({
      where: {
        userId: session.user.id,
        propertyId: validation.data.propertyId,
      },
    });

    if (existingReview) {
      return NextResponse.json(
        { error: "You've already reviewed this property" },
        { status: 409 }
      );
    }

    const review = await prisma.review.create({
      data: {
        ...validation.data,
        userId: session.user.id,
      },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            image: true,
          },
        },
        property: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    });

    return NextResponse.json(review, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: `Failed to create review>>> ${error}` },
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

    const { searchParams } = new URL(req.url);
    const reviewId = searchParams.get("id");
    if (!reviewId) {
      return NextResponse.json(
        { error: "Review ID required" },
        { status: 400 }
      );
    }

    const body = await req.json();
    const validation = reviewSchema.safeParse(body);

    if (!validation.success) {
      return NextResponse.json(
        { errors: validation.error.flatten() },
        { status: 400 }
      );
    }

    // Verify review ownership
    const existingReview = await prisma.review.findUnique({
      where: { id: reviewId },
    });

    if (!existingReview) {
      return NextResponse.json({ error: "Review not found" }, { status: 404 });
    }

    if (existingReview.userId !== session.user.id && !isAdmin(session)) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    const updatedReview = await prisma.review.update({
      where: { id: reviewId },
      data: {
        content: validation.data.content,
        rating: validation.data.rating,
      },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            image: true,
          },
        },
      },
    });

    return NextResponse.json(updatedReview);
  } catch (error) {
    return NextResponse.json(
      { error: `Failed to update review>>> ${error}` },
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

    const { searchParams } = new URL(req.url);
    const reviewId = searchParams.get("id");
    if (!reviewId) {
      return NextResponse.json(
        { error: "Review ID required" },
        { status: 400 }
      );
    }

    const existingReview = await prisma.review.findUnique({
      where: { id: reviewId },
    });

    if (!existingReview) {
      return NextResponse.json({ error: "Review not found" }, { status: 404 });
    }

    if (existingReview.userId !== session.user.id && !isAdmin(session)) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    await prisma.review.delete({ where: { id: reviewId } });
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json(
      { error: `Failed to delete review>>> ${error}` },
      { status: 500 }
    );
  }
}
