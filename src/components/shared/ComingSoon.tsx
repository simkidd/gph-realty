import { ConstructionIcon } from "lucide-react";
import React from "react";

const ComingSoon = () => {
  return (
    <div className="h-dvh w-full bg-gray-400">
      <div className="flex items-center justify-center h-full w-full p-4 ">
        <div className="bg-white w-full max-w-3xl mx-auto flex flex-col items-center shadow-lg rounded-xl py-16">
          <ConstructionIcon size={58} />
          <h1 className="font-bold text-4xl mt-8 uppercase">Site Under Construction</h1>
        </div>
      </div>
    </div>
  );
};

export default ComingSoon;
