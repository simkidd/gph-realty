import React from "react";
import { FiMapPin, FiLayout, FiSearch } from "react-icons/fi";
import PropertyFilterDropdown from "../listing/PropertyFilterDropdown";
import Button from "../ui/Button";

const HeroFilter = () => {
  return (
    <div className="bg-white rounded-xl shadow-2xl p-6">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="relative">
          <FiMapPin
            size={16}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
          />
          <input
            type="text"
            className="border w-full rounded-lg pl-10 pr-4 py-3 text-[#878787] text-sm px-3 outline-none"
            placeholder="Location"
          />
        </div>
        <div className="relative">
          <PropertyFilterDropdown
            label="Property Type"
            options={["Luxury Homes", "Commercial", "Villas", "Penthouses"]}
            selectedValue=""
            onSelect={(value) => console.log(value)}
            className="py-3"
            wrapperClass="rounded-lg"
            icon={<FiLayout size={16} />}
          />
        </div>
        <div className="relative">
          <PropertyFilterDropdown
            label="Property Status"
            options={["For Rent", "For Sale"]}
            selectedValue=""
            onSelect={(value) => console.log(value)}
            className="py-3"
            wrapperClass="rounded-lg"
            icon={<FiLayout />}
          />
        </div>

        <Button className="text-sm px-6 py-3 flex items-center justify-center gap-2">
          <FiSearch className="text-xl" />
          Search
        </Button>
      </div>
    </div>
  );
};

export default HeroFilter;
