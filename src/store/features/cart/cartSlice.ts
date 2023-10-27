import { createSlice } from "@reduxjs/toolkit";
import { ProductType } from "../products/productType";

// Define a type for the slice state
export interface CartState {
  openState: boolean;
  cartItems: ProductType[];
  cartTotal: number;
}

// Define the initial state using that type
const initialState: CartState = {
  openState: false,
  cartItems: [],
  cartTotal: 0,
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    setOpen: (state) => {
      state.openState = true;
    },
    setClose: (state) => {
      state.openState = false;
    },
    addItemToCart: (state, action) => {
      state.cartItems.push(action.payload);
      state.cartTotal = state.cartItems.reduce((total, item) => {
        if (item.price) {
          return total + item.price;
        }
        return total;
      }, 0);
    },
    removeItemFromCart: (state, action) => {
      const itemIdToRemove = action.payload;
      state.cartItems = state.cartItems.filter(
        (item) => item._id !== itemIdToRemove
      );
      state.cartTotal = state.cartItems.reduce((total, item) => {
        if (item.price) {
          return total + item.price;
        }
        return total;
      }, 0);
    },
  },
});

export const { setClose, setOpen, addItemToCart, removeItemFromCart } =
  cartSlice.actions;

export default cartSlice.reducer;
