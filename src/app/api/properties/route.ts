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

    // Initialize base WHERE conditions
    const whereConditions: Prisma.Sql[] = [];

    // Handle search query
    if (search) {
      whereConditions.push(Prisma.sql`
        (name ILIKE ${`%${search}%`} 
        OR description ILIKE ${`%${search}%`} 
        OR location ILIKE ${`%${search}%`})
      `);
    }

    // Handle draft status
    if (typeof isDraft === "boolean") {
      whereConditions.push(Prisma.sql`draft = ${isDraft}`);
    }

    // Handle status filter
    const status = searchParams.get("status");
    if (status) {
      whereConditions.push(Prisma.sql`status = ${status}`);
    }

    // Handle location filter
    const location = searchParams.get("location");
    if (location) {
      whereConditions.push(Prisma.sql`location = ${location}`);
    }

    // Handle type filter
    const type = searchParams.get("type");
    if (type) {
      whereConditions.push(Prisma.sql`type = ${type}`);
    }

    // Handle rooms filter (JSON array length)
    const roomsParam = searchParams.get("rooms");
    if (roomsParam) {
      const roomsValue = parseInt(roomsParam);
      if (!isNaN(roomsValue)) {
        whereConditions.push(
          Prisma.sql`jsonb_array_length(rooms) = ${roomsValue}`
        );
      }
    }

    // Handle beds filter
    const bedsParam = searchParams.get("beds");
    if (bedsParam) {
      const beds = parseInt(bedsParam);
      if (!isNaN(beds)) {
        whereConditions.push(Prisma.sql`beds = ${beds}`);
      }
    }

    // Handle baths filter
    const bathsParam = searchParams.get("baths");
    if (bathsParam) {
      const baths = parseInt(bathsParam);
      if (!isNaN(baths)) {
        whereConditions.push(Prisma.sql`baths = ${baths}`);
      }
    }

    // Handle priceRange filter
    const priceRangeParam = searchParams.get("priceRange");
    if (priceRangeParam) {
      const [minStr, maxStr] = priceRangeParam.split(",");
      const min = parseFloat(minStr);
      const max = parseFloat(maxStr);
      if (!isNaN(min) && !isNaN(max)) {
        whereConditions.push(Prisma.sql`price BETWEEN ${min} AND ${max}`);
      }
    }

    // Handle area filter
    const areaParam = searchParams.get("area");
    if (areaParam) {
      const [minStr, maxStr] = areaParam.split(",");
      const min = parseFloat(minStr);
      const max = parseFloat(maxStr);
      if (!isNaN(min) && !isNaN(max)) {
        whereConditions.push(Prisma.sql`area BETWEEN ${min} AND ${max}`);
      }
    }

    // Build final WHERE clause
    const whereClause =
      whereConditions.length > 0
        ? Prisma.sql`WHERE ${Prisma.join(whereConditions, " AND ")}`
        : Prisma.empty;

    // Fetch paginated results
    const query = Prisma.sql`
      SELECT * FROM "properties"
      ${whereClause}
      ORDER BY "createdAt" DESC
      LIMIT ${limit}
      OFFSET ${skip}
    `;

    // Fetch total count
    const countQuery = Prisma.sql`
      SELECT COUNT(*)::int FROM "properties"
      ${whereClause}
    `;

    const [properties, totalResult] = await prisma.$transaction([
      prisma.$queryRaw(query),
      prisma.$queryRaw<{ count: number }[]>(countQuery),
    ]);

    const total = totalResult[0]?.count || 0;

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
