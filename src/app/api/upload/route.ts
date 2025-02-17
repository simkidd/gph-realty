// import { NextResponse } from 'next/server';
// import { v2 as cloudinary } from 'cloudinary';

// cloudinary.config({
//   cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
//   api_key: process.env.CLOUDINARY_API_KEY,
//   api_secret: process.env.CLOUDINARY_API_SECRET,
// });

// export async function POST(request: Request) {
//   const data = await request.formData();
//   const file = data.get('file') as File;

//   if (!file) {
//     return NextResponse.json(
//       { error: 'No file uploaded' },
//       { status: 400 }
//     );
//   }

//   try {
//     const bytes = await file.arrayBuffer();
//     const buffer = Buffer.from(bytes);

//     const result = await new Promise((resolve, reject) => {
//       cloudinary.uploader
//         .upload_stream(
//           { folder: 'property-images', resource_type: 'auto' },
//           (error, result) => {
//             if (error) reject(error);
//             else resolve(result);
//           }
//         )
//         .end(buffer);
//     });

//     return NextResponse.json(result);
//   } catch (error) {
//     return NextResponse.json(
//       { error: 'Failed to upload file' },
//       { status: 500 }
//     );
//   }
// }