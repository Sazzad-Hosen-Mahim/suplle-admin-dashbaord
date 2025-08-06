/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState, useCallback, useMemo, useEffect } from "react";
import axios from "axios";
import Cookies from "js-cookie";

import SectionHeader from "@/components/ui/sectionHeader";
import Pagination from "@/utils/Pagination";
import CreateUserModal from "@/components/dashboard/StaffViewForOwner/staff/CreateUserModal";
import SearchAndFilterBar from "@/components/dashboard/StaffViewForOwner/staff/SearchAndFilterBar";
import MonthFilter from "@/components/dashboard/StaffViewForOwner/staff/MonthFilter";
import UserTable from "@/components/dashboard/StaffViewForOwner/staff/UserTable";

export type User = {
  id: string;
  userName: string;
  email: string;
  phone?: string;
  number?: string;
  address?: string;
  workSchedule?: string;
  role: "manager" | "dine in" | "waiter" | "takeaway" | "chef" | "cashier" | "maintenance";
  status: "Active" | "Inactive";
};

const ITEMS_PER_PAGE =10;

const StaffViewForOwner = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    role: "",
    status: "",
    search: "",
    month: "",
  });

  // Fetch users from API
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const token = Cookies.get("accessToken");

        const response = await axios.get(
          `${import.meta.env.VITE_BACKEND_BASE_URL}/staff/all-staff`,
          {
            headers: {
              Authorization: token,
            },
          }
        );
    //  console.log("eitty",response)
        const apiUsers = response.data?.data?.result || [];

        const transformedUsers: User[] = apiUsers.map((staff: any) => {
          const user = staff?.user || {};
          const workDays = staff?.workDays || [];
          const workTime = staff?.workTime || {};

          return {
            id: staff._id,
            userName: user.name || "",
            email: user.email || "",
            phone: user.phone || "",
            number: user.phone || "",
            address: user.address || "",
            role: user.role || " ",
            status: staff.status || " ",
            workSchedule: workDays.length && workTime.start && workTime.end
              ? `${workDays.join(", ")}, ${workTime.start} to ${workTime.end}`
              : "",
          };
        });

        setUsers(transformedUsers);
      } catch (error) {
        console.error("Failed to fetch users:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  // Filter users based on current filters
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

      return matchesRole && matchesStatus && matchesSearch;
    });
  }, [users, filters]);

  // Paginate current users
  const currentUsers = useMemo(() => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredUsers.slice(startIndex, startIndex + ITEMS_PER_PAGE);
  }, [filteredUsers, currentPage]);

  // Handlers
  const handleRoleChange = useCallback((role: string) => {
    setFilters((prev) => ({ ...prev, role }));
    setCurrentPage(1);
  }, []);

  const handleStatusChange = useCallback((status: string) => {
    setFilters((prev) => ({ ...prev, status }));
    setCurrentPage(1);
  }, []);

  const handleSearch = useCallback((search: string) => {
    setFilters((prev) => ({ ...prev, search }));
    setCurrentPage(1);
  }, []);

  const handleMonthChange = useCallback((month: string) => {
    setFilters((prev) => ({ ...prev, month }));
    setCurrentPage(1);
  }, []);

  const handlePageChange = useCallback((_items: unknown[]) => {
    // optional: implement page data update if needed
  }, []);

  const handleEdit = useCallback((user: User) => {
    console.log("Edit user:", user);
  }, []);

  if (loading) {
    return <div className="p-4 text-center text-gray-600">Loading staff...</div>;
  }

  return (
    <>
      <SectionHeader
        showBackground={false}
        title="Orders"
        rightContent={<CreateUserModal ButtonText="Add New Staff" />}
      />

      <SearchAndFilterBar
        onRoleChange={handleRoleChange}
        onStatusChange={handleStatusChange}
        onSearch={handleSearch}
      />

      <MonthFilter onMonthChange={handleMonthChange} />

      <UserTable
        users={currentUsers}
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
  );
};

export default StaffViewForOwner;
