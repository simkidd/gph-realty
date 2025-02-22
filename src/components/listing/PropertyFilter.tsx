"use client";
import React from "react";
import PropertyFilterDropdown from "./PropertyFilterDropdown";
import { FilterProps } from "./PropertyGrid";
import RangeSlider from "../ui-custom/RangeSlider";
import Button from "../ui-custom/Button";

interface PropertyFilterProps {
  filters: FilterProps;
  handleFilterChange: (key: string, value: string | [number, number]) => void;
  applyFilters: () => void;
  resetFilters: () => void;
  disabled: boolean;
}

const PropertyFilter = ({
  applyFilters,
  filters,
  handleFilterChange,
  resetFilters,
  disabled,
}: PropertyFilterProps) => {
  return (
    <div className="p-[20px] lg:p-[30px] rounded-lg w-full h-fit">
      <div className="w-full">
        <div className="w-full">
          <h6 className="font-semibold text-base text-[#586167] mb-[30px] capitalize relative before:content-[''] before:absolute before:w-[22px] before:h-[2px] before:-bottom-2 before:bg-primary">
            Filter
          </h6>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-2">
            <div className="col-span-1 lg:col-span-2">
              <PropertyFilterDropdown
                label="Property Status"
                options={["On Sale", "For Rent"]}
                selectedValue={filters.status}
                onSelect={(value) => handleFilterChange("status", value)}
              />
            </div>
            <div className="col-span-1 lg:col-span-2">
              <PropertyFilterDropdown
                label="Property Type"
                options={["House", "Apartment", "Land"]}
                selectedValue={filters.type}
                onSelect={(value) => handleFilterChange("type", value)}
              />
            </div>
            <div className="col-span-1 lg:col-span-2">
              <PropertyFilterDropdown
                label="Property Location"
                options={["Port Harcourt"]}
                selectedValue={filters.location}
                onSelect={(value) => handleFilterChange("location", value)}
              />
            </div>
            <div className="col-span-1 lg:col-span-2">
              <PropertyFilterDropdown
                label="Max Rooms"
                options={["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"]}
                selectedValue={filters.rooms}
                onSelect={(value) => handleFilterChange("rooms", value)}
              />
            </div>
            <div className="col-span-1">
              <PropertyFilterDropdown
                label="Bed"
                options={["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"]}
                selectedValue={filters.beds}
                onSelect={(value) => handleFilterChange("beds", value)}
              />
            </div>
            <div className="col-span-1">
              <PropertyFilterDropdown
                label="Bath"
                options={["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"]}
                selectedValue={filters.baths}
                onSelect={(value) => handleFilterChange("baths", value)}
              />
            </div>

            {/* Price Inputs */}
            <div className="col-span-1 lg:col-span-2">
              <RangeSlider
                label="Price"
                min={0}
                max={900000000}
                value={filters.priceRange}
                onChange={(value) => handleFilterChange("priceRange", value)}
              />
            </div>

            {/* area filter */}
            <div className="col-span-1 lg:col-span-2">
              <RangeSlider
                label="Area"
                min={0}
                max={5000}
                value={filters.area}
                onChange={(value) => handleFilterChange("area", value)}
              />
            </div>

            <div className="col-span-1 mt-4">
              <Button
                variant={"outline"}
                className="rounded-full w-full"
                disabled={disabled}
                onClick={resetFilters}
              >
                Reset
              </Button>
            </div>
            <div className="col-span-1 mt-4">
              <Button
                className="rounded-full w-full"
                disabled={disabled}
                onClick={applyFilters}
              >
                Apply
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PropertyFilter;
