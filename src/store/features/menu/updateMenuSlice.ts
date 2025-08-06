// features/menu/menuSlice.ts

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import Cookies from "js-cookie";

interface MenuUpdateState {
  loading: boolean;
  success: boolean;
  error: string | null;
}

const initialState: MenuUpdateState = {
  loading: false,
  success: false,
  error: null,
};

// Thunk for updating a menu item
interface UpdateMenuResponse {
  // Define the expected properties returned by your API, for example:
  success: boolean;
  message: string;
  // Add other fields as needed
}

export const updateMenu = createAsyncThunk<
  UpdateMenuResponse,
  {
    menuId: string;
    formData: Record<string, unknown>;
    image?: File;
    restaurantId: string;
  },
  { rejectValue: string }
>(
  "menu/updateMenu",
  async ({ menuId, formData, image, restaurantId }, { rejectWithValue }) => {
    try {
      const token = Cookies.get("accessToken");
      const data = {
        ...formData,
        restaurant: restaurantId,
      };

      const payload = new FormData();
      payload.append("data", JSON.stringify(data));
      if (image) {
        payload.append("image", image);
      }
      //   formData.append("image", formData.image);

      const response = await axios.put(
        `${import.meta.env.VITE_BACKEND_BASE_URL}/menus/update-menu/${menuId}`,
        payload,
        {
          headers: {
            Authorization: `${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      return response.data;
    } catch (error: unknown) {
      if (axios.isAxiosError(error) && error.response?.data?.message) {
        return rejectWithValue(error.response.data.message);
      }
      return rejectWithValue("Failed to update menu");
    }
  }
);

const menuSlice = createSlice({
  name: "menu",
  initialState,
  reducers: {
    resetUpdateState: (state) => {
      state.loading = false;
      state.success = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(updateMenu.pending, (state) => {
        state.loading = true;
        state.success = false;
        state.error = null;
      })
      .addCase(updateMenu.fulfilled, (state) => {
        state.loading = false;
        state.success = true;
      })
      .addCase(updateMenu.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Update failed";
      });
  },
});

export const { resetUpdateState } = menuSlice.actions;
export default menuSlice.reducer;
