import { createSlice } from "@reduxjs/toolkit";
import { ProductType } from "../products/productType";
import { toast } from "react-hot-toast";

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
      const newItem = action.payload;
      const existingItem = state.cartItems.find(
        (item) => item._id === newItem._id
      );

      if (existingItem) {
        existingItem.quantity = (existingItem.quantity || 0) + 1;
      } else {
        const newItemWithQuantity = { ...newItem, quantity: 1 };
        state.cartItems.push(newItemWithQuantity);
      }

      state.cartTotal = state.cartItems.reduce((total, item) => {
        if (item.price && item.quantity) {
          return total + item.price * item.quantity;
        }
        return total;
      }, 0);
      toast.success("Product Added Successfully");
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

    increaseQuantity: (state, action) => {
      const itemIdToIncrease = action.payload;
      const itemToIncrease = state.cartItems.find(
        (item) => item._id === itemIdToIncrease
      );

      if (itemToIncrease) {
        if (itemToIncrease.quantity === undefined) {
          itemToIncrease.quantity = 1;
        } else {
          itemToIncrease.quantity = Math.min(
            (itemToIncrease.quantity || 0) + 1,
            itemToIncrease.stock || 0
          );
        }

        state.cartTotal = state.cartItems.reduce((total, item) => {
          if (item.price && item.quantity) {
            return total + item.price * item.quantity;
          }
          return total;
        }, 0);
      }
    },

    decreaseQuantity: (state, action) => {
      const itemIdToDecrease = action.payload;
      const itemToDecrease = state.cartItems.find(
        (item) => item._id === itemIdToDecrease
      );

      if (
        itemToDecrease &&
        itemToDecrease.quantity &&
        itemToDecrease.quantity > 1
      ) {
        itemToDecrease.quantity -= 1;

        state.cartTotal = state.cartItems.reduce((total, item) => {
          if (item.price && item.quantity) {
            return total + item.price * item.quantity;
          }
          return total;
        }, 0);
      }
    },
  },
});

export const {
  setClose,
  setOpen,
  addItemToCart,
  removeItemFromCart,
  decreaseQuantity,
  increaseQuantity,
} = cartSlice.actions;

export default cartSlice.reducer;
