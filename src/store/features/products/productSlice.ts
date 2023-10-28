import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getAllProducts, getProductDetails } from "./productApi";
import { ProductType } from "./productType";

const getAllProductsAsync = createAsyncThunk(
  "products/getAllProducts",
  async (queryParams?: {
    page?: string;
    sortBy?: string;
    filterBy?: string[];
    limit?: string;
  }) => {
    try {
      const response = await getAllProducts(queryParams);
      return response.data;
    } catch (error) {
      console.error("Error Fetching Products", error);
    }
  }
);

const getProductDetailsAsync = createAsyncThunk(
  "products/getSingleProduct",
  async (id: string) => {
    try {
      const response = await getProductDetails(id);
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
  currentProduct: ProductType;
}

const initialState: productState = {
  page: 1,
  totalProducts: 0,
  products: [],
  currentProduct: {
    _id: null,
    name: null,
    price: null,
    rating: null,
    imageUrl: null,
    category: null,
    description: null,
    quantity: null,
    stock: null,
    reviews: [
      {
        user: null,
        name: null,
        rating: null,
        comment: null,
        _id: null,
      },
    ],
  },
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
        state.page = action.payload.page;
        state.totalProducts = action.payload.totalProducts;
        state.products = action.payload.products;
      })
      .addCase(getAllProductsAsync.rejected, (state: productState) => {
        state.loading = "failed";
      })
      .addCase(getProductDetailsAsync.pending, (state) => {
        state.loading = "pending";
      })
      .addCase(getProductDetailsAsync.fulfilled, (state, action) => {
        state.loading = "succeeded";
        state.currentProduct = action.payload.product;
      })
      .addCase(getProductDetailsAsync.rejected, (state: productState) => {
        state.loading = "failed";
      });
  },
});

export { getAllProductsAsync, getProductDetailsAsync };
export default productSlice.reducer;
