// src/redux/slices/adminAnalyticsSlice.ts

import type {
  AdminAnalyticsData,
  AdminAnalyticsState,
  ChartDataPoint,
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
      }/admin-analytics/admin-dashboard-data`,
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

// Chart analytics thunk
export const fetchAdminChartAnalytics = createAsyncThunk<
  ChartDataPoint[],
  { startDate: string; endDate: string; groupBy: string },
  { rejectValue: string }
>(
  "adminAnalytics/fetchAdminChartAnalytics",
  async (params, { rejectWithValue }) => {
    try {
      const token = Cookies.get("accessToken");
      const response = await axios.get(
        `${import.meta.env.VITE_BACKEND_BASE_URL}/admin-analytics`,
        {
          headers: {
            Authorization: `${token}`,
          },
          params: {
            startDate: params.startDate,
            endDate: params.endDate,
            groupBy: params.groupBy,
          },
        }
      );

      if (response.data.success) {
        return response.data.data;
      } else {
        return rejectWithValue(
          response.data.message || "Failed to fetch chart analytics"
        );
      }
    } catch (error: any) {
      return rejectWithValue(error.message || "Network error");
    }
  }
);

const initialState: AdminAnalyticsState = {
  loading: false,
  error: null,
  data: null,
  chartData: [],
  chartLoading: false,
  chartError: null,
};

const adminAnalyticsSlice = createSlice({
  name: "adminAnalytics",
  initialState,
  reducers: {
    clearChartData: (state) => {
      state.chartData = [];
      state.chartError = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Dashboard data
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
      })
      // Chart data
      .addCase(fetchAdminChartAnalytics.pending, (state) => {
        state.chartLoading = true;
        state.chartError = null;
      })
      .addCase(
        fetchAdminChartAnalytics.fulfilled,
        (state, action: PayloadAction<ChartDataPoint[]>) => {
          state.chartLoading = false;
          state.chartData = action.payload;
        }
      )
      .addCase(fetchAdminChartAnalytics.rejected, (state, action) => {
        state.chartLoading = false;
        state.chartError = action.payload || "Failed to fetch chart analytics";
      });
  },
});

export const { clearChartData } = adminAnalyticsSlice.actions;
export default adminAnalyticsSlice.reducer;
