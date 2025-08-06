// src/redux/slices/orderSlice.ts
import type { Order } from "@/Types/OrderTypes";
import {
  createSlice,
  createAsyncThunk,
  type PayloadAction,
} from "@reduxjs/toolkit";
import axios from "axios";
import Cookies from "js-cookie";

interface OrderState {
  data: Order[];
  current?: Order;
  loading: boolean;
  updating: boolean;
  error: string | null;
}

const initialState: OrderState = {
  data: [],
  current: undefined,
  loading: false,
  updating: false,
  error: null,
};

export const fetchOrders = createAsyncThunk(
  "orders/fetchOrders",
  async (_, thunkAPI) => {
    try {
      const token = Cookies.get("accessToken");
      console.log("Fetching orders with token:", token);
      const response = await axios.get(
        `${import.meta.env.VITE_BACKEND_BASE_URL}/order/all-order`,
        {
          headers: {
            Authorization: `${token}`,
          },
        }
      );

      return response.data?.data?.result || [];
    } catch (error: unknown) {
      let errorMessage = "Failed to fetch menus";
      if (error && typeof error === "object" && "response" in error) {
        const err = error as { response?: { data?: { message?: string } } };
        errorMessage = err.response?.data?.message || errorMessage;
      }
      return thunkAPI.rejectWithValue(errorMessage);
    }
  }
);

// Fetch single order
export const fetchOrderById = createAsyncThunk(
  "orders/fetchById",
  async (id: string, thunkAPI) => {
    try {
      const token = Cookies.get("accessToken");
      const res = await axios.get(
        `${import.meta.env.VITE_BACKEND_BASE_URL}/order/single-order/${id}`,
        { headers: { Authorization: token } }
      );
      return res.data.data[0];
    } catch (err: unknown) {
      if (err && typeof err === "object" && "response" in err) {
        const error = err as {
          response?: { data?: { message?: string } };
          message?: string;
        };
        return thunkAPI.rejectWithValue(
          error.response?.data?.message ||
            error.message ||
            "Failed to fetch order"
        );
      }
      return thunkAPI.rejectWithValue("Failed to fetch order");
    }
  }
);

export const updateOrder = createAsyncThunk(
  "orders/createOrders",
  async (
    { id, updatedPayload }: { id: string; updatedPayload: Order },
    thunkAPI
  ) => {
    try {
      const token = Cookies.get("accessToken");

      const res = await axios.put(
        `${import.meta.env.VITE_BACKEND_BASE_URL}/order/update-order/${id}`,
        updatedPayload,
        {
          headers: {
            Authorization: token,
          },
        }
      );

      return res?.data?.data;
    } catch (err: unknown) {
      let errorMessage = "Failed to update order";
      if (err && typeof err === "object" && "response" in err) {
        const error = err as {
          response?: { data?: { message?: string } };
          message?: string;
        };
        errorMessage =
          error.response?.data?.message || error.message || errorMessage;
      }
      return thunkAPI.rejectWithValue(errorMessage);
    }
  }
);

const orderSlice = createSlice({
  name: "orders",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      //fetch all
      .addCase(fetchOrders.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchOrders.fulfilled, (state, action) => {
        state.data = action.payload;
        console.log(action.payload, "payload in orders");
        state.loading = false;
      })
      .addCase(fetchOrders.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch orders";
      })
      //fetch single
      .addCase(fetchOrderById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        fetchOrderById.fulfilled,
        (state, action: PayloadAction<Order>) => {
          state.current = action.payload;
          state.loading = false;
        }
      )
      .addCase(fetchOrderById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      //update order
      .addCase(updateOrder.pending, (s) => {
        s.updating = true;
        s.error = null;
      })
      .addCase(updateOrder.fulfilled, (state, action: PayloadAction<Order>) => {
        const updated = action.payload;
        state.data = state.data.map((o) =>
          o._id === updated._id ? updated : o
        );
        if (state.current?._id === updated._id) {
          state.current = updated;
        }
        state.updating = false;
      })
      .addCase(updateOrder.rejected, (state, action) => {
        state.updating = false;
        state.error = action.payload as string;
      });
  },
});

export default orderSlice.reducer;
