import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import Cookies from "js-cookie";

interface QrOrder {
  _id: string;
  user: string;
  restaurant: string;
  qrCodeDesign: string;
  price: number;
  tableQuantity: number;
  status: string;
  isPaid: boolean;
  isDeleted: boolean;
  orderId: string;
  createdAt: string;
  updatedAt: string;
}

interface QrOrderState {
  orders: QrOrder[];
  loading: boolean;
  error: string | null;
}

const initialState: QrOrderState = {
  orders: [],
  loading: false,
  error: null,
};

// Fetch all pending QR orders
export const fetchAllOrders = createAsyncThunk(
  "qrOrder/fetchAll",
  async (_, { rejectWithValue }) => {
    try {
      const token = Cookies.get("accessToken");
      const response = await axios.get(
        `${
          import.meta.env.VITE_BACKEND_BASE_URL
        }/qr-code-purchase/get-all-qr-code-purchase`,
        {
          headers: {
            Authorization: token ? token : "",
          },
        }
      );
      return response.data.data.result as QrOrder[];
    } catch (error: unknown) {
      if (axios.isAxiosError(error) && error.response) {
        return rejectWithValue(error.response.data?.message || "Fetch failed");
      }
      return rejectWithValue("Fetch failed");
    }
  }
);
export const fetchAllQrOrders = createAsyncThunk(
  "qrOrder/fetchAll",
  async (_, { rejectWithValue }) => {
    try {
      const token = Cookies.get("accessToken");
      const response = await axios.get(
        `${
          import.meta.env.VITE_BACKEND_BASE_URL
        }/qr-code-purchase/get-all-qr-code-purchase`,
        {
          headers: {
            Authorization: token ? token : "",
          },
        }
      );
      return response.data.data.result as QrOrder[];
    } catch (error: unknown) {
      if (axios.isAxiosError(error) && error.response) {
        return rejectWithValue(error.response.data?.message || "Fetch failed");
      }
      return rejectWithValue("Fetch failed");
    }
  }
);

export const fetchQrOrdersByStatus = createAsyncThunk(
  "qrOrder/fetchByStatus",
  async (status: string, { rejectWithValue }) => {
    try {
      const token = Cookies.get("accessToken");
      const response = await axios.get(
        `${
          import.meta.env.VITE_BACKEND_BASE_URL
        }/qr-code-purchase/get-all-qr-code-purchase?status=${status}`,
        {
          headers: {
            Authorization: token ? token : "",
          },
        }
      );
      return response.data.data.result;
    } catch (error: unknown) {
      if (axios.isAxiosError(error) && error.response) {
        return rejectWithValue(error.response.data?.message || "Fetch failed");
      }
      return rejectWithValue("Fetch failed");
    }
  }
);

// Change status of a QR order
export const changeQrOrderStatus = createAsyncThunk(
  "qrOrder/changeStatus",
  async (
    { id, status }: { id: string; status: string },
    { rejectWithValue }
  ) => {
    try {
      const token = Cookies.get("accessToken");
      const response = await axios.post(
        `${
          import.meta.env.VITE_BACKEND_BASE_URL
        }/qr-code-purchase/qr-purchase-decision-by-admin`,
        { id, status },
        {
          headers: {
            Authorization: token ? token : "",
            "Content-Type": "application/json",
          },
        }
      );
      console.log(response);
      return { id, status };
    } catch (error: unknown) {
      if (axios.isAxiosError(error) && error.response) {
        return rejectWithValue(
          error.response.data?.message || "Status change failed"
        );
      }
      return rejectWithValue("Status change failed");
    }
  }
);

// payment intent
export const qrPaymentIntent = createAsyncThunk(
  "qrOrder/qrPaymentIntent",
  async (
    { qrCodeDesignPurchaseId }: { qrCodeDesignPurchaseId: string },
    { rejectWithValue }
  ) => {
    try {
      const token = Cookies.get("accessToken");
      const response = await axios.post(
        `${
          import.meta.env.VITE_BACKEND_BASE_URL
        }/qr-code-purchase/create-qr-code-intent`,
        { qrCodeDesignPurchaseId },
        {
          headers: {
            Authorization: token ? token : "",
            "Content-Type": "application/json",
          },
        }
      );
      return response.data;
    } catch (error: unknown) {
      if (axios.isAxiosError(error) && error.response) {
        return rejectWithValue(
          error.response.data?.message || "Payment intent failed"
        );
      }
      return rejectWithValue("Payment intent failed");
    }
  }
);

const qrOrderSlice = createSlice({
  name: "qrOrder",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Fetch
      .addCase(fetchAllQrOrders.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAllQrOrders.fulfilled, (state, action) => {
        state.loading = false;
        state.orders = action.payload;
      })
      .addCase(fetchAllQrOrders.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(fetchQrOrdersByStatus.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchQrOrdersByStatus.fulfilled, (state, action) => {
        state.loading = false;
        state.orders = action.payload;
      })
      .addCase(fetchQrOrdersByStatus.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      // Change status
      .addCase(changeQrOrderStatus.fulfilled, (state, action) => {
        const { id, status } = action.payload;
        const order = state.orders.find((o) => o._id === id);
        if (order) order.status = status;
      });
  },
});

export default qrOrderSlice.reducer;
