import { config } from "@/utils/config";
import * as Cloudinary from "cloudinary";

export const cloudinary = Cloudinary.v2;

const options: Cloudinary.ConfigOptions = {
  cloud_name: config.CLOUDINARY_NAME,
  api_key: config.CLOUDINARY_KEY,
  api_secret: config.CLOUDINARY_SECRET,
};

cloudinary.config(options);


// Function to upload an image
export const uploadImage = (
  file: File,
  options?: Cloudinary.UploadApiOptions
): Promise<Cloudinary.UploadApiResponse> => {
  return new Promise(async (resolve, reject) => {
    // Convert file to buffer
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    const uploadStream = cloudinary.uploader.upload_stream(
      options,
      (error, result) => {
        if (error) {
          console.error("Cloudinary upload error:", error);
          return reject(new Error(`Upload failed: ${error.message}`));
        }

        if (!result) {
          const err = new Error("Cloudinary upload returned undefined result");
          console.error(err);
          return reject(err);
        }
        resolve(result);
      }
    );
    uploadStream.end(buffer);
  });
};

// Function to delete an image
export const deleteImage = async (
  publicId: string
): Promise<Cloudinary.DeleteApiResponse> => {
  try {
    const res = await cloudinary.uploader.destroy(publicId);
    if (res.result !== "ok") {
      throw new Error(`Failed to delete image: ${publicId}`);
    }
    return res;
  } catch (error) {
    console.error("Cloudinary delete error:", error);
    throw error;
  }
};
