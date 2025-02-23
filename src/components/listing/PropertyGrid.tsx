"use client";
import { useIsMobile, useIsTablet } from "@/hooks/useMobile";
import useProperties from "@/hooks/useProperties";
import { PropertyFilterInput } from "@/interfaces/property.interface";
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
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/app/(dashboard)/components/ui/Pagination";
import { cn } from "@/lib/utils";
import { getPaginationRange } from "@/app/(dashboard)/components/DataTable";

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
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const [openFilter, setOpenFilter] = useState(false);
  const isMobile = useIsMobile();
  const isTablet = useIsTablet();
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [currentPage, setCurrentPage] = useState(
    parseInt(searchParams.get("page") || "1", 10)
  );
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
  const itemsPerPage = 3;

  const [params, setParams] = useState<PropertyFilterInput>({
    page: currentPage,
    limit: itemsPerPage,
    draft: false,
  });

  const { totalPages, totalProperties, properties, isPending } =
    useProperties(params);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleFilterChange = (key: string, value: any) => {
    setFilters((prev) => {
      // Handle array values for priceRange and area
      if (key === "priceRange" || key === "area") {
        const newValue = Array.isArray(value) ? value : [value, prev[key]?.[1]];
        return { ...prev, [key]: newValue };
      }
      return { ...prev, [key]: value };
    });
  };

  useEffect(() => {
    const newParams: PropertyFilterInput = {
      page: currentPage,
      limit: itemsPerPage,
      draft: false,
    };

    // Explicitly check and add each filter parameter
    const status = searchParams.get("status");
    const type = searchParams.get("type");
    const location = searchParams.get("location");
    const rooms = searchParams.get("rooms");
    const beds = searchParams.get("beds");
    const baths = searchParams.get("baths");
    const priceRange = searchParams.get("priceRange");
    const area = searchParams.get("area");

    // Set parameters only if they exist in URL
    if (status) newParams.status = status;
    if (type) newParams.type = type;
    if (location) newParams.location = location;
    if (rooms) newParams.rooms = rooms;
    if (beds) newParams.beds = beds;
    if (baths) newParams.baths = baths;
    if (priceRange) newParams.priceRange = priceRange;
    if (area) newParams.area = area;

    // const currentParams = new URLSearchParams(searchParams.toString());
    // if (currentPage > 1) {
    //   currentParams.set("page", currentPage.toString());
    // } else {
    //   currentParams.delete("page");
    // }

    // router.push(`${pathname}?${currentParams.toString()}`, { scroll: false });
    setParams(newParams);
  }, [currentPage, searchParams, pathname, router]);

  // handling the apply filters
  const applyFilters = () => {
    const params = new URLSearchParams(searchParams);

    // Set filter parameters
    if (filters.status) params.set("status", filters.status);
    if (filters.type) params.set("type", filters.type);
    if (filters.location) params.set("location", filters.location);
    if (filters.rooms) params.set("rooms", filters.rooms);
    if (filters.beds) params.set("beds", filters.beds);
    if (filters.baths) params.set("baths", filters.baths);

    // Handle price range
    if (filters.priceRange[0] > 0 || filters.priceRange[1] < 900000000) {
      params.set(
        "priceRange",
        `${filters.priceRange[0]},${filters.priceRange[1]}`
      );
    } else {
      params.delete("priceRange");
    }

    // Handle area range
    if (filters.area[0] > 0 || filters.area[1] < 5000) {
      params.set("area", `${filters.area[0]},${filters.area[1]}`);
    } else {
      params.delete("area");
    }

    // Always reset to first page when applying filters
    params.set("page", "1");
    setCurrentPage(1);

    // Update URL
    router.push(`${pathname}?${params.toString()}`);

    // Update params state
    setParams((prev) => ({
      ...prev,
    }));
    setOpenFilter(false);
  };

  const resetFilters = () => {
    const defaultFilters: FilterProps = {
      status: "",
      type: "",
      location: "",
      rooms: "",
      beds: "",
      baths: "",
      priceRange: [0, 900000000],
      area: [0, 5000],
    };

    setFilters(defaultFilters);

    // Clear URL parameters
    router.push(pathname);
    setCurrentPage(1);
    setOpenFilter(false);
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
                disabled={!filters}
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
                <p className="text-sm text-gray-600 font-semibold">
                  Showing{" "}
                  <span className=" text-primary">
                    {Math.min(
                      (currentPage - 1) * itemsPerPage + 1,
                      totalProperties
                    )}{" "}
                    - {Math.min(currentPage * itemsPerPage, totalProperties)} of{" "}
                    {totalProperties}
                  </span>{" "}
                  Listings
                </p>
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
                      selectedValue={""}
                      onSelect={() => {}}
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
                {isPending ? (
                  [...Array(6)].map((_, i) => <PropertyCardSkeleton key={i} />)
                ) : properties.length > 0 ? (
                  properties.map((property, i) => (
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

              {/* Pagination Controls */}
              {properties.length > 0 && totalPages > 1 && (
                <div className="mt-14">
                  <Pagination>
                    <PaginationContent>
                      <PaginationItem>
                        <PaginationPrevious
                          onClick={() =>
                            setCurrentPage((prev) => Math.max(prev - 1, 1))
                          }
                          aria-disabled={currentPage === 1}
                          className={cn(
                            "text-sm",
                            currentPage === 1 &&
                              "pointer-events-none opacity-50"
                          )}
                        />
                      </PaginationItem>
                      {getPaginationRange(currentPage, totalPages).map(
                        (page) => (
                          <PaginationItem key={page}>
                            <PaginationLink
                              isActive={page === currentPage}
                              onClick={() => setCurrentPage(page)}
                            >
                              {page}
                            </PaginationLink>
                          </PaginationItem>
                        )
                      )}
                      <PaginationItem>
                        <PaginationNext
                          onClick={() =>
                            setCurrentPage((prev) =>
                              Math.min(prev + 1, totalPages)
                            )
                          }
                          aria-disabled={currentPage === totalPages}
                          className={cn(
                            "text-sm",
                            currentPage === totalPages &&
                              "pointer-events-none opacity-50"
                          )}
                        />
                      </PaginationItem>
                    </PaginationContent>
                  </Pagination>
                </div>
              )}
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
              disabled={!filters}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default PropertyGrid;
