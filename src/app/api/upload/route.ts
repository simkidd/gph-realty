import { uploadImage } from "@/lib/cloudinary";
import { prisma } from "@/lib/prisma";
import { Prisma } from "@prisma/client";
import * as Cloudinary from "cloudinary";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    // Verify content type
    if (!req.headers.get("content-type")?.startsWith("multipart/form-data")) {
      return NextResponse.json(
        { error: "Unsupported Media Type: Must be multipart/form-data" },
        { status: 415 }
      );
    }

    const formData = await req.formData();

    const file = formData.get("file") as File;
    const propertyId = formData.get("propertyId") as string;
    const roomName = formData.get("roomName") as string;

    if (!(file instanceof File) || file.size === 0) {
      return NextResponse.json(
        { error: "Invalid or empty file" },
        { status: 400 }
      );
    }

    if (!propertyId) {
      return NextResponse.json(
        { error: "Missing propertyId" },
        { status: 400 }
      );
    }

    // Configure upload options
    const baseFolder = `gph-realty/properties/${propertyId}`;
    const isRoomImage = !!roomName;

    const uploadOptions: Cloudinary.UploadApiOptions = {
      folder: isRoomImage ? `${baseFolder}/rooms` : baseFolder,
      transformation: [
        { quality: "auto:best" },
        { fetch_format: "webp" },
        ...(isRoomImage
          ? [
              { width: 3840, crop: "limit" }, // 4K width limit for panoramas
              { dpr: "auto" },
            ]
          : [
              { width: 1920, crop: "scale" }, // Standard property images
            ]),
      ],
      flags: ["progressive", "strip_profile"],
      overwrite: false,
    };

    // Upload to Cloudinary with error handling
    let result: Cloudinary.UploadApiResponse;
    try {
      result = await uploadImage(file as File, uploadOptions);
    } catch (error) {
      console.error("Cloudinary upload failed:", error);
      return NextResponse.json(
        { error: "Failed to upload image to storage" },
        { status: 500 }
      );
    }

    // Handle database update
    const updateInput = isRoomImage
      ? await updateRoom(propertyId, roomName, result)
      : await updatePropertyImages(propertyId, result);

    const updatedProperty = await prisma.property.update({
      where: { id: propertyId },
      data: updateInput,
    });

    return NextResponse.json({
      success: true,
      image: {
        imageUrl: result.secure_url,
        publicId: result.public_id,
        format: result.format,
        dimensions: `${result.width}x${result.height}`,
        size: formatBytes(result.bytes),
        folder: result.folder,
      },
      property: {
        id: updatedProperty.id,
        name: updatedProperty.name,
      },
    });
  } catch (error) {
    console.error("Upload error:", error);
    return NextResponse.json(
      {
        error: error instanceof Error ? error.message : "Failed to upload file",
      },
      { status: 500 }
    );
  }
}

// Function to update property images
async function updatePropertyImages(
  propertyId: string,
  result: Cloudinary.UploadApiResponse
): Promise<Prisma.PropertyUpdateInput> {
  try {
    const property = await prisma.property.findUnique({
      where: { id: propertyId },
      select: { images: true },
    });

    const currentImages = (property?.images || []) as Array<{
      publicId: string;
      imageUrl: string;
    }>;

    return {
      images: [
        ...currentImages,
        {
          publicId: result.public_id,
          imageUrl: result.secure_url,
        },
      ],
    };
  } catch (error) {
    console.error(`Failed to update property images: ${propertyId}`, error);
    throw new Error(
      error instanceof Error
        ? error.message
        : "Database update failed for property images"
    );
  }
}

// Helper function to update rooms array
async function updateRoom(
  propertyId: string,
  roomName: string,
  result: Cloudinary.UploadApiResponse
): Promise<Prisma.PropertyUpdateInput> {
  try {
    const property = await prisma.property.findUnique({
      where: { id: propertyId },
      select: { rooms: true },
    });

    const currentRooms = (property?.rooms || []) as Array<{
      name: string;
      publicId: string;
      imageUrl: string;
    }>;

    return {
      rooms: [
        ...currentRooms,
        {
          name: roomName,
          publicId: result.public_id,
          imageUrl: result.secure_url,
        },
      ],
    };
  } catch (error) {
    console.error(
      `Failed to update room images: ${propertyId} - ${roomName}`,
      error
    );
    throw new Error("Database update failed for room images");
  }
}

// Helper function to format bytes
function formatBytes(bytes: number, decimals = 2) {
  if (bytes === 0) return "0 Bytes";
  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ["Bytes", "KB", "MB", "GB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + " " + sizes[i];
}
