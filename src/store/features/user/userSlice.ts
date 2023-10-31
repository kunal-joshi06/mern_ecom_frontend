import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { createOrder, registerUser, updatePassword } from "./userApi";
import {
  CreateNewOrder,
  RegisterRequest,
  UpdatePasswordRequest,
} from "./userTypes";
import toast from "react-hot-toast";

const registerUserAsync = createAsyncThunk(
  "user/register",
  async (data: RegisterRequest) => {
    const response = await registerUser(data);
    console.log(response);
    return response.data;
  }
);

const updatePasswordAsync = createAsyncThunk(
  "user/updatePassword",
  async (data: UpdatePasswordRequest) => {
    const response = await updatePassword(data);
    console.log(response);
    return response.data;
  }
);

const createNewOrderAsync = createAsyncThunk(
  "user/createOrder",
  async (data: CreateNewOrder) => {
    const response = await createOrder(data);
    console.log(response);
    return response.data;
  }
);

export interface userState {
  user: {
    name: string | null;
    email: string | null;
    id: string | null;
    isLoggedIn: boolean | null;
    token: string | null;
  };
  loading: "idle" | "pending" | "succeeded" | "failed";
}

const initialState: userState = {
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
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(registerUserAsync.pending, (state) => {
        state.loading = "pending";
      })
      .addCase(registerUserAsync.fulfilled, (state, action) => {
        state.loading = "succeeded";
        state.user.name = action.payload.user.name;
        state.user.email = action.payload.user.email;
        state.user.id = action.payload.user._id;
        state.user.token = action.payload.token;
        state.user.isLoggedIn = true;
        toast.success("Registration Successfull");
      })
      .addCase(registerUserAsync.rejected, (state) => {
        state.loading = "failed";
        toast.error("Registration Failed");
      })
      .addCase(updatePasswordAsync.pending, (state) => {
        state.loading = "pending";
      })
      .addCase(updatePasswordAsync.fulfilled, (state) => {
        state.loading = "succeeded";
        toast.success("Password Changed Successfully");
      })
      .addCase(updatePasswordAsync.rejected, (state) => {
        state.loading = "failed";
        toast.error("Failed to change password");
      })
      .addCase(createNewOrderAsync.pending, (state) => {
        state.loading = "pending";
      })
      .addCase(createNewOrderAsync.fulfilled, (state) => {
        state.loading = "succeeded";
        toast.success("Order Created Successfully");
      })
      .addCase(createNewOrderAsync.rejected, (state) => {
        state.loading = "failed";
      });
  },
});

export { registerUserAsync, updatePasswordAsync, createNewOrderAsync };
export default authSlice.reducer;
