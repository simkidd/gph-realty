"use client";
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  FullscreenIcon,
  XIcon,
} from "lucide-react";
import Image from "next/image";
import React, { useRef, useState } from "react";

interface GalleryProps {
  images: string[] | undefined;
}

const Gallery = ({ images }: GalleryProps) => {
  const [selectedImageIndex, setSelectedImageIndex] = useState<number>(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const thumbnailRefs = useRef<HTMLDivElement[]>([]);

  if (!images || images.length === 0) {
    return <div>No images available</div>;
  }

  const handleImageChange = (newImage: number) => {
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
            <div className="relative max-w-4xl w-full my-auto">
              <Image
                src={images[selectedImageIndex]}
                alt={`Selected Image ${selectedImageIndex + 1}`}
                width={800}
                height={800}
                className="w-full h-auto object-contain"
                loading="lazy"
              />

              {/* Navigation Arrows */}
              <button
                className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white bg-black bg-opacity-50 p-3 rounded-full hover:bg-opacity-75 transition-all"
                onClick={() =>
                  handleImageChange(
                    (selectedImageIndex - 1 + images.length) % images.length
                  )
                }
              >
                <ChevronLeftIcon className="size-6" />
              </button>
              <button
                className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white bg-black bg-opacity-50 p-3 rounded-full hover:bg-opacity-75 transition-all"
                onClick={() =>
                  handleImageChange((selectedImageIndex + 1) % images.length)
                }
              >
                <ChevronRightIcon className="size-6" />
              </button>
            </div>

            {/* Thumbnails in Modal */}
            <div className="w-full flex items-center lg:justify-center gap-2 mt-auto my-8 overflow-x-auto scrollbar-none px-4">
              {images.map((image, index) => (
                <div
                  key={index}
                  ref={(el) => {
                    if (el) thumbnailRefs.current[index] = el;
                  }}
                  className={`shrink-0 w-24 cursor-pointer border-4 border-transparent hover:border-primary-200 transition duration-300 rounded-md overflow-hidden ${
                    selectedImageIndex === index
                      ? "border-primary-200 font-bold"
                      : "opacity-50"
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
        <div className="mb-4 w-full relative cursor-zoom-in">
          <Image
            src={images[selectedImageIndex]}
            alt="Main Image"
            width={500}
            height={500}
            className="w-full h-full object-cover transition duration-300 ease-in-out"
            priority
            onClick={() => setIsModalOpen(true)}
          />

          <div className="absolute bottom-2 left-2 text-white">
            <FullscreenIcon />
          </div>
        </div>

        {/* Display the rest of the gallery images */}
        <div className="w-full flex items-center gap-2 overflow-auto scrollbar-none">
          {images.slice(1).map((image, index) => (
            <div
              key={index}
              className="shrink-0 lg:w-[112px] lg:h-[90px] h-[60px]"
            >
              <Image
                src={image}
                alt={`Image ${index + 1}`}
                width={500}
                height={500}
                className={`w-full h-full object-cover transition duration-300 ease-in-out cursor-pointer ${
                  selectedImageIndex === index + 1
                    ? "border-2 border-primary-200 font-bold"
                    : "opacity-50"
                }`}
                loading="lazy"
                onClick={() => handleImageChange(index + 1)}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Gallery;
