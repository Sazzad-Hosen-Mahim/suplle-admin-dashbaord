import { Button } from "@/components/ui/button";

import { useState, useEffect } from "react";

import EditUserModal from "./EditUserModal";
import EditIcon from "@/components/ui/EditIcon";
import DeleteUserButton from "./DeleteUserButton";
import type { User } from "@/store/features/user/userSlice";

// Types
interface UserTableProps {
  users: User[]; // Full filtered user list
  onEdit: (user: User) => void;
  currentPage: number;
  itemsPerPage: number;
}

interface UserTableRowProps {
  user: User;
  index: number;
  serialNumber: number;
  onView: (user: User) => void;
  onEdit: (updatedUser: User) => void;
  onDeleteSuccess: (id: string) => void;
}

// Table Row Component
const UserTableRow = ({
  user,
  serialNumber,
  onView,
  onEdit,
  onDeleteSuccess,
}: UserTableRowProps) => {
  return (
    <tr className="bg-white border-b dark:bg-primary-dark dark:text-white">
      <td className="px-6 py-4">{serialNumber}</td>
      <td className="px-6 py-4">{user.userName}</td>
      <td className="px-6 py-4">{user.email}</td>
      <td className="px-6 py-4">{user.role}</td>
      <td className="px-6 py-4">
        <span
          className={`px-2 py-1 rounded-full text-xs ${
            user.status === "Active"
              ? "bg-green-100 text-green-800"
              : "bg-red-100 text-red-800"
          }`}
        >
          {user.status}
        </span>
      </td>
      <td className="px-6 py-4">
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" onClick={() => onView(user)}>
            <DeleteUserButton
              userId={user.id}
              onDeleteSuccess={() => onDeleteSuccess(user.id)}
            />
          </Button>

          <Button variant="ghost" size="icon">
            <EditUserModal
              selectedUser={user}
              onEdit={onEdit}
              ButtonText={<EditIcon className="h-4 w-4" />}
            />
          </Button>
        </div>
      </td>
    </tr>
  );
};

// Main Table Component
export default function UserTable({
  users,
  onEdit,
  currentPage,
  itemsPerPage,
}: UserTableProps) {
  // Local state for paginated users
  const [paginatedUsers, setPaginatedUsers] = useState<User[]>([]);

  useEffect(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    setPaginatedUsers(users.slice(startIndex, endIndex));
  }, [users, currentPage, itemsPerPage]);

  const handleView = () => {
    // Optional: implement view modal or details if needed
  };

  const handleEdit = (updatedUser: User) => {
    // Call parent's onEdit to update user in main state
    onEdit(updatedUser);

    // Also update paginated users locally to reflect changes immediately
    setPaginatedUsers((prev) =>
      prev.map((user) => (user.id === updatedUser.id ? updatedUser : user))
    );
  };

  const handleDeleteSuccess = (id: string) => {
    // Remove deleted user from paginated users
    setPaginatedUsers((prev) => prev.filter((user) => user.id !== id));
    // Optionally parent should remove user from full list for consistency
  };

  return (
    <div className="relative overflow-x-auto my-4">
      <table className="w-full text-sm text-left text-gray-500">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:text-white dark:bg-primary-dark">
          <tr>
            <th scope="col" className="px-6 py-3">
              Sl.
            </th>
            <th scope="col" className="px-6 py-3">
              User Name
            </th>
            <th scope="col" className="px-6 py-3">
              Email
            </th>
            <th scope="col" className="px-6 py-3">
              Role
            </th>
            <th scope="col" className="px-6 py-3">
              Status
            </th>
            <th scope="col" className="px-6 py-3">
              Action
            </th>
          </tr>
        </thead>
        <tbody>
          {paginatedUsers.length === 0 ? (
            <tr>
              <td colSpan={6} className="text-center py-6">
                No users found.
              </td>
            </tr>
          ) : (
            paginatedUsers.map((user, index) => (
              <UserTableRow
                key={user.id}
                user={user}
                index={index}
                serialNumber={(currentPage - 1) * itemsPerPage + index + 1}
                onView={handleView}
                onEdit={handleEdit}
                onDeleteSuccess={handleDeleteSuccess}
              />
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
