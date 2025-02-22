"use client";
import { propertyData } from "@/data/propertyData";
import { useIsMobile, useIsTablet } from "@/hooks/useMobile";
import { setProperties } from "@/store/features/property/propertySlice";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import {
  ArrowLeftCircleIcon,
  FilterIcon,
  LayoutGridIcon,
  ListIcon,
} from "lucide-react";
import { useEffect, useState } from "react";
import PropertyCard from "./PropertyCard";
import PropertyCardSkeleton from "./PropertyCardSkeleton";
import PropertyFilter from "./PropertyFilter";
import PropertyFilterDropdown from "./PropertyFilterDropdown";

export interface FilterProps {
  status: string;
  type: string;
  location: string;
  rooms: string;
  beds: string;
  baths: string;
  priceRange: [number, number];
  area: [number, number];
}

const PropertyGrid = () => {
  const dispatch = useAppDispatch();
  const { properties } = useAppSelector((state) => state.property);
  const [filteredProperties, setFilteredProperties] = useState(properties);
  const [sortBy, setSortBy] = useState("");
  const [openFilter, setOpenFilter] = useState(false);
  const isMobile = useIsMobile();
  const isTablet = useIsTablet();
  const [loading, setLoading] = useState(true);
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  const [filters, setFilters] = useState<FilterProps>({
    status: "",
    type: "",
    location: "",
    rooms: "",
    beds: "",
    baths: "",
    priceRange: [0, 900000000],
    area: [0, 5000],
  });

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      dispatch(setProperties(propertyData));
      setLoading(false);
    }, 3000);
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
        (property) => property?.rooms?.length === parseInt(filters.rooms)
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
    setOpenFilter(false);
  };

  const resetFilters = () => {
    setFilters({
      status: "",
      type: "",
      location: "",
      rooms: "",
      beds: "",
      baths: "",
      priceRange: [0, 900000000],
      area: [0, 5000],
    });

    setFilteredProperties(propertyData);
    setOpenFilter(false);
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
          <div className="lg:col-span-3 col-span-12 hidden lg:flex">
            {/* sidebar filter start */}
            <div className="shadow-custom w-full h-fit">
              <PropertyFilter
                applyFilters={applyFilters}
                filters={filters}
                handleFilterChange={handleFilterChange}
                resetFilters={resetFilters}
              />
            </div>
            {/* sidebar filter end */}
          </div>

          {/* property cards */}
          <div className="lg:col-span-9 col-span-12">
            <div className="mb-[30px] pb-[25px] border-b border-b-gray-200 flex lg:items-start justify-between flex-col md:flex-row gap-4">
              {/* left */}
              <div>
                <h2 className="font-bold text-[30px] capitalize leading-[1.1] tracking-[0.001em] mb-1">
                  Properties Listing
                </h2>
                <span className="text-gray-500">
                  Showing <span className="text-primary">1-1 of 1</span>{" "}
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
                  
                  {isTablet && (
                    <li className="ml-auto">
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
                  )}

                  <li className="flex items-center gap-2 ">
                    <button
                      onClick={() => setViewMode("grid")}
                      className={`p-2 rounded-md ${
                        viewMode === "grid"
                          ? "bg-primary text-white"
                          : "text-gray-600 hover:bg-gray-100"
                      }`}
                    >
                      <LayoutGridIcon size={20} />
                    </button>
                    <button
                      onClick={() => setViewMode("list")}
                      className={`p-2 rounded-md ${
                        viewMode === "list"
                          ? "bg-primary text-white"
                          : "text-gray-600 hover:bg-gray-100"
                      }`}
                    >
                      <ListIcon size={20} />
                    </button>
                  </li>
                </ul>
              </div>
            </div>

            <div>
              <div
                className={`grid ${
                  viewMode === "grid"
                    ? "grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
                    : "grid-cols-1"
                } gap-6`}
              >
                {loading ? (
                  [...Array(6)].map((_, i) => <PropertyCardSkeleton key={i} />)
                ) : filteredProperties.length > 0 ? (
                  filteredProperties.map((property, i) => (
                    <div
                      key={i}
                      className={viewMode === "list" ? "lg:col-span-3" : ""}
                    >
                      <PropertyCard property={property} viewMode={viewMode} />
                    </div>
                  ))
                ) : (
                  <div className="col-span-full flex flex-col items-center justify-center py-10">
                    <p className="text-gray-500 text-lg font-medium">
                      No properties found
                    </p>
                    <p className="text-gray-400 text-sm mt-1">
                      Try adjusting your filters or check back later.
                    </p>
                  </div>
                )}
              </div>
            </div>
            <div></div>
          </div>
        </div>

        {/* Overlay when filter is open */}
        {isTablet && openFilter && (
          <div
            className="fixed inset-0 bg-black bg-opacity-50 z-40"
            onClick={() => setOpenFilter(false)}
          ></div>
        )}
        {/* mobile sidebar filter */}
        <div
          className={`lg:hidden fixed top-0 left-0 h-full w-full max-w-[300px] bg-white shadow-lg z-50 transition-transform duration-300 ease-in-out overflow-y-auto scrollbar-none ${
            openFilter ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          <div className="pt-4 px-3">
            <button
              className="flex items-center ml-auto cursor-pointer text-primary"
              onClick={() => setOpenFilter(false)}
            >
              <ArrowLeftCircleIcon size={16} />
              <span className="ml-1">Back</span>
            </button>
          </div>

          <div className="relative w-full">
            <PropertyFilter
              applyFilters={applyFilters}
              filters={filters}
              handleFilterChange={handleFilterChange}
              resetFilters={resetFilters}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default PropertyGrid;
