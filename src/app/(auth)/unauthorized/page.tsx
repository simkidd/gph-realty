import Link from "next/link";
import React from "react";

const UnauthorizedPage = () => {
  return (
    <div>
      <div>You&apos;re not authorized to access this page</div>
      <Link href={"/"}>
        <button>Back to Home</button>
      </Link>
    </div>
  );
};

export default UnauthorizedPage;
