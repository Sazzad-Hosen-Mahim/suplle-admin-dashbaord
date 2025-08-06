export type User = {
  id: number;
  Name: string;
  phone?: string;
  email: string;
  role:
    | "manager"
    | "dine-in"
    | "waiter"
    | "takeaway"
    | "chef"
    | "cashier"
    | "maintenance";
  status: "Active" | "Inactive";
  workSchedule?: string; // Add this
  address?: string; // Add this
};

// types.ts
export type StatusValue = "active" | "inactive" | "suspended";

export type StatusOption = {
  value: StatusValue;
  label: string;
};

export const userStatus: StatusOption[] = [
  { value: "active", label: "Active" },
  { value: "inactive", label: "Inactive" },
  { value: "suspended", label: "Suspended" },
];
