/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { IProperty } from "@/interfaces/property.interface";
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  HomeIcon,
} from "@heroicons/react/24/solid";
import Image from "next/image";
import { Pannellum } from "pannellum-react-update";
import { useEffect, useRef, useState } from "react";

type Scene = {
  sceneName: string;
  scenePanoImg: string;
  hotSpots?: HotSpot[];
};

type HotSpot = {
  pitch: number;
  yaw: number;
  targetScene: number;
  tooltip?: string;
};

const VirtualTour = ({ data }: { data: IProperty | null }) => {
  const [currentScene, setCurrentScene] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const thumbnailRefs = useRef<(HTMLDivElement | null)[]>([]);
  const scenes: Scene[] =
    data?.rooms?.map((room) => ({
      sceneName: room.name,
      scenePanoImg: room.url,
    })) || [];

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      switch (e.key) {
        case "ArrowLeft":
          handleSceneChange(Math.max(currentScene - 1, 0));
          break;
        case "ArrowRight":
          handleSceneChange(Math.min(currentScene + 1, scenes.length - 1));
          break;
        case "Home":
          handleSceneChange(0);
          break;
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [currentScene, scenes.length]);

  const handleSceneChange = (newScene: number) => {
    if (newScene < 0 || newScene >= scenes.length) return;

    setIsLoading(true);
    setError(null);
    setCurrentScene(newScene);

    thumbnailRefs.current[newScene]?.scrollIntoView({
      behavior: "smooth",
      block: "nearest",
      inline: "center",
    });
  };

  if (!scenes.length) {
    return (
      <div className="text-center p-8 text-gray-500">
        No virtual tour available for this property
      </div>
    );
  }

  return (
    <section aria-label="Virtual tour" className="space-y-4">
      <header>
        <h2 className="font-semibold text-2xl text-gray-900 mb-2">
          360° Virtual Tour
        </h2>
        <p className="text-gray-600">Explore {scenes.length} panoramic views</p>
      </header>

      <div className="relative rounded-xl overflow-hidden shadow-lg">
        {/* Loading overlay */}
        {isLoading && (
          <div className="absolute inset-0 bg-black/50 flex items-center justify-center z-10">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-200" />
          </div>
        )}

        {/* Error message */}
        {error && (
          <div className="absolute inset-0 bg-black/80 flex items-center justify-center z-20">
            <p className="text-red-400 text-lg">{error}</p>
          </div>
        )}

        <Pannellum
          width="100%"
          height="600px"
          image={scenes[currentScene].scenePanoImg}
          title={scenes[currentScene].sceneName}
          pitch={10}
          yaw={180}
          autoLoad
          compass
          showControls
          onLoad={() => {
            setIsLoading(false);
            setError(null);
          }}
          onError={(err: string) => setError(err)}
          // ref={viewerRef}
        ></Pannellum>

        {/* Controls overlay */}
        <div className="shrink-0 absolute top-3 right-4 flex justify-between items-center z-30 gap-2">
          <div className="flex gap-2">
            <button
              className="bg-white/90 hover:bg-white p-2 rounded-full shadow-lg transition-all"
              onClick={() => handleSceneChange(currentScene - 1)}
              disabled={currentScene === 0}
              aria-label="Previous scene"
            >
              <ChevronLeftIcon className="w-6 h-6 text-gray-800" />
            </button>
            <button
              className="bg-white/90 hover:bg-white p-2 rounded-full shadow-lg transition-all"
              onClick={() => handleSceneChange(currentScene + 1)}
              disabled={currentScene === scenes.length - 1}
              aria-label="Next scene"
            >
              <ChevronRightIcon className="w-6 h-6 text-gray-800" />
            </button>
          </div>

          <div className="flex gap-2">
            <button
              className="bg-white/90 hover:bg-white p-2 rounded-full shadow-lg transition-all"
              onClick={() => handleSceneChange(0)}
              aria-label="Return to start"
            >
              <HomeIcon className="w-6 h-6 text-gray-800" />
            </button>
          </div>
        </div>
      </div>

      {/* Thumbnail rail */}
      <div className="relative">
        <div className="flex gap-3 overflow-x-auto pb-4 scrollbar-none">
          {scenes.map((scene, index) => (
            <div
              key={index}
              ref={(el) => {
                if (el) thumbnailRefs.current[index] = el;
              }}
              className={`shrink-0 relative w-24 h-16 rounded-lg overflow-hidden cursor-pointer transition-all border-2 ${
                currentScene === index
                  ? "border-primary shadow-lg"
                  : "border-transparent opacity-80 hover:opacity-100"
              }`}
              onClick={() => handleSceneChange(index)}
              role="button"
              aria-label={`View ${scene.sceneName}`}
            >
              <Image
                src={scene.scenePanoImg}
                alt={scene.sceneName}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100px, 150px"
                loading={index < 3 ? "eager" : "lazy"}
              />
              <div className="absolute inset-0 bg-black/40 hover:bg-black/20 transition-colors" />
              <span className="absolute bottom-1 left-1 text-white text-xs font-medium truncate max-w-[90%]">
                {scene.sceneName}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default VirtualTour;
