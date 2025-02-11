"use client";
import { propertyData } from "@/data/propertyData";
import { setProperties } from "@/store/features/property/propertySlice";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { ChevronDownIcon, FilterIcon } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import Button from "../ui/Button";
import RangeSlider from "../ui/RangeSlider";
import PropertyCard from "./PropertyCard";
import PropertyCardSkeleton from "./PropertyCardSkeleton";
import { useIsMobile } from "@/hooks/useMobile";

interface FilterProps {
  status: string;
  type: string;
  location: string;
  rooms: string;
  beds: string;
  baths: string;
  priceRange: [number, number];
  area: [number, number];
}

interface FilterDropdownProps {
  label: string;
  options: string[];
  selectedValue: string;
  onSelect: (value: string) => void;
  className?: string;
  position?: "bottom-left" | "bottom-right";
}

const PropertyFilterDropdown = ({
  label,
  options,
  selectedValue,
  onSelect,
  className,
  position = "bottom-left",
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
    <div ref={dropdownRef} className="border rounded relative">
      <span
        className={`text-[#878787] text-sm px-5 py-2 flex items-center cursor-pointer ${className}`}
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className="mr-4">{selectedValue || label}</span>
        <ChevronDownIcon size={15} className="ml-auto" />
      </span>

      {/* dropdown content */}
      {isOpen && (
        <div
          className={`absolute  min-w-fit bg-white border mt-1 rounded shadow-lg z-10 ${getPosition(
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

const PropertyGrid = () => {
  const dispatch = useAppDispatch();
  const { properties } = useAppSelector((state) => state.property);
  const [filteredProperties, setFilteredProperties] = useState(properties);
  const [sortBy, setSortBy] = useState("");
  const [openFilter, setOpenFilter] = useState(false);
  const isMobile = useIsMobile();

  const loading = false;

  const [filters, setFilters] = useState<FilterProps>({
    status: "",
    type: "",
    location: "",
    rooms: "",
    beds: "",
    baths: "",
    priceRange: [0, 100000000],
    area: [0, 5000],
  });

  useEffect(() => {
    dispatch(setProperties(propertyData));
  }, [dispatch]);

  useEffect(() => {
    setFilteredProperties(properties);
  }, [properties]);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleFilterChange = (key: string, value: any) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  const applyFilters = () => {
    let filteredProperties = propertyData;

    if (filters.status) {
      filteredProperties = filteredProperties.filter(
        (property) => property.status === filters.status
      );
    }
    if (filters.type) {
      filteredProperties = filteredProperties.filter(
        (property) => property.type === filters.type
      );
    }
    if (filters.location) {
      filteredProperties = filteredProperties.filter(
        (property) => property.location === filters.location
      );
    }
    if (filters.rooms) {
      filteredProperties = filteredProperties.filter(
        (property) => property.rooms.length === parseInt(filters.rooms)
      );
    }
    if (filters.beds) {
      filteredProperties = filteredProperties.filter(
        (property) => property.beds === parseInt(filters.beds)
      );
    }
    if (filters.baths) {
      filteredProperties = filteredProperties.filter(
        (property) => property.baths === parseInt(filters.baths)
      );
    }
    if (filters.priceRange) {
      filteredProperties = filteredProperties.filter(
        (property) =>
          (property.price as number) >= filters.priceRange[0] &&
          (property.price as number) <= filters.priceRange[1]
      );
    }
    if (filters.area) {
      filteredProperties = filteredProperties.filter(
        (property) =>
          (property.squareFeet as number) >= filters.area[0] &&
          (property.squareFeet as number) <= filters.area[1]
      );
    }

    setFilteredProperties(filteredProperties);
  };

  const resetFilters = () => {
    setFilters({
      status: "",
      type: "",
      location: "",
      rooms: "",
      beds: "",
      baths: "",
      priceRange: [0, 100000000],
      area: [0, 5000],
    });

    setFilteredProperties(propertyData);
  };

  const handleSortChange = (value: string) => {
    setSortBy(value);

    const sortedProperties = [...filteredProperties];

    switch (value) {
      case "price_asc":
        sortedProperties.sort((a, b) => (a.price ?? 0) - (b.price ?? 0));
        break;

      case "price-desc":
        sortedProperties.sort((a, b) => (b.price ?? 0) - (a.price ?? 0));
        break;

      case "newest":
        sortedProperties.sort(
          (a, b) =>
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
        break;

      case "oldest":
        sortedProperties.sort(
          (a, b) =>
            new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
        );
        break;

      default:
        break;
    }

    setFilteredProperties(sortedProperties);
  };

  return (
    <section className="py-[90px]">
      <div className="container mx-auto px-3">
        <div className="grid grid-cols-12 gap-6">
          {/* sidebar filter */}
          <div className="lg:col-span-3 col-span-12 hidden lg:flex">
            <div className="shadow-custom p-[30px] rounded-lg w-full h-fit">
              <div className="w-full">
                <div>
                  <div className="lg:hidden block">Back</div>
                </div>

                <div className="w-full">
                  <h6 className="font-semibold text-base text-[#586167] mb-[30px] capitalize relative before:content-[''] before:absolute before:w-[22px] before:h-[2px] before:-bottom-2 before:bg-primary">
                    Filter
                  </h6>

                  <div className="grid grid-cols-2 gap-2">
                    <div className="col-span-2">
                      <PropertyFilterDropdown
                        label="Property Status"
                        options={["For Sale", "For Rent"]}
                        selectedValue={filters.status}
                        onSelect={(value) =>
                          handleFilterChange("status", value)
                        }
                      />
                    </div>
                    <div className="col-span-2">
                      <PropertyFilterDropdown
                        label="Property Type"
                        options={["House", "Apartment", "Land"]}
                        selectedValue={filters.type}
                        onSelect={(value) => handleFilterChange("type", value)}
                      />
                    </div>
                    <div className="col-span-2">
                      <PropertyFilterDropdown
                        label="Property Location"
                        options={["New York", "Los Angeles", "Chicago"]}
                        selectedValue={filters.location}
                        onSelect={(value) =>
                          handleFilterChange("location", value)
                        }
                      />
                    </div>
                    <div className="col-span-2">
                      <PropertyFilterDropdown
                        label="Max Rooms"
                        options={["1", "2", "3", "4+", "Any"]}
                        selectedValue={filters.rooms}
                        onSelect={(value) => handleFilterChange("rooms", value)}
                      />
                    </div>
                    <div className="col-span-1">
                      <PropertyFilterDropdown
                        label="Bed"
                        options={["1", "2", "3", "4+"]}
                        selectedValue={filters.beds}
                        onSelect={(value) => handleFilterChange("beds", value)}
                      />
                    </div>
                    <div className="col-span-1">
                      <PropertyFilterDropdown
                        label="Bath"
                        options={["1", "2", "3", "4+"]}
                        selectedValue={filters.baths}
                        onSelect={(value) => handleFilterChange("baths", value)}
                      />
                    </div>

                    {/* Price Inputs */}
                    <div className="col-span-2">
                      <RangeSlider
                        label="Price"
                        min={0}
                        max={100000000}
                        value={filters.priceRange}
                        onChange={(value) =>
                          handleFilterChange("priceRange", value)
                        }
                      />
                    </div>

                    {/* area filter */}
                    <div className="col-span-2">
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
                        onClick={resetFilters}
                      >
                        Reset
                      </Button>
                    </div>
                    <div className="col-span-1 mt-4">
                      <Button
                        className="rounded-full w-full"
                        onClick={applyFilters}
                      >
                        Apply
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* property cards */}
          <div className="lg:col-span-9 col-span-12">
            <div className="mb-[30px] pb-[25px] border-b border-b-gray-200 flex lg:items-start justify-between flex-col lg:flex-row gap-4">
              {/* left */}
              <div>
                <h2 className="font-bold text-[30px] capitalize leading-[1.1] tracking-[0.001em] mb-1">
                  Properties Listing
                </h2>
                <span className="text-gray-500">
                  Showing <span className="text-primary">1-15 of 69</span>{" "}
                  Listings
                </span>
              </div>
              {/* right */}
              <div className="">
                <ul className="flex items-center gap-4">
                  <li>
                    <PropertyFilterDropdown
                      label="Sort by"
                      options={[
                        "Price: Low to High",
                        "Price: High to Low",
                        "Newest",
                        "Oldest",
                      ]}
                      selectedValue={sortBy}
                      onSelect={handleSortChange}
                      className="w-fit !px-3"
                      position={isMobile ? "bottom-left" : "bottom-right"}
                    />
                  </li>
                  <li className="lg:hidden ml-auto">
                    <div className="border rounded relative">
                      <span
                        className="text-[#878787] text-sm px-5 py-2 flex items-center cursor-pointer"
                        onClick={() => setOpenFilter(!openFilter)}
                      >
                        <span className="mr-4">Filter</span>
                        <FilterIcon size={15} className="ml-auto" />
                      </span>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
            <div>
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {loading ? (
                  [...Array(6)].map((_, i) => <PropertyCardSkeleton key={i} />)
                ) : filteredProperties.length > 0 ? (
                  filteredProperties.map((property, i) => (
                    <div key={i}>
                      <PropertyCard property={property} />
                    </div>
                  ))
                ) : (
                  <div>
                    <p>No property found</p>
                  </div>
                )}
              </div>
            </div>
            <div></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PropertyGrid;
