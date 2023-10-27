import { createSlice } from "@reduxjs/toolkit";
import { ProductType } from "../products/productType";

// Define a type for the slice state
export interface CartState {
  openState: boolean;
  cartItems: ProductType[];
}

// Define the initial state using that type
const initialState: CartState = {
  openState: false,
  cartItems: [],
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
    },
  },
});

export const { setClose, setOpen, addItemToCart } = cartSlice.actions;

export default cartSlice.reducer;
