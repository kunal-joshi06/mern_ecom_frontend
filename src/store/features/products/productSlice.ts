import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getAllProducts} from "./productApi";
import { ProductResponse } from "./productType";


const getAllProductsAsync = createAsyncThunk("store/getAllProducts", async () => {
  try {
    const response = await getAllProducts();
    return response.data;
  } catch (error) {
    console.error("Error updating user role:", error);
  }
});


export interface productState {
  page: number;
  totalProducts:number;
  count:number;
  productsList: ProductResponse[];
  loading: "idle" | "pending" | "succeeded" | "failed";
}

const initialState: productState = {
  page: 1,
  totalProducts: 0,
  count: 0,
  productsList: [],
  loading: "idle",
};

export const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    showMoreProducts : (state)=>{
      state.productsList = [];
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllProductsAsync.pending, (state:productState) => {
        state.loading = "pending";
      })
      .addCase(getAllProductsAsync.fulfilled, (state:productState, action:any) => {
        state.loading = "succeeded";
        console.log(action.payload)
        state.page = action.payload.page
        state.totalProducts = action.payload.totalProducts
        state.productsList = action.payload.products;
        state.count = state.productsList?.length;
      })
      .addCase(getAllProductsAsync.rejected, (state:productState) => {
        state.loading = "failed";
      })
  },
});

export { getAllProductsAsync};
export const { showMoreProducts } = productSlice.actions;
export default productSlice.reducer;