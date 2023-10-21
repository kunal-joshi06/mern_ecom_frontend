import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getAllProducts} from "./productApi";
import { ProductType } from "./productType";


const getAllProductsAsync = createAsyncThunk("store/getAllProducts", async () => {
  try {
    const response = await getAllProducts();
    return response.data;
  } catch (error) {
    console.error("Error updating user role:", error);
  }
});


export interface productState {
  productsList: ProductType[];
  loading: "idle" | "pending" | "succeeded" | "failed";
}

const initialState: productState = {
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
        state.productsList = action.payload;
      })
      .addCase(getAllProductsAsync.rejected, (state:productState) => {
        state.loading = "failed";
      })
  },
});

export { getAllProductsAsync};
export const { showMoreProducts } = productSlice.actions;
export default productSlice.reducer;