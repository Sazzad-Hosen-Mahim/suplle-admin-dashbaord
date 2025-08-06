import React, { useState, useEffect, useMemo } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import type { User, UserRole, UserActivity } from "./user";
import UserTabNavigation from "./UserTabNavigation";
import UserList from "./UserList";
import { ViewUserDialog } from "./ViewUserDialog";
import { EditUserDialog } from "./EditUserDialog";
import { Loader2 } from "lucide-react";
import Pagination from "@/utils/Pagination";

type UserRoleTab = "All" | UserRole;

const UserComponent: React.FC = () => {
  const [activeTab, setActiveTab] = useState<UserRoleTab>("All");
  const [users, setUsers] = useState<User[]>([]);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [editUser, setEditUser] = useState<User | null>(null);
  const [isViewOpen, setIsViewOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [loading, setLoading] = useState<boolean>(false);

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setLoading(true);
        const token = Cookies.get("accessToken");
        const res = await axios.get(
          `${import.meta.env.VITE_BACKEND_BASE_URL}/users/all-users`,
          {
            headers: { Authorization: token },
          }
        );


        const fetchedUsers = res.data.data.result
          .filter((user: any) => user.role === "restaurant_owner")
          .map((user: any) => ({
            id: user._id,
            name: user.name,
            mail: user.email,
            role: "Owner",
            status: (user.restaurant?.status as UserActivity) || "",
            vendor: user.restaurant?.restaurantName || "",
            image: user.restaurant?.logo || "",
            time: new Date(user.createdAt).toLocaleString(),
          }));

        setUsers(fetchedUsers);
      } catch (error) {
        console.error("Failed to fetch users:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const handleTabChange = (tab: UserRoleTab) => {
    setActiveTab(tab);
    setCurrentPage(1);
  };

  // ✅ Memoized filtered users to prevent infinite loop
  const filteredUsers = useMemo(() => {
    return activeTab === "All"
      ? users
      : users.filter((user) => user.role === activeTab);
  }, [users, activeTab]);

  // ✅ Memoized paginated users
  const paginatedUsers = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return filteredUsers.slice(startIndex, startIndex + itemsPerPage);
  }, [filteredUsers, currentPage]);

  const handleUserClick = (userId: string) => {
    const user = users.find((u) => u.id === userId);
    if (user) {
      setSelectedUser(user);
      setIsViewOpen(true);
    }
  };

  const handleEditClick = (userId: string) => {
    const user = users.find((u) => u.id === userId);
    if (user) {
      setEditUser({ ...user });
      setIsEditOpen(true);
    }
  };

  const handleSaveUser = (updatedUser: User) => {
    setUsers((prevUsers) =>
      prevUsers.map((user) => (user.id === updatedUser.id ? updatedUser : user))
    );
    setIsEditOpen(false);
  };

  // const handleDeleteUser = async (userId: string) => {
  //   if (!window.confirm("Are you sure you want to delete this user?")) return;
  //   try {
  //     setLoading(true);
  //     const token = Cookies.get("accessToken");
  //     await axios.delete(
  //       `${import.meta.env.VITE_BACKEND_BASE_URL}/users/delete-user/${userId}`,
  //       {
  //         headers: { Authorization: token },
  //       }
  //     );
  //     setUsers((prevUsers) => prevUsers.filter((user) => user.id !== userId));
  //     setIsViewOpen(false);
  //   } catch (error) {
  //     console.error("Failed to delete user:", error);
  //     alert("Failed to delete user.");
  //   } finally {
  //     setLoading(false);
  //   }
  // };
  // console.log(handleDeleteUser)
  return (
    <div>
      <div className="py-6">
        <h2 className="md:text-2xl text-xl text-[#333333] dark:text-[#FFFFFF]">
          User Management
        </h2>
      </div>

      <div className="pb-6">
        <UserTabNavigation activeTab={activeTab} onTabChange={handleTabChange} />
      </div>

      {loading ? (
        <div className="flex justify-center items-center py-20">
          <Loader2 className="animate-spin h-8 w-8 text-gray-500" />
        </div>
      ) : (
        <>
          <UserList
            users={paginatedUsers}
            filter={activeTab}
            onUserClick={handleUserClick}
            onEditClick={handleEditClick}
          />

          <Pagination
            data={filteredUsers}
            itemsPerPage={itemsPerPage}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            onPageChange={() => { }}
          />
        </>
      )}

      <ViewUserDialog
        open={isViewOpen}
        onOpenChange={setIsViewOpen}
        selectedUser={selectedUser}
        setUsers={setUsers}
      />

      <EditUserDialog
        open={isEditOpen}
        onOpenChange={setIsEditOpen}
        editUser={editUser}
        onSave={handleSaveUser}
        onCancel={() => setIsEditOpen(false)}
        setEditUser={setEditUser}
      />
    </div>
  );
};

export default UserComponent;
