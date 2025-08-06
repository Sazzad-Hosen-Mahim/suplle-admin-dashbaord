import {
  createAsyncThunk,
  createSlice,
  type ActionReducerMapBuilder,
  type PayloadAction,
} from "@reduxjs/toolkit";
import axios from "axios";
import Cookies from "js-cookie";

interface User {
  _id: string;
  restuarant: string | null;
  name: string;
  email: string;
  role: string;
  image: string | null;
}

interface AuthState {
  user: User | null;
  accessToken: string | null;
  loading: boolean;
  error: string | null;
}

const initialState: AuthState = {
  user: null,
  accessToken: null,
  loading: false,
  error: null,
};

const baseURL = import.meta.env.VITE_BACKEND_BASE_URL;

// Login for restaurant owner

export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async (
    { email, password }: { email: string; password: string },
    thunkAPI
  ) => {
    try {
      const res = await axios.post(`${baseURL}/auth/login`, {
        email,
        password,
      });

      const { user, accessToken } = res.data.data;

      Cookies.set("accessToken", accessToken, { expires: 1 });
      Cookies.set("user", JSON.stringify(user));

      return { user, accessToken };
    } catch (error: unknown) {
      let message = "Login failed";
      if (
        error &&
        typeof error === "object" &&
        "response" in error &&
        error.response &&
        typeof error.response === "object" &&
        "data" in error.response &&
        error.response.data &&
        typeof error.response.data === "object" &&
        "message" in error.response.data
      ) {
        message =
          (error.response as { data: { message?: string } }).data.message ||
          message;
      }
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Sign Up for restaurant owner

export const registerUser = createAsyncThunk(
  "auth/registerUser",
  async (
    {
      phone,
      restaurantName,
      businessName,
      businessEmail,
      restaurantAddress,
      password,
      referralCode,
    }: {
      phone: string;
      restaurantName: string;
      businessName: string;
      businessEmail: string;
      restaurantAddress: string;
      password: string;
      referralCode?: string;
    },
    thunkAPI
  ) => {
    try {
      const res = await axios.post(
        `${baseURL}/auth/register-restuarant-owner`,
        {
          phone,
          restaurantName,
          businessName,
          businessEmail,
          restaurantAddress,
          password,
          referralCode,
        }
      );

      // const { userEmail } = res.data;
      Cookies.set("userEmail", res?.data?.data?.userEmail);
      console.log(
        "User email in register reduxSlice:",
        res?.data?.data?.userEmail
      );
      return res.data?.data;
    } catch (error: unknown) {
      let message = "Registration failed";
      if (
        error &&
        typeof error === "object" &&
        "response" in error &&
        error.response &&
        typeof error.response === "object" &&
        "data" in error.response &&
        error.response.data &&
        typeof error.response.data === "object" &&
        "message" in error.response.data
      ) {
        message =
          (error.response as { data: { message?: string } }).data.message ||
          message;
      }
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// OTP verification

export const verifyOtp = createAsyncThunk(
  "auth/verifyOtp",
  async ({ otp }: { otp: string }, thunkAPI) => {
    try {
      const email = Cookies.get("userEmail"); // You stored this after registration

      if (!email) {
        throw new Error("Email not found in cookies");
      }

      const res = await axios.post(
        `${baseURL}/auth/verify-otp?email=${email}`,
        { otp }
      );

      // Cookies.set("accessToken", accessToken, { expires: 1 });
      Cookies.remove("userEmail"); // Cleanup after successful verification

      const data = res.data.data;

      if (!data) {
        // No user/accessToken returned, just success message
        return thunkAPI.fulfillWithValue(null); // we explicitly return null to handle in reducer
      }

      const { user, accessToken } = data;

      return { user, accessToken };
    } catch (error: unknown) {
      let message = "OTP verification failed";
      if (
        error &&
        typeof error === "object" &&
        "response" in error &&
        error.response &&
        typeof error.response === "object" &&
        "data" in error.response &&
        error.response.data &&
        typeof error.response.data === "object" &&
        "message" in error.response.data
      ) {
        message =
          (error.response as { data: { message?: string } }).data.message ||
          message;
      }
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Resend code

export const resendCode = createAsyncThunk(
  "auth/resendCode",
  async (email: string, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${baseURL}/auth/resend-otp?email=${email}`
      );
      return response.data.message; // or whatever your API returns
    } catch (error: unknown) {
      let message = "Failed to resend code";
      if (
        error &&
        typeof error === "object" &&
        "response" in error &&
        (error as { response?: { data?: { message?: string } } }).response &&
        typeof (error as { response?: { data?: { message?: string } } })
          .response === "object" &&
        "data" in
          (error as { response?: { data?: { message?: string } } }).response! &&
        (error as { response?: { data?: { message?: string } } }).response!
          .data &&
        typeof (error as { response?: { data?: { message?: string } } })
          .response!.data === "object" &&
        "message" in
          (error as { response?: { data?: { message?: string } } }).response!
            .data!
      ) {
        message =
          (error as { response: { data: { message?: string } } }).response.data
            .message || message;
      }
      return rejectWithValue(message);
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state: AuthState) => {
      Cookies.remove("accessToken");
      state.user = null;
      state.accessToken = null;
      state.loading = false;
      state.error = null;
    },
    setAuth: (
      state,
      action: PayloadAction<{ user: User; accessToken: string }>
    ) => {
      state.user = action.payload.user;
      state.accessToken = action.payload.accessToken;
      state.loading = false;
      state.error = null;
    },
  },
  extraReducers: (builder: ActionReducerMapBuilder<AuthState>) => {
    builder
      .addCase(loginUser.pending, (state: AuthState) => {
        state.loading = true;
        state.accessToken = null;
        state.error = null;
      })
      .addCase(
        loginUser.fulfilled,
        (
          state: AuthState,
          action: PayloadAction<{ user: User; accessToken: string }>
        ) => {
          state.loading = false;
          console.log("Login successful from auth slice: ", action.payload);
          state.user = action.payload.user;
          state.accessToken = action.payload.accessToken;
        }
      )
      .addCase(
        loginUser.rejected,
        (state: AuthState, action: PayloadAction<unknown>) => {
          state.loading = false;
          state.error = action.payload as string;
          state.user = null;
          state.accessToken = null;
        }
      )
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.accessToken = null;
        state.error = null;
      })
      .addCase(
        registerUser.fulfilled,
        (state, action: PayloadAction<{ user: User; accessToken: string }>) => {
          state.loading = false;
          state.user = action.payload.user;
          state.accessToken = action.payload.accessToken;
        }
      )
      .addCase(
        registerUser.rejected,
        (state, action: PayloadAction<unknown>) => {
          state.loading = false;
          state.error = action.payload as string;
          state.user = null;
          state.accessToken = null;
        }
      )
      .addCase(verifyOtp.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        verifyOtp.fulfilled,
        (
          state,
          action: PayloadAction<{ user: User; accessToken: string } | null>
        ) => {
          state.loading = false;
          if (action.payload) {
            state.user = action.payload.user;
            state.accessToken = action.payload.accessToken;
          } else {
            // If no user or token returned, just set user/token to null (or keep as is)
            state.user = null;
            state.accessToken = null;
          }
        }
      )
      .addCase(verifyOtp.rejected, (state, action: PayloadAction<unknown>) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(resendCode.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(resendCode.fulfilled, (state) => {
        state.loading = false;
        // state.message = action.payload;
      })
      .addCase(resendCode.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { logout, setAuth } = authSlice.actions;
export default authSlice.reducer;
