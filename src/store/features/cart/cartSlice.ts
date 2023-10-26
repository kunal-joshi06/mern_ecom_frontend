import { createSlice } from "@reduxjs/toolkit";

// Define a type for the slice state
export interface CartState {
  openState: boolean;
}

// Define the initial state using that type
const initialState: CartState = {
  openState: false,
};

export const cartSlice = createSlice({
  name: "counter",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    setOpen: (state) => {
      state.openState = true;
    },
    setClose: (state) => {
      state.openState = false;
    },
  },
});

export const { setClose, setOpen } = cartSlice.actions;

export default cartSlice.reducer;
