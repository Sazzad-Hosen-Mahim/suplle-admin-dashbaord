import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import type { RootState } from "../../../store";

interface DeletePlanState {
  loading: boolean;
  error: string | null;
  success: boolean;
}

const initialState: DeletePlanState = {
  loading: false,
  error: null,
  success: false,
};

export const deleteSubscriptionPlan = createAsyncThunk(
  "deletePlan/delete",
  async (planId: string, { rejectWithValue }) => {
    try {
      await axios.delete(
        `${
          import.meta.env.VITE_BACKEND_BASE_URL
        }/subscriptionPlan/delete-subscriptionPlan/${planId}`
      );
      return planId; // Return the deleted plan ID
    } catch (error: any) {
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      }
      return rejectWithValue(error.message);
    }
  }
);

const deletePlanSlice = createSlice({
  name: "deletePlan",
  initialState,
  reducers: {
    resetDeleteState: (state) => {
      state.loading = false;
      state.error = null;
      state.success = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(deleteSubscriptionPlan.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(deleteSubscriptionPlan.fulfilled, (state) => {
        state.loading = false;
        state.success = true;
      })
      .addCase(deleteSubscriptionPlan.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { resetDeleteState } = deletePlanSlice.actions;
export const selectDeletePlan = (state: RootState) => state.deletePlan;

export default deletePlanSlice.reducer;
