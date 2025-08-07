// src/redux/slices/adminAnalyticsSlice.ts

import type {
  AdminAnalyticsData,
  AdminAnalyticsState,
} from "@/Types/adminAnalyticsTypes";
import {
  createSlice,
  createAsyncThunk,
  type PayloadAction,
} from "@reduxjs/toolkit";
import axios from "axios";
import Cookies from "js-cookie";

export const fetchAdminAnalytics = createAsyncThunk<
  AdminAnalyticsData,
  void,
  { rejectValue: string }
>("adminAnalytics/fetchAdminAnalytics", async (_, { rejectWithValue }) => {
  try {
    const token = Cookies.get("accessToken");
    const response = await axios.get(
      `${
        import.meta.env.VITE_BACKEND_BASE_URL
      }/admin-analytics/all-admin-analytics`,
      {
        headers: {
          Authorization: `${token}`,
        },
      }
    );
    if (response.data.success) {
      return response.data.data;
    } else {
      return rejectWithValue(
        response.data.message || "Failed to fetch analytics"
      );
    }
  } catch (error: any) {
    return rejectWithValue(error.message || "Network error");
  }
});

const initialState: AdminAnalyticsState = {
  loading: false,
  error: null,
  data: null,
};

const adminAnalyticsSlice = createSlice({
  name: "adminAnalytics",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAdminAnalytics.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        fetchAdminAnalytics.fulfilled,
        (state, action: PayloadAction<AdminAnalyticsData>) => {
          state.loading = false;
          state.data = action.payload;
        }
      )
      .addCase(fetchAdminAnalytics.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to fetch admin analytics";
      });
  },
});

export default adminAnalyticsSlice.reducer;
