export type UserRole = "Owner" | "Staff" | "Manager" | "Waiter" | "Dine In";
export type UserActivity = "Active" | "Inactive" | "Takeaway";
export type UserRoleTab = "All" | UserRole;

export interface User {
  id: string;
  name: string;
  mail: string;
  role: UserRole;
  status: UserActivity;
  vendor: string;
  image: string;
  time: string;
}