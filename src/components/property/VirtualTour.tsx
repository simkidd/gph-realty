/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { IProperty } from "@/interfaces/property.interface";
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  HomeIcon,
  // MagnifyingGlassMinusIcon,
  // MagnifyingGlassPlusIcon,
} from "@heroicons/react/24/solid";
// import { Gamepad2Icon } from "lucide-react";
import Image from "next/image";
import { Pannellum } from "pannellum-react-update";
import { useRef, useState } from "react";
// import { toast } from "sonner";

const VirtualTour = ({ data }: { data: IProperty | null }) => {
  const [currentScene, setCurrentScene] = useState(0);
  // const [currentHfov, setCurrentHfov] = useState(110);
  const thumbnailRefs = useRef<HTMLDivElement[]>([]);
  const viewerRef = useRef<any>(null);

  const scenesArray = [
    {
      sceneName: data?.rooms[0]?.name,
      scenePanoImg: data?.rooms[0]?.url,
      hotSpotsArr: [
        { pitch: -9.06119427236566, yaw: -92.7752861238165, transition: 1 },
      ],
    },
    {
      sceneName: data?.rooms[1]?.name,
      scenePanoImg: data?.rooms[1]?.url,
      hotSpotsArr: [
        { pitch: -9.06119427236566, yaw: -92.7752861238165, transition: 1 },
      ],
    },
  ];

  // const scenesArray = [
  //   {
  //     sceneName: "Kitchen",
  //     scenePanoImg: data?.images[0],
  //     hotSpotsArr: [
  //       { pitch: -9.06119427236566, yaw: -92.7752861238165, transition: 1 },
  //     ],
  //   },
  //   {
  //     sceneName: "Room 1",
  //     scenePanoImg: data?.images[1],
  //     hotSpotsArr: [
  //       { pitch: -50.943576619160616, yaw: -174.6239076277068, transition: 0 },
  //       { pitch: -20.48368170929848, yaw: -10.26897749453302, transition: 2 },
  //     ],
  //   },
  //   {
  //     sceneName: "Poolside",
  //     scenePanoImg: data?.images[2],
  //     hotSpotsArr: [
  //       { pitch: -51.354378017934465, yaw: -114.99647316748677, transition: 1 },
  //     ],
  //   },
  //   {
  //     sceneName: "Kitchen",
  //     scenePanoImg: data?.images[3],
  //     hotSpotsArr: [
  //       { pitch: -9.06119427236566, yaw: -92.7752861238165, transition: 1 },
  //     ],
  //   },
  //   {
  //     sceneName: "Room 1",
  //     scenePanoImg: data?.images[5],
  //     hotSpotsArr: [
  //       { pitch: -50.943576619160616, yaw: -174.6239076277068, transition: 0 },
  //       { pitch: -20.48368170929848, yaw: -10.26897749453302, transition: 2 },
  //     ],
  //   },
  //   {
  //     sceneName: "Poolside",
  //     scenePanoImg: data?.images[6],
  //     hotSpotsArr: [
  //       { pitch: -51.354378017934465, yaw: -114.99647316748677, transition: 1 },
  //     ],
  //   },
  //   {
  //     sceneName: "Kitchen",
  //     scenePanoImg: data?.images[7],
  //     hotSpotsArr: [
  //       { pitch: -9.06119427236566, yaw: -92.7752861238165, transition: 1 },
  //     ],
  //   },
  //   {
  //     sceneName: "Test Room ",
  //     scenePanoImg: data?.images[8],
  //     hotSpotsArr: [
  //       { pitch: -50.943576619160616, yaw: -174.6239076277068, transition: 0 },
  //       { pitch: -20.48368170929848, yaw: -10.26897749453302, transition: 2 },
  //     ],
  //   },
  //   {
  //     sceneName: "Test landscape ",
  //     scenePanoImg: data?.images[9],
  //     hotSpotsArr: [
  //       { pitch: -50.943576619160616, yaw: -174.6239076277068, transition: 0 },
  //       { pitch: -20.48368170929848, yaw: -10.26897749453302, transition: 2 },
  //     ],
  //   },

  // ];

  // const hotspotIcon = (hotSpotDiv: HTMLElement) => {
  //   const image = document.createElement("img");
  //   image.classList.add("image");
  //   image.setAttribute("width", "30");
  //   image.setAttribute("height", "30");
  //   image.setAttribute(
  //     "src",
  //     "https://img.icons8.com/material/4ac144/256/camera.png"
  //   );
  //   hotSpotDiv.appendChild(image);
  // };

  const handleSceneChange = (newScene: number) => {
    setCurrentScene(newScene);
    // Ensure the active thumbnail is in view
    thumbnailRefs.current[newScene]?.scrollIntoView({
      behavior: "smooth",
      block: "nearest",
      inline: "center",
    });
  };

  // const enterVR = () => {
  //   viewerRef.current.enterVR();
  //   if (viewerRef.current && viewerRef.current.enterVR) {
  //   } else {
  //     toast("VR Mode is not supported on this device/browser.");
  //   }
  // };

  if (!data?.images?.length) {
    return <div>No images available for the virtual tour.</div>;
  }

  const currentSceneData = scenesArray[currentScene];

  return (
    <div>
      <h4 className="font-semibold mb-5 text-[22px] capitalize leading-[1.2] tracking-wide">
        360-degree View
      </h4>
      <div className="relative w-full">
        <Pannellum
          width="100%"
          height="500px"
          image={currentSceneData.scenePanoImg}
          title={currentSceneData.sceneName}
          pitch={10}
          yaw={180}
          // hfov={currentHfov}
          autoLoad
          compass
          showControls={true}
          onLoad={(viewer: any) => {
            console.log("panorama loaded");
            viewerRef.current = viewer; // Store the viewer instance in the ref
          }}
        >
          {/* {currentSceneData.hotSpotsArr.map((hotSpot, i) => (
            <Pannellum.Hotspot
              key={i}
              type="custom"
              pitch={hotSpot.pitch}
              yaw={hotSpot.yaw}
              tooltip={hotspotIcon}
              handleClick={() => handleSceneChange(hotSpot.transition)}
            />
          ))} */}
        </Pannellum>

        <div className="grid lg:grid-cols-9 grid-cols-1 gap-4 p-3 bg-black">
          <div className="col-span-1 lg:col-span-6">
            <div className="w-full flex items-center gap-3 overflow-x-auto scrollbar-none">
              {scenesArray.map((scene, index) => (
                <div
                  key={index}
                  ref={(el) => {
                    if (el) thumbnailRefs.current[index] = el;
                  }}
                  className={`shrink-0 h-14 w-20 border-4 border-transparent hover:border-primary-200 transition duration-300 rounded-sm cursor-pointer ${
                    currentScene === index ? "!border-primary-200" : ""
                  }`}
                  onClick={() => handleSceneChange(index)}
                >
                  <Image
                    src={scene.scenePanoImg || ""}
                    alt={scene.sceneName || ""}
                    width={80}
                    height={80}
                    title={scene.sceneName}
                    className="w-full h-full object-cover"
                  />
                </div>
              ))}
            </div>
          </div>

          <div className="col-span-1 lg:col-span-3 flex items-center lg:justify-end justify-around gap-4">
            {/* <button
              className="bg-white rounded-full flex items-center justify-center size-10"
              onClick={() => setCurrentHfov((prev) => Math.max(prev - 10, 30))}
              title="Zoom In"
            >
              <MagnifyingGlassPlusIcon className="size-6" />
            </button>
            <button
              className="bg-white rounded-full flex items-center justify-center size-10"
              onClick={() => setCurrentHfov((prev) => Math.min(prev + 10, 120))}
              title="Zoom Out"
            >
              <MagnifyingGlassMinusIcon className="size-6" />
            </button> */}
            <button
              className="bg-white rounded-full flex items-center justify-center size-10"
              aria-label="prev"
              title="Previous"
              onClick={() => handleSceneChange(Math.max(currentScene - 1, 0))}
            >
              <ChevronLeftIcon className="size-6" />
            </button>
            <button
              className="bg-white rounded-full flex items-center justify-center size-10"
              aria-label="next"
              title="Next"
              onClick={() =>
                handleSceneChange(
                  Math.min(currentScene + 1, scenesArray.length - 1)
                )
              }
            >
              <ChevronRightIcon className="size-6" />
            </button>
            <button
              className="bg-white rounded-full flex items-center justify-center size-10"
              onClick={() => handleSceneChange(0)}
            >
              <HomeIcon className="size-6" />
            </button>

            {/* <button
              className="bg-white rounded-full flex items-center justify-center size-10"
              onClick={enterVR}
              title="Enter VR Mode"
            >
              <Gamepad2Icon className="size-6" />
            </button> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default VirtualTour;
