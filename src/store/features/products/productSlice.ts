import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getAllProducts } from "./productApi";
import { ProductType } from "./productType";

const getAllProductsAsync = createAsyncThunk(
  "store/getAllProducts",
  async () => {
    try {
      const response = await getAllProducts();
      return response.data;
    } catch (error) {
      console.error("Error Fetching Products", error);
    }
  }
);

export interface productState {
  page: number;
  totalProducts: number;
  products: ProductType[];
  loading: "idle" | "pending" | "succeeded" | "failed";
}

const initialState: productState = {
  page: 1,
  totalProducts: 0,
  products: [],
  loading: "idle",
};

export const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllProductsAsync.pending, (state) => {
        state.loading = "pending";
      })
      .addCase(getAllProductsAsync.fulfilled, (state, action) => {
        state.loading = "succeeded";
        console.log(action.payload)
        state.page = action.payload.page
        state.totalProducts = action.payload.totalProducts
        state.productsList = action.payload.products;
        state.count = state.productsList?.length;
      })
      .addCase(getAllProductsAsync.rejected, (state: productState) => {
        state.loading = "failed";
      });
  },
});

export { getAllProductsAsync };
export default productSlice.reducer;
