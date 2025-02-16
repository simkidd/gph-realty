"use client";
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  FullscreenIcon,
  XIcon,
} from "lucide-react";
import Image from "next/image";
import React, { useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface GalleryProps {
  images: string[] | undefined;
}

const Gallery = ({ images }: GalleryProps) => {
  const [selectedImageIndex, setSelectedImageIndex] = useState<number>(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const thumbnailRefs = useRef<HTMLDivElement[]>([]);
  const mainImageRef = useRef<HTMLImageElement>(null);

  if (!images || images.length === 0) {
    return <div>No images available</div>;
  }

  const handleImageChange = (newImage: number) => {
    setIsLoading(true);
    setSelectedImageIndex(newImage);
    // Ensure the active thumbnail is in view
    thumbnailRefs.current[newImage]?.scrollIntoView({
      behavior: "smooth",
      block: "nearest",
      inline: "center",
    });
  };

  return (
    <div>
      <h4 className="font-semibold mb-5 text-[22px] capitalize leading-[1.2] tracking-wide">
        Gallery
      </h4>
      <div className="w-full relative box-border">
        {/* Gallery Modal */}
        {isModalOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-90 flex flex-col items-center z-50">
            <div className="w-full h-16">
              <button
                className="absolute top-2 right-2 text-white bg-black p-2 rounded-full"
                onClick={() => setIsModalOpen(false)}
              >
                <XIcon className="size-6" />
              </button>
            </div>

            <div className="flex justify-center items-center h-full">
              {/* left arrow */}
              <button
                className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white bg-black bg-opacity-50 p-3 rounded-full hover:bg-opacity-75 transition-all z-[1]"
                onClick={() =>
                  handleImageChange(
                    (selectedImageIndex - 1 + images.length) % images.length
                  )
                }
              >
                <ChevronLeftIcon className="size-6" />
              </button>
              <div className="relative max-w-4xl w-full">
                <Image
                  src={images[selectedImageIndex]}
                  alt={`Selected Image ${selectedImageIndex + 1}`}
                  width={800}
                  height={800}
                  className="w-full h-auto object-contain"
                  loading="lazy"
                />
              </div>
              {/* right arrow */}
              <button
                className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white bg-black bg-opacity-50 p-3 rounded-full hover:bg-opacity-75 transition-all z-[1]"
                onClick={() =>
                  handleImageChange((selectedImageIndex + 1) % images.length)
                }
              >
                <ChevronRightIcon className="size-6" />
              </button>
            </div>

            {/* Thumbnails in Modal */}
            <div className="w-full flex items-center lg:justify-center gap-2 mt-auto my-8 overflow-x-auto scrollbar-none px-4 py-3">
              {images.map((image, index) => (
                <div
                  key={index}
                  ref={(el) => {
                    if (el) thumbnailRefs.current[index] = el;
                  }}
                  className={`shrink-0 w-24 cursor-pointer border-2  hover:border-primary transition duration-300 rounded-md overflow-hidden ${
                    selectedImageIndex === index
                      ? "border-primary"
                      : "opacity-50 border-transparent"
                  }`}
                  onClick={() => handleImageChange(index)}
                >
                  <Image
                    src={image}
                    alt={`Thumbnail ${index + 1}`}
                    width={100}
                    height={100}
                    className="w-full h-full object-cover"
                  />
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Display the main image */}
        <div className="mb-4 group w-full relative cursor-zoom-in bg-gray-100 rounded-lg overflow-hidden">
          <AnimatePresence mode="wait">
            <motion.div
              key={selectedImageIndex}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <Image
                ref={mainImageRef}
                src={images[selectedImageIndex]}
                alt="Main display"
                width={1200}
                height={800}
                className="w-full h-auto object-cover aspect-video"
                priority
                onClick={() => setIsModalOpen(true)}
                onLoadingComplete={() => setIsLoading(false)}
              />
            </motion.div>
          </AnimatePresence>

          {isLoading && (
            <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
            </div>
          )}

          <div className="absolute bottom-4 right-4 bg-black/50 text-white p-2 rounded-full">
            <FullscreenIcon className="w-5 h-5" />
          </div>
        </div>

        {/* Display the rest of the gallery images */}
        <div className="w-full flex items-center gap-2 overflow-x-auto scrollbar-none">
          {images.map((image, index) => (
            <div
              key={index}
              className={`shrink-0 lg:w-[90px] lg:h-[70px] h-[60px] rounded-md overflow-hidden border-2 ${
                selectedImageIndex === index
                  ? " border-primary"
                  : "bg-transparent"
              }`}
            >
              <Image
                src={image}
                alt={`Image ${index + 1}`}
                width={500}
                height={500}
                className={`w-full h-full object-cover transition duration-300 ease-in-out cursor-pointer border-transparent ${
                  selectedImageIndex === index
                    ? ""
                    : "opacity-50"
                }`}
                loading="lazy"
                onClick={() => handleImageChange(index)}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Gallery;
