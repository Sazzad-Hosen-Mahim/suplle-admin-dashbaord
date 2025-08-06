import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import Cookies from "js-cookie";
// Base URL for all requests;

// Interface
interface Subscription {
  _id: string;
  name: string;
  price: number;
  maxRestaurants: number;
  features: string[];
  billingCycle: string;
  createdAt: string;
  updatedAt: string;
}

interface SubscriptionState {
  subscriptions: Subscription[];
  loading: boolean;
  error: string | null;
}

const initialState: SubscriptionState = {
  subscriptions: [],
  loading: false,
  error: null,
};

interface SubscriptionPayload {
  name: string;
  price: number;
  maxRestaurants: number;
  features: string[];
  billingCycle: string;
}

const token = Cookies.get("accessToken");

// Async thunks
export const fetchSubscriptions = createAsyncThunk(
  "subscriptions/fetchAll",
  async (_, thunkAPI) => {
    try {
      const res = await axios.get(
        `${
          import.meta.env.VITE_BACKEND_BASE_URL
        }/subscriptionPlan/get-all-subscriptionPlan?isDeleted=false`,
        {
          headers: {
            Authorization: `${token}`,
          },
        }
      );
      return res.data.data.result;
    } catch (error: unknown) {
      if (axios.isAxiosError(error) && error.response) {
        return thunkAPI.rejectWithValue(
          error.response.data?.message || "Failed to fetch"
        );
      }
      return thunkAPI.rejectWithValue("Failed to fetch");
    }
  }
);

export const addSubscription = createAsyncThunk(
  "subscriptions/add",
  async (payload: SubscriptionPayload, thunkAPI) => {
    try {
      const res = await axios.post(
        `${
          import.meta.env.VITE_BACKEND_BASE_URL
        }/subscriptionPlan/create-subscriptionPlan`,
        payload,
        {
          headers: {
            Authorization: `${token}`,
          },
        }
      );
      return res.data.data;
    } catch (error: unknown) {
      if (axios.isAxiosError(error) && error.response) {
        return thunkAPI.rejectWithValue(
          error.response.data?.message || "Failed to add"
        );
      }
      return thunkAPI.rejectWithValue("Failed to add");
    }
  }
);

export const updateSubscription = createAsyncThunk(
  "subscriptions/update",
  async (
    { id, data }: { id: string; data: Partial<Subscription> },
    thunkAPI
  ) => {
    try {
      const res = await axios.patch(
        `${
          import.meta.env.VITE_BACKEND_BASE_URL
        }/subscriptionPlan/update-subscriptionPlan//${id}`,
        data,
        {
          headers: {
            Authorization: `${token}`,
          },
        }
      );
      return res.data.data;
    } catch (error: unknown) {
      if (axios.isAxiosError(error) && error.response) {
        return thunkAPI.rejectWithValue(
          error.response.data?.message || "Failed to update"
        );
      }
      return thunkAPI.rejectWithValue("Failed to update");
    }
  }
);

export const deleteSubscription = createAsyncThunk(
  "subscriptions/delete",
  async (id: string, thunkAPI) => {
    try {
      await axios.delete(
        `${
          import.meta.env.VITE_BACKEND_BASE_URL
        }/subscriptionPlan/delete-subscriptionPlan/${id}`,
        {
          headers: {
            Authorization: `${token}`,
          },
        }
      );
      return id;
    } catch (error: unknown) {
      if (axios.isAxiosError(error) && error.response) {
        return thunkAPI.rejectWithValue(
          error.response.data?.message || "Failed to delete"
        );
      }
      return thunkAPI.rejectWithValue("Failed to delete");
    }
  }
);

// Slice
const subscriptionSlice = createSlice({
  name: "subscriptions",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder

      // Fetch
      .addCase(fetchSubscriptions.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchSubscriptions.fulfilled, (state, action) => {
        state.loading = false;
        state.subscriptions = action.payload;
      })
      .addCase(fetchSubscriptions.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      // Add
      .addCase(addSubscription.pending, (state) => {
        state.loading = true;
        state.subscriptions = [];
      })
      .addCase(addSubscription.fulfilled, (state, action) => {
        state.subscriptions.push(action.payload);
        state.loading = false;
      })
      .addCase(addSubscription.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      // Update
      .addCase(updateSubscription.pending, (state) => {
        state.loading = true;
        state.subscriptions = [];
      })
      .addCase(updateSubscription.fulfilled, (state, action) => {
        const updated = action.payload;
        const index = state.subscriptions.findIndex(
          (s) => s._id === updated._id
        );
        if (index !== -1) {
          state.subscriptions[index] = updated;
        }
      })
      .addCase(updateSubscription.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error as string;
      })

      // Delete
      .addCase(deleteSubscription.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteSubscription.fulfilled, (state, action) => {
        state.subscriptions = state.subscriptions.filter(
          (s) => s._id !== action.payload
        );
      })
      .addCase(deleteSubscription.rejected, (state) => {
        state.loading = false;
        state.error = state.error as string;
      });
  },
});

export default subscriptionSlice.reducer;
