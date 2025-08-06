import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import Cookies from "js-cookie";

interface CreateMenuState {
  loading: boolean;
  success: boolean;
  error: string | null;
}

const initialState: CreateMenuState = {
  loading: false,
  success: false,
  error: null,
};

// View menu

//

// Thunk for fetching nmenu

// Thunk for creating a menu item
export const createMenu = createAsyncThunk(
  "menu/createMenu",
  async (
    menuData: { data: Record<string, unknown>; image: File; menuFile?: File },
    thunkAPI
  ) => {
    try {
      const formData = new FormData();

      formData.append("data", JSON.stringify(menuData.data));
      formData.append("image", menuData.image);
      console.log(menuData.image, "image in sliceeeeeeee");

      if (menuData.menuFile) {
        formData.append("menuFile", menuData.menuFile);
      }

      const token = Cookies.get("accessToken");

      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_BASE_URL}/menus/create-menu`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `${token}`,
          },
        }
      );

      return response.data;
    } catch (error: unknown) {
      let errorMessage = "Failed to create menu item";
      if (error && typeof error === "object" && "response" in error) {
        const err = error as { response?: { data?: { message?: string } } };
        errorMessage = err.response?.data?.message || errorMessage;
      }
      return thunkAPI.rejectWithValue(errorMessage);
    }
  }
);

// Slice for fetching menus

// Slice for creating a menu

const createMenuSlice = createSlice({
  name: "menu",
  initialState,
  reducers: {
    resetCreateMenuState: (state) => {
      state.loading = false;
      state.success = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createMenu.pending, (state) => {
        state.loading = true;
        state.success = false;
        state.error = null;
      })
      .addCase(createMenu.fulfilled, (state) => {
        state.loading = false;
        state.success = true;
        state.error = null;
      })
      .addCase(createMenu.rejected, (state, action) => {
        state.loading = false;
        state.success = false;
        state.error = action.payload as string;
      });
  },
});

export const { resetCreateMenuState } = createMenuSlice.actions;
export default createMenuSlice.reducer;
