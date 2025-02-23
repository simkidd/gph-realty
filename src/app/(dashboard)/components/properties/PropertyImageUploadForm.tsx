// components/PropertyImageUploader.tsx
"use client";
import Button from "@/components/ui-custom/Button";
import { Input } from "@/components/ui-custom/Input";
import { Progress } from "@/components/ui-custom/Progress";
import instance from "@/services/axios";
import { setCurrentStep } from "@/store/features/property/propertySlice";
import { useAppDispatch } from "@/store/hooks";
import { formatFileSize } from "@/utils/helpers";
import { X } from "lucide-react";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import { useDropzone } from "react-dropzone";
import { toast } from "sonner";

type RoomImage = {
  roomName: string;
  file: File;
  preview: string;
};

type PropertyFile = {
  file: File;
  preview: string;
};

export function PropertyImageUploadForm() {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const searchParams = useSearchParams();
  const propertyId = searchParams.get("propertyId");
  const [uploadType, setUploadType] = useState<"property" | "room">("property");
  const [propertyFiles, setPropertyFiles] = useState<PropertyFile[]>([]);
  const [roomFiles, setRoomFiles] = useState<RoomImage[]>([]);
  const [currentRoomName, setCurrentRoomName] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [totalSize, setTotalSize] = useState(0);
  const [uploadedBytes, setUploadedBytes] = useState(0);
  const previousLoaded = useRef<Record<number, number>>({});

  const calculateProgress = () => {
    return totalSize > 0 ? Math.round((uploadedBytes / totalSize) * 100) : 0;
  };

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      if (uploadType === "property") {
        const filesWithPreview = acceptedFiles.map((file) => ({
          file,
          preview: URL.createObjectURL(file),
        }));
        setPropertyFiles((prev) => [...prev, ...filesWithPreview]);
      } else {
        if (!currentRoomName) {
          setError("Please enter a room name first");
          return;
        }

        // Only allow one image per room
        const newFile = acceptedFiles[0];
        if (!newFile) return;

        // Create preview URL
        const preview = URL.createObjectURL(newFile);

        // Remove existing image for this room if exists
        setRoomFiles((prev) => [
          ...prev.filter((room) => room.roomName !== currentRoomName),
          { roomName: currentRoomName, file: newFile, preview },
        ]);
      }
    },
    [uploadType, currentRoomName]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "image/jpeg": [".jpeg", ".jpg"],
      "image/png": [".png"],
      "image/webp": [".webp"],
    },
    multiple: uploadType === "property",
    maxSize: 20 * 1024 * 1024,
  });

  const handleRemovePropertyImage = (index: number) => {
    setPropertyFiles((prev) => {
      const newFiles = [...prev];
      URL.revokeObjectURL(newFiles[index].preview);
      newFiles.splice(index, 1);
      return newFiles;
    });
  };

  const handleRemoveRoomImage = (roomName: string) => {
    setRoomFiles((prev) => prev.filter((room) => room.roomName !== roomName));
  };

  // Cleanup preview URLs
  useEffect(() => {
    return () => {
      propertyFiles.forEach((file) => URL.revokeObjectURL(file.preview));
      roomFiles.forEach((room) => URL.revokeObjectURL(room.preview));
    };
  }, [propertyFiles, roomFiles]);

  const handleUpload = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");
    previousLoaded.current = {};

    try {
      const files = uploadType === "property" ? propertyFiles : roomFiles;
      if (files.length === 0) {
        setError(`Please select at least one ${uploadType} image`);
        return;
      }

      // Calculate total size
      const total = files.reduce((acc, item) => {
        const size =
          uploadType === "property"
            ? (item as PropertyFile).file.size
            : (item as RoomImage).file.size;
        return acc + size;
      }, 0);
      setTotalSize(total);
      setUploadedBytes(0);

      // Create upload promises
      const uploadPromises = files.map((item, index) => {
        const formData = new FormData();
        formData.append("propertyId", propertyId!);

        let file: File;
        if (uploadType === "property") {
          const propertyItem = item as PropertyFile;
          file = propertyItem.file;
        } else {
          const roomItem = item as RoomImage;
          file = roomItem.file;
          formData.append("roomName", roomItem.roomName);
        }
        formData.append("file", file);

        return instance.post("/upload", formData, {
          headers: { "Content-Type": "multipart/form-data" },
          // Update progress on each file upload
          onUploadProgress: (progressEvent) => {
            if (progressEvent.total) {
              const currentLoaded = progressEvent.loaded;
              const delta =
                currentLoaded - (previousLoaded.current[index] || 0);
              previousLoaded.current[index] = currentLoaded;
              setUploadedBytes((prev) => prev + delta);
            }
          },
        });
      });

      await Promise.all(uploadPromises);

      toast.success("Images uploaded successfully");
      setPropertyFiles([]);
      setRoomFiles([]);
      setCurrentRoomName("");
    } catch (error) {
      console.error("Upload error:", error);
      toast.error("Failed to upload images");
    } finally {
      setIsLoading(false);
      setTotalSize(0);
      setUploadedBytes(0);
    }
  };

  return (
    <form onSubmit={handleUpload} className="space-y-4">
      <div className="flex mb-6">
        <Button
          type="button"
          variant={uploadType === "property" ? "primary" : "outline"}
          className="w-full rounded-none focus:ring-0"
          onClick={() => setUploadType("property")}
        >
          Property Images
        </Button>
        <Button
          type="button"
          variant={uploadType === "room" ? "primary" : "outline"}
          className="w-full rounded-none focus:ring-0"
          onClick={() => setUploadType("room")}
        >
          Room Images
        </Button>
      </div>

      {uploadType === "room" && (
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">Room Name</label>
            <Input
              type="text"
              value={currentRoomName}
              onChange={(e) => setCurrentRoomName(e.target.value)}
              placeholder="Enter room name"
            />
          </div>
          <p className="text-sm text-gray-500">
            Enter a room name before selecting its image (one image per room)
          </p>
        </div>
      )}

      <div
        {...getRootProps()}
        className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer ${
          isDragActive ? "border-blue-500 bg-blue-50" : "border-gray-300"
        }`}
      >
        <input {...getInputProps()} />
        {isDragActive ? (
          <p>Drop file here...</p>
        ) : (
          <p>
            {uploadType === "property"
              ? "Drag & drop property images, or click to select"
              : "Drag & drop single room image, or click to select"}
          </p>
        )}
      </div>

      {/* Property Images Preview */}
      {uploadType === "property" && propertyFiles.length > 0 && (
        <div className="space-y-4">
          <h3 className="font-medium">Property Images:</h3>
          <div className="grid grid-cols-1 gap-4">
            {propertyFiles.map((propertyFile, index) => (
              <div
                key={propertyFile.file.name}
                className="flex items-center justify-between p-3 border rounded-lg"
              >
                <div className="flex items-center gap-4">
                  <div className="relative h-16 w-16">
                    <Image
                      src={propertyFile.preview}
                      alt={propertyFile.file.name}
                      fill
                      className="object-cover rounded-md"
                    />
                  </div>
                  <div>
                    <p className="font-medium">{propertyFile.file.name}</p>
                    <p className="text-sm text-gray-500">
                      {formatFileSize(propertyFile.file.size)}
                    </p>
                  </div>
                </div>
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() => handleRemovePropertyImage(index)}
                  className="text-red-600 hover:text-red-700"
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Room Images Preview */}
      {uploadType === "room" && roomFiles.length > 0 && (
        <div className="space-y-4">
          <h3 className="font-medium">Room Images:</h3>
          <div className="grid grid-cols-1 gap-4">
            {roomFiles.map((room) => (
              <div
                key={room.roomName}
                className="flex items-center justify-between p-3 border rounded-lg"
              >
                <div className="flex items-center gap-4">
                  <div className="relative h-16 w-16">
                    <Image
                      src={room.preview}
                      alt={room.roomName}
                      fill
                      className="object-cover rounded-md"
                    />
                  </div>
                  <div>
                    <p className="font-medium">{room.roomName}</p>
                    <p className="text-sm text-gray-500">
                      {room.file.name} ({formatFileSize(room.file.size)})
                    </p>
                  </div>
                </div>
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() => handleRemoveRoomImage(room.roomName)}
                  className="text-red-600 hover:text-red-700"
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            ))}
          </div>
        </div>
      )}

      {error && <div className="text-red-600 text-sm">{error}</div>}

      {/* Progress component */}
      {isLoading && (
        <div className="space-y-2">
          <Progress value={calculateProgress()} />
          <div className="text-sm text-gray-500 text-center">
            Uploading {calculateProgress()}% -{formatFileSize(uploadedBytes)} of{" "}
            {formatFileSize(totalSize)}
          </div>
        </div>
      )}

      <div className="flex gap-4 items-center justify-between">
        <Button
          type="button"
          variant="destructive"
          onClick={() => {
            router.push("/admin/properties");
            setTimeout(() => {
              dispatch(setCurrentStep(1));
            }, 3000);
          }}
        >
          Cancel
        </Button>
        <div className="flex items-center gap-2">
          <Button
            type="submit"
            disabled={
              isLoading ||
              (uploadType === "property" && propertyFiles.length === 0) ||
              (uploadType === "room" && roomFiles.length === 0)
            }
          >
            {isLoading ? "Uploading..." : "Upload Images"}
          </Button>
          <Button
            type="button"
            variant="outline"
            onClick={() => {
              router.push("/admin/properties");
              setTimeout(() => {
                dispatch(setCurrentStep(1));
              }, 3000);
            }}
          >
            Continue
          </Button>
        </div>
      </div>
    </form>
  );
}
