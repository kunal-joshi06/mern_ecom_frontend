import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { productReview } from "./reviewApi";

const productReviewAsync = createAsyncThunk(
  "auth/userLogin",
  async (data) => {
    const response = await productReview(data);
    console.log(response);
    return response.data;
  }
);

export interface reviewState {
  rating:number;
  comment:string;
  viewOpen:boolean;
  loading: "idle" | "pending" | "succeeded" | "failed";
}

const initialState: reviewState = {
  rating:1,
  comment:"",
  viewOpen:false,
  loading: "idle",
};

export const reviewSlice = createSlice({
  name: "review",
  initialState,
  reducers: {
   
    setViewOpen: (state) => {
      state.viewOpen = true;
    },
    setViewClose: (state) => {
      state.viewOpen = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(productReviewAsync.pending, (state) => {
        state.loading = "pending";
      })
      .addCase(productReviewAsync.fulfilled, (state, action) => {
        state.loading = "succeeded";
        console.log(action.payload)
      })
      .addCase(productReviewAsync.rejected, (state) => {
        state.loading = "failed";
      })
  },
});

export const { setViewOpen, setViewClose} = reviewSlice.actions;
export { productReviewAsync };
export default reviewSlice.reducer;
