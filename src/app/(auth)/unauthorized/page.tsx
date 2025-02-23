import Button from "@/components/ui-custom/Button";
import Link from "next/link";
import React from "react";

const UnauthorizedPage = () => {
  return (
    <div className="flex flex-col items-center justify-center px-6">
      <div className="p-8 max-w-md text-center">
        <h1 className="text-2xl font-bold text-red-600">Access Denied</h1>
        <p className="mt-2 text-gray-600">
          You don&apos;t have permission to view this page.
        </p>
        <Link href="/" className="mt-6 inline-block">
          <Button variant={'outline'} className="px-6">
            Back to Home
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default UnauthorizedPage;
