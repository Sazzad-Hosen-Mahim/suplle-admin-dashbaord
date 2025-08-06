// src/store/features/user/userSlice.ts

import {
  createAsyncThunk,
  createSlice,
  type PayloadAction,
} from "@reduxjs/toolkit";
import axios from "axios";
import Cookies from "js-cookie";

export type User = {
  id: string;
  userName: string;
  email: string;
  phone?: string;
  role: string;
  status: "Active" | "Inactive";
  image?: string;
  createdAt?: string;
};

type NewUserPayload = {
  name: string;
  phone: string;
  email: string;
  password: string;
  role: string;
};

type UserState = {
  users: User[];
  loading: boolean;
  error: string | null;
};

const initialState: UserState = {
  users: [],
  loading: false,
  error: null,
};

// ✅ Utility: map backend response to User[]
const mapToUserList = (data: any[]): User[] =>
  data
    .filter((item) => !item.isDeleted)
    .map((item) => ({
      id: item._id,
      userName: item.name || "",
      email: item.email || "",
      phone: item.phone || "",
      role: item.role || "",
      status: "Active",
      image: item.image,
      createdAt: item.createdAt,
    }));

// Thunk: Fetch all users
export const fetchUsers = createAsyncThunk(
  "users/fetchUsers",
  async (_, thunkAPI) => {
    try {
      const token = Cookies.get("accessToken");
      const res = await axios.get(
        `${import.meta.env.VITE_BACKEND_BASE_URL}/users/all-users`,
        {
          headers: { Authorization: token },
        }
      );
      return mapToUserList(res.data.data.result);
    } catch (err: unknown) {
      if (axios.isAxiosError(err) && err.response) {
        return thunkAPI.rejectWithValue(
          err.response.data?.message || "Failed to fetch users"
        );
      }
      return thunkAPI.rejectWithValue("Failed to fetch users");
    }
  }
);

// Thunk: Create user
export const createUser = createAsyncThunk(
  "users/createUser",
  async (data: NewUserPayload, thunkAPI) => {
    try {
      const token = Cookies.get("accessToken");

      const payload = {
        ...data,
        providerId: null,
        provider: null,
        image: "https://example.com/avatar.jpg",
        otp: "123456",
        otpExpiresAt: new Date(Date.now() + 10 * 60 * 1000).toISOString(),
        isTourCompleted: false,
        isDeleted: false,
      };

      const res = await axios.post(
        `${import.meta.env.VITE_BACKEND_BASE_URL}/users/owner-create-sub-user`,
        payload,
        { headers: { Authorization: token } }
      );

      const created = res.data.data;
      return {
        id: created._id,
        userName: created.name,
        email: created.email,
        phone: created.phone,
        role: created.role,
        status: "Active",
        image: created.image,
        createdAt: created.createdAt,
      } as User;
    } catch (err: unknown) {
      if (axios.isAxiosError(err)) {
        return thunkAPI.rejectWithValue(
          err.response?.data?.message || "Failed to create user"
        );
      }
      return thunkAPI.rejectWithValue("Failed to create user");
    }
  }
);

// Thunk: Edit user
export const editUser = createAsyncThunk<
  User,
  { id: string; userName: string },
  { rejectValue: string }
>("users/editUser", async ({ id, userName }, thunkAPI) => {
  try {
    const token = Cookies.get("accessToken");

    const formData = new FormData();
    formData.append("data", JSON.stringify({ name: userName }));

    const res = await axios.put(
      `${import.meta.env.VITE_BACKEND_BASE_URL}/users/update-user/${id}`,
      formData,
      {
        headers: { Authorization: token },
      }
    );

    if (res.data.success) {
      const updated = res.data.data;
      return {
        id: updated._id,
        userName: updated.name,
        email: updated.email,
        phone: updated.phone,
        role: updated.role,
        status: "Active",
        image: updated.image,
        createdAt: updated.createdAt,
      };
    } else {
      return thunkAPI.rejectWithValue(
        res.data.message || "Failed to update user"
      );
    }
  } catch (err: unknown) {
    if (axios.isAxiosError(err)) {
      return thunkAPI.rejectWithValue(
        err.response?.data?.message || "Update failed"
      );
    }
    return thunkAPI.rejectWithValue("Update failed");
  }
});

// Thunk: Delete user
export const deleteUser = createAsyncThunk<
  string,
  string,
  { rejectValue: string }
>("users/deleteUser", async (userId, thunkAPI) => {
  try {
    const token = Cookies.get("accessToken");

    const res = await axios.delete(
      `${import.meta.env.VITE_BACKEND_BASE_URL}/users/delete-user/${userId}`,
      { headers: { Authorization: token } }
    );

    if (res.status === 200) {
      return userId;
    } else {
      return thunkAPI.rejectWithValue("Failed to delete user");
    }
  } catch (err: any) {
    return thunkAPI.rejectWithValue(
      err.response?.data?.message || "Delete failed"
    );
  }
});

// Thunk: Fetch owner users
export const fetchOwnerUsers = createAsyncThunk<
  User[],
  void,
  { rejectValue: string }
>("users/fetchOwnerUsers", async (_, thunkAPI) => {
  try {
    const token = Cookies.get("accessToken");
    const res = await axios.get(
      `${import.meta.env.VITE_BACKEND_BASE_URL}/users/all-users-owner`,
      {
        headers: { Authorization: token },
      }
    );
    return mapToUserList(res.data.data.result);
  } catch (err: unknown) {
    if (axios.isAxiosError(err)) {
      return thunkAPI.rejectWithValue(
        err.response?.data?.message || "Failed to fetch users"
      );
    }
    return thunkAPI.rejectWithValue("Failed to fetch users");
  }
});

// Slice
const userSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    resetUserState: () => initialState,
  },
  extraReducers: (builder) => {
    builder
      // fetchUsers
      .addCase(fetchUsers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUsers.fulfilled, (state, action: PayloadAction<User[]>) => {
        state.loading = false;
        state.users = action.payload;
      })
      .addCase(fetchUsers.rejected, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.error = action.payload;
      })

      // createUser
      .addCase(createUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createUser.fulfilled, (state, action: PayloadAction<User>) => {
        state.loading = false;
        state.users.push(action.payload);
      })
      .addCase(createUser.rejected, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.error = action.payload;
      })

      // editUser
      .addCase(editUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(editUser.fulfilled, (state, action: PayloadAction<User>) => {
        state.loading = false;
        const index = state.users.findIndex((u) => u.id === action.payload.id);
        if (index !== -1) {
          state.users[index] = action.payload;
        }
      })
      .addCase(editUser.rejected, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.error = action.payload;
      })

      // deleteUser
      .addCase(deleteUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteUser.fulfilled, (state, action: PayloadAction<string>) => {
        state.loading = false;
        state.users = state.users.filter((user) => user.id !== action.payload);
      })
      .addCase(deleteUser.rejected, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.error = action.payload;
      })

      // fetchOwnerUsers
      .addCase(fetchOwnerUsers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        fetchOwnerUsers.fulfilled,
        (state, action: PayloadAction<User[]>) => {
          state.loading = false;
          state.users = action.payload;
        }
      )
      .addCase(
        fetchOwnerUsers.rejected,
        (state, action: PayloadAction<any>) => {
          state.loading = false;
          state.error = action.payload;
        }
      );
  },
});

export const { resetUserState } = userSlice.actions;
export default userSlice.reducer;
