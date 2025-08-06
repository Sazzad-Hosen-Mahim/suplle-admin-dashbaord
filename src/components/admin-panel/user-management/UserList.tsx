import React from "react";
import UserItem from "./UserItem";
import type { User, UserRole } from "./user"; // Import UserRole from user.ts

interface UserListProps {
  users: User[];
  filter: "All" | UserRole; // Use UserRole instead of UserStatus
  onUserClick: (userId: string) => void;
  onEditClick: (userId: string) => void;
}

const UserList: React.FC<UserListProps> = ({
  users,
  filter,
  onUserClick,
  onEditClick,
}) => {
  const filteredUsers =
    filter === "All" ? users : users.filter((user) => user.role === filter);

  return (
    <div className="overflow-hidden">
      <div className="mb-4">
        <h2 className="md:text-2xl text-xl text-[#333333] dark:text-[#FFFFFF]">
          All Users
        </h2>
      </div>

      <div className="divide-y divide-gray-200">
        {filteredUsers.length > 0 ? (
          <UserItem
            users={filteredUsers}
            onClick={onUserClick}
            onEditClick={onEditClick}
          />
        ) : (
          <div className="p-6 text-center text-gray-500">
            No Users found in this category.
          </div>
        )}
      </div>
    </div>
  );
};

export default UserList;