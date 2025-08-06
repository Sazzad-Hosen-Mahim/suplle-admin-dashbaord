import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import Cookies from "js-cookie";

interface Restaurant {
  _id: string;
  restaurantName: string;
  restaurantAddress?: string;
  phone?: string;
  tagline?: string;
  description?: string;
}

interface SwitchAccountState {
  selectedRestaurant: Restaurant | null;
  loading: boolean;
  error: string | null;
}

const initialState: SwitchAccountState = {
  selectedRestaurant: null,
  loading: false,
  error: null,
};

export const switchAccount = createAsyncThunk(
  "switchAccount/switch",
  async (
    { email, restaurantId }: { email: string; restaurantId: string },
    { rejectWithValue }
  ) => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_BASE_URL}/auth/switch-account`,
        { email, restaurantId },
        {
          headers: {
            Authorization: Cookies.get("accessToken") || "",
            "Content-Type": "application/json",
          },
        }
      );
      // Return the loggedRestaurant object from the response
      const loggedRestaurant = response.data.data.loggedRestaurant;
      localStorage.setItem(
        "selectedRestaurant",
        JSON.stringify(loggedRestaurant)
      );
      return response.data.data.loggedRestaurant;
    } catch (error: unknown) {
      if (axios.isAxiosError(error) && error.response) {
        return rejectWithValue(error.response.data?.message || "Switch failed");
      }
      return rejectWithValue("Switch failed");
    }
  }
);

const switchAccountSlice = createSlice({
  name: "switchAccount",
  initialState,
  reducers: {
    setSelectedRestaurant(state, action) {
      state.selectedRestaurant = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(switchAccount.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(switchAccount.fulfilled, (state, action) => {
        state.loading = false;
        state.selectedRestaurant = action.payload;
      })
      .addCase(switchAccount.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { setSelectedRestaurant } = switchAccountSlice.actions;
export default switchAccountSlice.reducer;
