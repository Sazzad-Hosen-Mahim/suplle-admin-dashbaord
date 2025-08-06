// features/menu/menuSlice.ts
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import type { IMenuResponse, MenuState } from "@/Types/customerMenuTypes";

const initialState: MenuState = {
  menus: [],
  loading: false,
  error: null,
  meta: null,
};

export const fetchMenusByRestaurant = createAsyncThunk(
  "menu/fetchByRestaurant",
  async (restaurantId: string, { rejectWithValue }) => {
    try {
      const response = await axios.get<IMenuResponse>(
        `https://suplle-server-v2-1ydl.onrender.com/api/v1/menus/get-all-menu-by-restaurant?restaurant=${restaurantId}`
      );
      return response.data;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch menus"
      );
    }
  }
);

const menuSlice = createSlice({
  name: "menu",
  initialState,
  reducers: {
    clearMenuState: (state) => {
      state.menus = [];
      state.loading = false;
      state.error = null;
      state.meta = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchMenusByRestaurant.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchMenusByRestaurant.fulfilled, (state, action) => {
        state.loading = false;
        state.menus = action.payload.data.result;
        state.meta = action.payload.data.meta;
      })
      .addCase(fetchMenusByRestaurant.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { clearMenuState } = menuSlice.actions;
export default menuSlice.reducer;
