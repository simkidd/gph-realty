"use client";
import Button from "@/components/ui-custom/Button";
import { Input } from "@/components/ui-custom/Input";
import useUsers from "@/hooks/useUsers";
import { IUser, UsersFilterInput } from "@/interfaces/user.interface";
import { ColumnDef } from "@tanstack/react-table";
import { Edit2Icon, EyeIcon, Trash2Icon, XIcon } from "lucide-react";
import moment from "moment";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { DataTable } from "../DataTable";
import { formatText } from "@/utils/helpers";

const ActionsComp = ({
  user,
  refetch,
}: {
  user: IUser;
  refetch: () => void;
}) => {
  const router = useRouter();

  const handleDelete = () => {
    toast.success(`${user?.name} deleted`);
    refetch();
  };

  return (
    <div className="flex items-center gap-2">
      <Button
        size={"icon"}
        variant={"outline"}
        onClick={() => router.push(`/admin/users/${user?.id}`)}
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

const UsersTable = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const itemsPerPage = 10;
  const [searchValue, setSearchValue] = useState("");
  const [debouncedSearchValue, setDebouncedSearchValue] = useState("");
  const [currentPage, setCurrentPage] = useState(
    parseInt(searchParams.get("page") || "1", 10)
  );
  const [params, setParams] = useState<UsersFilterInput>({
    page: currentPage,
    limit: itemsPerPage,
  });

  const { users, totalPages, totalUsers, isPending, refetch } =
    useUsers(params);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearchValue(searchValue);
    }, 300); // 300ms delay

    return () => {
      clearTimeout(handler);
    };
  }, [searchValue]);

  useEffect(() => {
    const newParams: UsersFilterInput = {
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

  const columns: ColumnDef<IUser>[] = [
    {
      accessorKey: "",
      header: "S/N",
      cell: ({ row }) => {
        const index = row.index;
        const serialNumber = (currentPage - 1) * itemsPerPage + index + 1;
        return <span className="">{serialNumber}</span>;
      },
    },
    {
      accessorKey: "name",
      header: "Name",
      cell: (info) => info.getValue(),
    },
    {
      accessorKey: "email",
      header: "Email Address",
      cell: (info) => info.getValue(),
    },
    {
      accessorKey: "role",
      header: "Role",
      cell: ({ row }) => {
        return (
          <span className="capitalize">
            {formatText(row.original?.role).toLowerCase()}
          </span>
        );
      },
    },
    {
      accessorKey: "createdAt",
      header: "Date Created",
      cell: ({ row }) => {
        return (
          <span>
            {moment(row.original?.createdAt).format("MMM DD, YYYY HH:mm A")}
          </span>
        );
      },
    },
    {
      accessorKey: "",
      header: "Actions",
      cell: ({ row }) => {
        return <ActionsComp user={row.original} refetch={refetch} />;
      },
    },
  ];

  return (
    <div>
      {/* Header Section */}
      <div className="flex justify-between items-end mb-4">
        {/* Text and Count */}
        <div>
          <p className="text-sm text-gray-600">
            Showing{" "}
            <span className="font-medium">
              {Math.min((currentPage - 1) * itemsPerPage + 1, totalUsers)} to{" "}
              {Math.min(currentPage * itemsPerPage, totalUsers)} of {totalUsers}
            </span>{" "}
            users
          </p>
        </div>

        {/* Search Input */}
        <div className="relative">
          <Input
            type="text"
            placeholder="Search users..."
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

      {/* DataTable */}
      <DataTable
        columns={columns}
        data={users}
        loading={isPending}
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={(newPage) => setCurrentPage(newPage)}
      />
    </div>
  );
};

export default UsersTable;
