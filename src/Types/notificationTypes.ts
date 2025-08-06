// types.ts or at the top of your slice file

export interface Notification {
  _id: string;
  user: string;
  type: string;
  message: string;
  status: "unverified" | "approved" | "pending"; // You can add more if needed
  isRead: boolean;
  isDeleted: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface NotificationsState {
  notifications: Notification[];
  isLoading: boolean;
  isError: boolean;
  errorMessage: string;
}
