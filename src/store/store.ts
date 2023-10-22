import { configureStore } from "@reduxjs/toolkit";
import countReducer from "./features/counter/counterSlice";
import productsReducer from "./features/products/productSlice";
import authReducer from "./features/auth/authSlice"
import userReducer from "./features/user/userSlice"

export const store = configureStore({
  reducer: {
    counter: countReducer,
    products: productsReducer,
    auth: authReducer,
    user: userReducer
  },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
