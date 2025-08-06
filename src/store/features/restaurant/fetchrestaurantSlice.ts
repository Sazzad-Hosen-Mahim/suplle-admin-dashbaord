// store/features/restaurant/fetchrestaurantSlice.ts
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchRestaurantById = createAsyncThunk(
  "restaurant/fetchById",
  async (id, thunkAPI) => {
    try {
      const res = await axios.get(
        `${
          import.meta.env.VITE_BACKEND_BASE_URL
        }/restaurant/single-restaurant/${id}`
      );
      return res.data.data; // Adjust based on actual API response shape
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export interface RestaurantMenu {
  _id: string;
  category: string;
  restaurant: string;
  itemName: string;
  image: string;
  price: number;
  size: string;
  availability: string;
  description: string;
  rating: number;
  like: number;
  isDeleted: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface Restaurant {
  taxInfo: any;
  businessPhone: string;
  businessEmail: string;
  businessName: string;
  _id: string;
  owner: string;
  restaurantName: string;
  menus: RestaurantMenu[];
  status: string;
  restaurantAddress: string;
  phone: string;
  logo: string;
  tagline: string;
  coverPhoto: string;
  images: string[];
  description: string;
  isDeleted: boolean;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface RestaurantState {
  data: Restaurant | null;
  loading: boolean;
  error: string | null;
}

const initialState: RestaurantState = {
  data: null,
  loading: false,
  error: null,
};

const restaurantSlice = createSlice({
  name: "restaurant",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchRestaurantById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchRestaurantById.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
        console.log(action.payload, "action payload in restaurant slice");
      })
      .addCase(fetchRestaurantById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default restaurantSlice.reducer;
