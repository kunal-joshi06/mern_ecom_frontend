import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { loginUser, logoutUser } from "./authApi";
import { LoginRequest } from "./authTypes";
import toast from "react-hot-toast";

const loginUserAsync = createAsyncThunk(
  "auth/userLogin",
  async (data: LoginRequest) => {
    const response = await loginUser(data);
    console.log(response);
    return response.data;
  }
);

const logoutUserAsync = createAsyncThunk("auth/UserLogout", async () => {
  const response = await logoutUser();
  console.log(response);
  return response.data;
});

export interface authState {
  user: {
    name: string | null;
    email: string | null;
    id: string | null;
    isLoggedIn: boolean | null;
    token: string | null;
  };
  loading: "idle" | "pending" | "succeeded" | "failed";
}

const initialState: authState = {
  user: {
    name: null,
    email: null,
    id: null,
    isLoggedIn: null,
    token: null,
  },
  loading: "idle",
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loginUserAsync.pending, (state) => {
        state.loading = "pending";
      })
      .addCase(loginUserAsync.fulfilled, (state, action) => {
        state.loading = "succeeded";
        state.user.name = action.payload.user.name;
        state.user.email = action.payload.user.email;
        state.user.id = action.payload.user._id;
        state.user.token = action.payload.token;
        state.user.isLoggedIn = true;
        toast.success("Login Successfull");
      })
      .addCase(loginUserAsync.rejected, (state) => {
        state.loading = "failed";
        toast.error("Login Failed");
      })
      .addCase(logoutUserAsync.pending, (state) => {
        state.loading = "pending";
      })
      .addCase(logoutUserAsync.fulfilled, (state) => {
        state.loading = "succeeded";
        state.user.name = null;
        state.user.email = null;
        state.user.id = null;
        state.user.token = null;
        state.user.isLoggedIn = false;
        toast.success("Logout Successfull");
      })
      .addCase(logoutUserAsync.rejected, (state) => {
        state.loading = "failed";
        toast.error("Logout Failed");
      });
  },
});

export { loginUserAsync, logoutUserAsync };

export default authSlice.reducer;
