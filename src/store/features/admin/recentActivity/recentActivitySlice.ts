import type {
  Notification,
  NotificationsState,
} from "@/Types/notificationTypes";
import {
  createSlice,
  createAsyncThunk,
  type PayloadAction,
} from "@reduxjs/toolkit";
import axios from "axios";
import Cookies from "js-cookie";

// Replace with your actual base URL

// Async thunk to fetch notifications
export const fetchNotifications = createAsyncThunk<
  Notification[],
  void,
  { rejectValue: string }
>("notifications/fetchNotifications", async (_, { rejectWithValue }) => {
  try {
    const token = Cookies.get("accessToken");
    const response = await axios.get(
      `${
        import.meta.env.VITE_BACKEND_BASE_URL
      }/notifications/get-all-notification`,
      {
        headers: {
          Authorization: `${token}`,
        },
      }
    );
    return response.data.data.result as Notification[];
  } catch (error: any) {
    return rejectWithValue(
      error.response?.data?.message || "Something went wrong"
    );
  }
});

const initialState: NotificationsState = {
  notifications: [],
  isLoading: false,
  isError: false,
  errorMessage: "",
};

const notificationsSlice = createSlice({
  name: "notifications",
  initialState,
  reducers: {
    markAsRead: (state, action: PayloadAction<string>) => {
      const id = action.payload;
      const notification = state.notifications.find((n) => n._id === id);
      if (notification) {
        notification.isRead = true;
      }
    },
    clearNotifications: (state) => {
      state.notifications = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchNotifications.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
        state.errorMessage = "";
      })
      .addCase(
        fetchNotifications.fulfilled,
        (state, action: PayloadAction<Notification[]>) => {
          state.isLoading = false;
          state.notifications = action.payload;
        }
      )
      .addCase(fetchNotifications.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.errorMessage = action.payload || "Failed to fetch notifications";
      });
  },
});

export const { markAsRead, clearNotifications } = notificationsSlice.actions;

export default notificationsSlice.reducer;
