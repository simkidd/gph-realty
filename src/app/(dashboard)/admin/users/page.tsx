import React from "react";
import UsersTable from "../../components/users/UsersTable";

const UsersPage = () => {
  return (
    <div className="py-6 px-0 w-full h-full">
      <h1 className="text-2xl font-bold mb-6">Users</h1>

      <div>
        <UsersTable />
      </div>
    </div>
  );
};

export default UsersPage;
