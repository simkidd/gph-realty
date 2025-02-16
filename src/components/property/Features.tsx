import { IProperty } from "@/interfaces/property.interface";
import React from "react";
import { FiCheck } from "react-icons/fi";

const Features = ({ property }: { property: IProperty }) => {
  // Split features into 3 columns for better layout
  const featuresPerColumn = Math.ceil(property?.features.length / 3);

  return (
    <div className="">
      <h4 className="font-semibold mb-6 text-xl md:text-2xl text-gray-900">
        Property Features
      </h4>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
        {[0, 1, 2].map((columnIndex) => (
          <ul key={columnIndex} className="space-y-3">
            {property?.features
              .slice(
                columnIndex * featuresPerColumn,
                (columnIndex + 1) * featuresPerColumn
              )
              .map((feature, index) => (
                <li
                  key={index}
                  className="flex items-center gap-2 text-gray-600"
                >
                  <FiCheck className="text-green-500 flex-shrink-0" />
                  <span className="text-sm md:text-base">{feature}</span>
                </li>
              ))}
          </ul>
        ))}
      </div>

      {property.features.length === 0 && (
        <p className="text-gray-500 text-sm mt-4">
          No features listed for this property
        </p>
      )}
    </div>
  );
};

export default Features;
