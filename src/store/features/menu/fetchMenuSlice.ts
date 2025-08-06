import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import Cookies from "js-cookie";

interface MenuItem {
  _id: string;
  category: {
    _id: string;
    restaurant: string;
    categoryName: string;
    description: string;
    image: string;
    isDeleted: boolean;
    createdAt: string;
    updatedAt: string;
  };
  restaurant: {
    _id: string;
    owner: {
      _id: string;
      user: {
        _id: string;
        name: string;
        email: string;
        phone: string;
        role: string;
        isDeleted: boolean;
      };
      businessName: string;
      businessEmail: string;
      referralCode: string;
      status: string;
      isDeleted: boolean;
      createdAt: string;
      updatedAt: string;
      __v: number;
      restaurant: string;
    };
    restaurantName: string;
    menus: string[];
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
  };
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

interface MenuState {
  loading: boolean;
  success: boolean;
  error: string | null;
  menus: MenuItem[];
}

const initialMenuState: MenuState = {
  loading: false,
  success: false,
  error: null,
  menus: [],
};

export const fetchMenus = createAsyncThunk(
  "menu/fetchMenus",
  async (_, thunkAPI) => {
    try {
      const token = Cookies.get("accessToken");

      const response = await axios.get(
        `${import.meta.env.VITE_BACKEND_BASE_URL}/menus/all-menu`,
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

export const fetchMenuSlice = createSlice({
  name: "fetchMenu",
  initialState: initialMenuState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchMenus.pending, (state) => {
        state.loading = true;
        state.success = false;
        state.error = null;
      })
      .addCase(fetchMenus.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.error = null;
        state.menus = action.payload;
        console.log("Fetched Menus:", action.payload);
      })
      .addCase(fetchMenus.rejected, (state, action) => {
        state.loading = false;
        state.success = false;
        state.error = action.payload as string;
      });
  },
});

export default fetchMenuSlice.reducer;
