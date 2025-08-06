// src/features/subscriptionPlan/subscriptionPlanSlice.ts
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import type { SubscriptionPlanData } from "@/components/dashboard/dashboardItem/data/Type";

interface SubscriptionPlanState {
  loading: boolean;
  error: string | null;
  success: boolean;
}

const initialState: SubscriptionPlanState = {
  loading: false,
  error: null,
  success: false,
};

// Async thunk for updating a subscription plan
export const updateSubscriptionPlan = createAsyncThunk(
  "subscriptionPlan/update",
  async (
    {
      planId,
      planData,
    }: { planId: string; planData: Partial<SubscriptionPlanData> },
    { rejectWithValue }
  ) => {
    try {
      const response = await axios.put(
        `${
          import.meta.env.VITE_BACKEND_BASE_URL
        }/subscriptionPlan/update-subscriptionPlan/${planId}`,
        planData
      );
      return response.data;
    } catch (error: any) {
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);

const subscriptionPlanSlice = createSlice({
  name: "subscriptionPlan",
  initialState,
  reducers: {
    resetSubscriptionPlanState: (state) => {
      state.loading = false;
      state.error = null;
      state.success = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(updateSubscriptionPlan.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(updateSubscriptionPlan.fulfilled, (state) => {
        state.loading = false;
        state.success = true;
      })
      .addCase(updateSubscriptionPlan.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { resetSubscriptionPlanState } = subscriptionPlanSlice.actions;
export default subscriptionPlanSlice.reducer;
