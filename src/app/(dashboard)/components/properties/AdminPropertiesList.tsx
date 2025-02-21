"use client";
import PropertyCard from "@/components/listing/PropertyCard";
import PropertyCardSkeleton from "@/components/listing/PropertyCardSkeleton";
import Button from "@/components/ui-custom/Button";
import { Input } from "@/components/ui-custom/Input";
import useProperties from "@/hooks/useProperties";
import {
  IProperty,
  PropertyFilterInput,
} from "@/interfaces/property.interface";
import { cn } from "@/lib/utils";
import { Edit2Icon, EyeIcon, Trash2Icon, XIcon } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { toast } from "sonner";
import { getPaginationRange } from "../DataTable";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "../ui/Pagination";

const ActionsComp = ({
  user,
  refetch,
}: {
  user: IProperty;
  refetch: () => void;
}) => {
  const router = useRouter();

  const handleDelete = () => {
    toast.success(`${user?.name} deleted`);
    refetch();
  };

  return (
    <div className="flex items-center gap-2 justify-end">
      <Button
        size={"icon"}
        variant={"outline"}
        onClick={() => router.push(`/admin/properties/${user?.id}`)}
      >
        <EyeIcon size={16} />
      </Button>
      <Button size={"icon"} variant={"outline"}>
        <Edit2Icon size={16} />
      </Button>
      <Button size={"icon"} variant={"destructive"} onClick={handleDelete}>
        <Trash2Icon size={16} />
      </Button>
    </div>
  );
};

const AdminPropertiesList = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const itemsPerPage = 10;
  const [searchValue, setSearchValue] = useState("");
  const [debouncedSearchValue, setDebouncedSearchValue] = useState("");
  const [currentPage, setCurrentPage] = useState(
    parseInt(searchParams.get("page") || "1", 10)
  );
  const [params, setParams] = useState<PropertyFilterInput>({
    page: currentPage,
    limit: itemsPerPage,
  });

  const { totalPages, totalProperties, properties, isPending, refetch } =
    useProperties(params);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearchValue(searchValue);
    }, 300); // 300ms delay

    return () => {
      clearTimeout(handler);
    };
  }, [searchValue]);

  useEffect(() => {
    const newParams: PropertyFilterInput = {
      page: currentPage,
      limit: itemsPerPage,
    };

    if (debouncedSearchValue) {
      newParams.search = debouncedSearchValue;
    }

    // Update URL with new search query and page
    const currentParams = new URLSearchParams(searchParams.toString());
    currentParams.set("page", currentPage.toString());

    if (debouncedSearchValue) {
      currentParams.set("search", debouncedSearchValue);
    } else {
      currentParams.delete("search");
    }

    router.push(`${pathname}?${currentParams.toString()}`);
    setParams(newParams);
  }, [
    currentPage,
    searchValue,
    debouncedSearchValue,
    pathname,
    router,
    searchParams,
  ]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchValue(value);
  };

  const clearInput = () => {
    setSearchValue("");
    setDebouncedSearchValue("");
    setCurrentPage(1);
  };

  return (
    <div>
      {/* Header Section */}
      <div className="flex justify-between items-end mb-4 py-4">
        {/* Text and Count */}
        <div>
          <p className="text-sm text-gray-600 font-semibold">
            Showing{" "}
            <span className=" text-primary">
              {Math.min((currentPage - 1) * itemsPerPage + 1, totalProperties)}{" "}
              - {Math.min(currentPage * itemsPerPage, totalProperties)} of{" "}
              {totalProperties}
            </span>{" "}
            Listings
          </p>
        </div>

        {/* Search Input */}
        <div className="relative">
          <Input
            type="text"
            placeholder="Search properties..."
            inputSize={"sm"}
            className="pl-4 pr-10"
            value={searchValue}
            onChange={handleChange}
          />
          {searchValue && (
            <button
              onClick={clearInput}
              className="absolute inset-y-0 right-2 flex items-center text-gray-500 hover:text-gray-700"
            >
              <XIcon size={18} />
            </button>
          )}
        </div>
      </div>


      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {isPending ? (
          [...Array(6)].map((_, i) => <PropertyCardSkeleton key={i} />)
        ) : properties.length > 0 ? (
          properties.map((property, i) => (
            <div key={i} className="space-y-2">
              <PropertyCard property={property} />
              <ActionsComp user={property} refetch={refetch} />
            </div>
          ))
        ) : (
          <div className="col-span-3 py-8">
            <p className="text-center">No data available</p>
          </div>
        )}
      </div>

      {/* Pagination Controls */}
      {properties.length > 0 && totalPages > 1 && (
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                aria-disabled={currentPage === 1}
                className={cn(
                  "text-sm",
                  currentPage === 1 && "pointer-events-none opacity-50"
                )}
              />
            </PaginationItem>
            {getPaginationRange(currentPage, totalPages).map((page) => (
              <PaginationItem key={page}>
                <PaginationLink
                  isActive={page === currentPage}
                  onClick={() => setCurrentPage(page)}
                >
                  {page}
                </PaginationLink>
              </PaginationItem>
            ))}
            <PaginationItem>
              <PaginationNext
                onClick={() =>
                  setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                }
                aria-disabled={currentPage === totalPages}
                className={cn(
                  "text-sm",
                  currentPage === totalPages && "pointer-events-none opacity-50"
                )}
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      )}
    </div>
  );
};

export default AdminPropertiesList;
