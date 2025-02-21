import { prisma } from "@/lib/prisma";
import { Prisma } from "@prisma/client";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);

    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "10");
    const search = searchParams.get("search") || "";
    const skip = (page - 1) * limit;
    const draftParam = searchParams.get("draft");

    const isDraft = draftParam ? draftParam === "true" : undefined;

    const whereCondition: Prisma.PropertyWhereInput = {};

    if (search) {
      whereCondition.OR = [
        { name: { contains: search, mode: "insensitive" } },
        { description: { contains: search, mode: "insensitive" } },
        { location: { contains: search, mode: "insensitive" } },
      ];
    }

    if (typeof isDraft === "boolean") {
      whereCondition.draft = isDraft;
    }

    const [properties, total] = await Promise.all([
      prisma.property.findMany({
        where: whereCondition,
        skip,
        take: limit,
        orderBy: { createdAt: "desc" },
      }),
      prisma.property.count({ where: whereCondition }),
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
