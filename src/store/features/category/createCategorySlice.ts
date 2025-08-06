// src/store/features/category/categorySlice.ts

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import Cookies from "js-cookie";

// Define category type
export interface Category {
  _id: string;
  categoryName: string;
  createdAt?: string;
  updatedAt?: string;
}

interface CategoryState {
  categories: Category[];
  loading: boolean;
  error: string | null;
  success: boolean;
}

const initialState: CategoryState = {
  categories: [],
  loading: false,
  error: null,
  success: false,
};

// ✅ POST: Add a new category
export const addCategory = createAsyncThunk(
  "category/addCategory",
  async (categoryName: string, { rejectWithValue }) => {
    try {
      const token = Cookies.get("accessToken");
      const formData = new FormData();
      formData.append("data", JSON.stringify({ categoryName }));
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_BASE_URL}/categories/create-category`,
        formData,
        {
          headers: {
            Authorization: `${token}`,
          },
        }
      );
      return response.data; // Assuming it returns the newly created category
    } catch (err: unknown) {
      if (axios.isAxiosError(err) && err.response) {
        return rejectWithValue(
          err.response.data?.message || "Failed to add category"
        );
      }
      return rejectWithValue("Failed to add category");
    }
  }
);

export const fetchCategories = createAsyncThunk(
  "category/fetchCategories",
  async (_, { rejectWithValue }) => {
    try {
      const token = Cookies.get("accessToken");
      const response = await axios.get(
        `${import.meta.env.VITE_BACKEND_BASE_URL}/categories/all-category`,
        {
          headers: {
            Authorization: `${token}`,
          },
        }
      );
      return response.data?.data || {}; // Adjust based on your actual response structure
    } catch (err: unknown) {
      if (axios.isAxiosError(err) && err.response) {
        return rejectWithValue(
          err.response.data?.message || "Failed to fetch categories"
        );
      }
      return rejectWithValue("Failed to fetch categories");
    }
  }
);

const categorySlice = createSlice({
  name: "category",
  initialState,
  reducers: {
    resetCategoryState: (state) => {
      state.loading = false;
      state.error = null;
      state.success = false;
    },
  },
  extraReducers: (builder) => {
    builder

      // 🔄 Add Category
      .addCase(addCategory.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(addCategory.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.categories.push(action.payload?.data); // Adjust path if needed
      })
      .addCase(addCategory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      // 🔄 Fetch Categories
      .addCase(fetchCategories.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.loading = false;
        state.categories = action.payload.result || [];
      })
      .addCase(fetchCategories.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { resetCategoryState } = categorySlice.actions;

export default categorySlice.reducer;
