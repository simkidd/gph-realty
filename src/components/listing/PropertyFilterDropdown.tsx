import { cn } from "@/lib/utils";
import { ChevronDownIcon } from "lucide-react";
import React, { useEffect, useRef, useState } from "react";

interface FilterDropdownProps {
  label: string;
  options: string[];
  selectedValue: string;
  onSelect: (value: string) => void;
  className?: string;
  position?: "bottom-left" | "bottom-right";
  icon?: React.ReactNode;
  wrapperClass?: string;
}

const PropertyFilterDropdown = ({
  label,
  options,
  selectedValue,
  onSelect,
  className,
  position = "bottom-left",
  icon,
  wrapperClass,
}: FilterDropdownProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const getPosition = (value: string) => {
    switch (value) {
      case "bottom-left":
        return "top-full left-0";
      case "bottom-right":
        return "top-full right-0";
      default:
        return "top-full left-0";
    }
  };

  return (
    <div
      ref={dropdownRef}
      className={cn("border rounded relative", wrapperClass)}
    >
      <span
        className={cn(
          "text-[#878787] text-sm px-4 py-2 flex items-center cursor-pointer",
          className
        )}
        onClick={() => setIsOpen(!isOpen)}
      >
        {icon && <span className="mr-3 text-gray-400">{icon}</span>}
        <span className="mr-4">{selectedValue || label}</span>
        <ChevronDownIcon size={15} className="ml-auto" />
      </span>

      {/* dropdown content */}
      {isOpen && (
        <div
          className={`absolute w-full  min-w-fit bg-white border mt-1 rounded shadow-lg z-10 ${getPosition(
            position
          )}`}
        >
          {options.map((option, index) => (
            <div
              key={index}
              className="px-5 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer text-nowrap"
              onClick={() => {
                onSelect(option);
                setIsOpen(false);
              }}
            >
              {option}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default PropertyFilterDropdown;
