import SectionHeader from "@/components/ui/sectionHeader";
import SearchAndFilterBar from "@/components/dashboard/UserViewForOwner/user/SearchAndFilterBar";
import MonthFilter from "@/components/dashboard/UserViewForOwner/user/MonthFilter";
import UserTable from "@/components/dashboard/UserViewForOwner/user/UserTable";
import Pagination from "@/utils/Pagination";
import CreateUserModal from "@/components/dashboard/UserViewForOwner/user/CreateUserModal";
import { Loader2 } from "lucide-react";
import { useEffect, useMemo, useCallback, useState } from "react";
import { fetchOwnerUsers } from "@/store/features/user/userSlice";
import { useAppDispatch, useAppSelector } from "@/hooks/useRedux";


const UserViewForOwner = () => {
  const dispatch = useAppDispatch();
  const { users, loading } = useAppSelector((state) => state.users);

  const [currentPage, setCurrentPage] = useState(1);
  const [filters, setFilters] = useState({
    role: "",
    status: "",
    search: "",
    month: "",
  });

  useEffect(() => {
    dispatch(fetchOwnerUsers());
  }, [dispatch]);

  const filteredUsers = useMemo(() => {
    return users.filter((user) => {
      const matchesRole =
        !filters.role || user.role.toLowerCase() === filters.role.toLowerCase();
      const matchesStatus =
        !filters.status || user.status.toLowerCase() === filters.status.toLowerCase();
      const matchesSearch =
        !filters.search ||
        user.userName.toLowerCase().includes(filters.search.toLowerCase()) ||
        user.email.toLowerCase().includes(filters.search.toLowerCase()) ||
        user.role.toLowerCase().includes(filters.search.toLowerCase());
      const matchesMonth =
        !filters.month || (user.createdAt && user.createdAt.startsWith(filters.month));

      return matchesRole && matchesStatus && matchesSearch && matchesMonth;
    });
  }, [users, filters]);

  const ITEMS_PER_PAGE = 10;

  const handlePageChange = useCallback((_items: unknown[]) => {
    // Optional: Do something on page change
  }, []);

  interface User {
    id: string;
    userName: string;
    email: string;
    role: string;
    status: string;
    createdAt?: string;
  }

  const handleEdit = useCallback((user: User) => {
    console.log("Edit user:", user);
  }, []);

  return (
    <>
      <SectionHeader
        showBackground={false}
        title="User Management"
        rightContent={<CreateUserModal ButtonText="Create User" />}
      />

      <SearchAndFilterBar
        onRoleChange={(role) => setFilters((prev) => ({ ...prev, role }))}
        onStatusChange={(status) => setFilters((prev) => ({ ...prev, status }))}
        onSearch={(search) => setFilters((prev) => ({ ...prev, search }))}
      />

      <MonthFilter
        onMonthChange={(month) => setFilters((prev) => ({ ...prev, month }))}
      />

      {loading ? (
        <div className="flex justify-center items-center py-10">
          <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
        </div>
      ) : (
        <>
          <UserTable
            users={filteredUsers}
            onEdit={handleEdit}
            currentPage={currentPage}
            itemsPerPage={ITEMS_PER_PAGE}
          />

          <Pagination
            data={filteredUsers}
            itemsPerPage={ITEMS_PER_PAGE}
            onPageChange={handlePageChange}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
          />
        </>
      )}
    </>
  );
};

export default UserViewForOwner;
