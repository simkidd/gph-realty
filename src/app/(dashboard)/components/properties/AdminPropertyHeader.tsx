import Button from "@/components/ui-custom/Button";
import { PlusIcon } from "lucide-react";
import Link from "next/link";
import React from "react";

const AdminPropertyHeader = () => {
  return (
    <div className="w-full">
      <div className="flex items-center justify-between gap-4">
        <h1 className="text-3xl font-bold mb-6">Property List</h1>

        <div className="flex justify-between items-center mb-4">
          <Link href={'/admin/properties/add-property'}>
            <Button className="text-sm">
              <PlusIcon size={18} className="mr-2" />
              Add New Property
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AdminPropertyHeader;
