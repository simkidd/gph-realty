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
import { IImage } from "@/interfaces/property.interface";

interface GalleryProps {
  images: IImage[];
}

const Gallery = ({ images }: GalleryProps) => {
  const [selectedImageIndex, setSelectedImageIndex] = useState<number>(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isZoomed, setIsZoomed] = useState(false);
  const [zoomPosition, setZoomPosition] = useState({ x: 0, y: 0 });
  const thumbnailRefs = useRef<HTMLDivElement[]>([]);
  const mainImageRef = useRef<HTMLImageElement>(null);

  if (!images || images.length === 0) {
    return <div>No images available</div>;
  }

  const handleImageChange = (newImage: number) => {
    setIsLoading(true);
    setSelectedImageIndex(newImage);
    thumbnailRefs.current[newImage]?.scrollIntoView({
      behavior: "smooth",
      block: "nearest",
      inline: "center",
    });
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (isZoomed) {
      const { left, top, width, height } =
        e.currentTarget.getBoundingClientRect();
      const x = ((e.clientX - left) / width) * 100;
      const y = ((e.clientY - top) / height) * 100;
      setZoomPosition({ x, y });
    }
  };

  const toggleZoom = () => {
    setIsZoomed(!isZoomed);
    if (!isZoomed) {
      setZoomPosition({ x: 50, y: 50 }); // Reset to center when zooming in
    }
  };

  return (
    <div className="w-full">
      <h4 className="font-semibold mb-5 text-[22px] capitalize leading-[1.2] tracking-wide">
        Gallery
      </h4>
      <div className="w-full relative box-border">
        {/* Gallery Modal */}
        <AnimatePresence>
          {isModalOpen && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black bg-opacity-90 flex flex-col items-center z-50"
            >
              <div className="w-full flex justify-end p-4">
                <button
                  className="text-white bg-black/50 p-2 rounded-full hover:bg-black/75 transition-colors"
                  onClick={() => setIsModalOpen(false)}
                >
                  <XIcon className="size-6" />
                </button>
              </div>

              <div className="flex justify-center items-center h-[80vh] w-full px-4">
                <button
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-white bg-black/50 p-3 rounded-full hover:bg-black/75 transition-colors z-10"
                  onClick={() =>
                    handleImageChange(
                      (selectedImageIndex - 1 + images.length) % images.length
                    )
                  }
                >
                  <ChevronLeftIcon className="size-6" />
                </button>

                <div
                  className="relative w-full max-w-4xl h-full cursor-zoom-in z-[1]"
                  onMouseMove={handleMouseMove}
                  onClick={toggleZoom}
                >
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={selectedImageIndex}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.2 }}
                      className="w-full h-full"
                      style={{
                        transform: isZoomed
                          ? `scale(2) translate(${zoomPosition.x - 50}%, ${
                              zoomPosition.y - 50
                            }%)`
                          : "scale(1)",
                        transformOrigin: `${zoomPosition.x}% ${zoomPosition.y}%`,
                      }}
                    >
                      <Image
                        src={images[selectedImageIndex].imageUrl}
                        alt={`Selected Image ${selectedImageIndex + 1}`}
                        fill
                        className="object-contain"
                        onLoad={() => setIsLoading(false)}
                      />
                    </motion.div>
                  </AnimatePresence>
                </div>

                <button
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-white bg-black/50 p-3 rounded-full hover:bg-black/75 transition-colors z-10"
                  onClick={() =>
                    handleImageChange((selectedImageIndex + 1) % images.length)
                  }
                >
                  <ChevronRightIcon className="size-6" />
                </button>
              </div>

              {/* Thumbnails in Modal */}
              <div className="w-full flex justify-center gap-2 mt-4 pb-4 px-4 overflow-x-auto scrollbar-none">
                {images.map((image, index) => (
                  <div
                    key={index}
                    ref={(el) => {
                      if (el) thumbnailRefs.current[index] = el;
                    }}
                    className={`shrink-0 w-20 h-14 cursor-pointer border-2 hover:border-primary transition-all duration-300 rounded-md overflow-hidden box-border ${
                      selectedImageIndex === index
                        ? "border-primary"
                        : "border-transparent opacity-50"
                    }`}
                    onClick={() => handleImageChange(index)}
                  >
                    <Image
                      src={image.imageUrl}
                      alt={`Thumbnail ${index + 1}`}
                      width={80}
                      height={56}
                      className="w-full h-full object-cover"
                    />
                  </div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Main Image */}
        <div className="mb-4 group w-full relative cursor-zoom-in bg-gray-100 rounded-lg overflow-hidden">
          <AnimatePresence mode="wait">
            <motion.div
              key={selectedImageIndex}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="w-full"
            >
              <Image
                ref={mainImageRef}
                src={images[selectedImageIndex].imageUrl}
                alt="Main display"
                width={1200}
                height={800}
                className="w-full h-auto object-cover aspect-video"
                priority
                onClick={() => setIsModalOpen(true)}
                onLoad={() => setIsLoading(false)}
              />
            </motion.div>
          </AnimatePresence>

          {isLoading && (
            <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
            </div>
          )}

          <div className="absolute bottom-4 right-4 bg-black/50 text-white p-2 rounded-full hover:bg-black/75 transition-colors">
            <FullscreenIcon className="w-5 h-5" />
          </div>
        </div>

        {/* Thumbnail Strip */}
        <div className="w-full flex gap-2 overflow-x-auto scrollbar-none pb-2">
          {images.map((image, index) => (
            <div
              key={index}
              className={`shrink-0 w-20 h-14 rounded-md overflow-hidden border-2 box-border ${
                selectedImageIndex === index
                  ? "border-primary"
                  : "border-transparent"
              }`}
            >
              <Image
                src={image.imageUrl}
                alt={`Image ${index + 1}`}
                width={80}
                height={56}
                className={`w-full h-full object-cover transition-opacity duration-300 ${
                  selectedImageIndex === index ? "" : "opacity-50"
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
