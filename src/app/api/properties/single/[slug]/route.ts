import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(
  req: Request,
  { params }: { params: { slug: string } }
) {
  try {
    const { slug } = params;

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
  } catch (error) {
    return NextResponse.json(
      { error: `Failed to fetch property>>> ${error}` },
      { status: 500 }
    );
  }
}
