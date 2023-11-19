import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getLoggedInUserOrders, getSingleOrder } from "./orderApi";
import { OrderType } from "./orderType";

const getLoggedInUserOrdersAsync = createAsyncThunk(
  "orders/getLoggedInUserOrders",
  async (token: string) => {
    try {
      const response = await getLoggedInUserOrders(token);
      return response.data;
    } catch (error) {
      console.error("Error Fetching Products", error);
    }
  }
);

const getSingleOrderAsync = createAsyncThunk(
  "orders/getSingleOrder",
  async ({ id, token }: { id: string; token: string }) => {
    try {
      const response = await getSingleOrder(id, token);
      return response.data;
    } catch (error) {
      console.error("Error Fetching order details", error);
    }
  }
);

export interface orderState {
  orders: OrderType[];
  currentOrder: {
    user: {
      name: string | null;
      email: string | null;
    };
    orderItems: [{ name: string | null; quantity: number | null }];
    paymentInfo: {
      status: string | null;
      paidAt: string | null;
      totalPrice: number | null;
    };
    shippingInfo: {
      address: string | null;
      city: string | null;
      country: string | null;
      pinCode: string | null;
      phoneNo: string | null;
    };
  };
  loading: "idle" | "pending" | "succeeded" | "failed";
}

const initialState: orderState = {
  orders: [],
  currentOrder: {
    user: {
      name: null,
      email: null,
    },
    orderItems: [{ name: null, quantity: null }],
    paymentInfo: {
      status: null,
      paidAt: null,
      totalPrice: null,
    },
    shippingInfo: {
      address: null,
      city: null,
      country: null,
      pinCode: null,
      phoneNo: null,
    },
  },
  loading: "idle",
};

export const orderSlice = createSlice({
  name: "orders",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getLoggedInUserOrdersAsync.pending, (state) => {
        state.loading = "pending";
      })
      .addCase(getLoggedInUserOrdersAsync.fulfilled, (state, action) => {
        state.loading = "succeeded";
        state.orders = action.payload.order;
      })
      .addCase(getLoggedInUserOrdersAsync.rejected, (state) => {
        state.loading = "failed";
      })
      .addCase(getSingleOrderAsync.pending, (state) => {
        state.loading = "pending";
      })
      .addCase(getSingleOrderAsync.fulfilled, (state, action) => {
        state.loading = "succeeded";
        state.currentOrder = action.payload.order;
      })
      .addCase(getSingleOrderAsync.rejected, (state) => {
        state.loading = "failed";
      });
  },
});

// export const { setPage, setCategory, removeCategory,setFilterClose,setFilterOpen,setPriceRange } = productSlice.actions;
export { getLoggedInUserOrdersAsync, getSingleOrderAsync };
export default orderSlice.reducer;
