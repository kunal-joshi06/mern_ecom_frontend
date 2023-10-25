import { configureStore, combineReducers, Reducer } from "@reduxjs/toolkit";
import authReducer, { authState } from "./features/auth/authSlice";
import storage from "redux-persist/lib/storage";
import { persistReducer } from "redux-persist";
import productsReducer, {
  productState,
} from "./features/products/productSlice";

export interface RootState {
  auth: authState;
  products: productState;
}

const persistConfig = {
  key: "root",
  version: 1,
  storage,
};

const rootReducer: Reducer<RootState> = combineReducers({
  auth: authReducer,
  products: productsReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
});

export type AppDispatch = typeof store.dispatch;
