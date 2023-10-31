import { ProductType } from "../products/productType";

export type RegisterRequest = {
  name: string;
  email: string;
  password: string;
};

export type RegisterResponse = {
  user: {
    _id: string;
    name: string;
    email: string;
  };
  token: string;
};

export type UpdatePasswordRequest = {
  oldPassword: string;
  newPassword: string;
  confirmPassword: string;
};

export type CreateNewOrder = {
  shippingInfo: {
    address: string | null;
    city: string | null;
    state: string | null;
    country: string | null;
    pinCode: number | null;
    phoneNo: number | null;
  };
  orderItems: ProductType[];
  paymentInfo: {
    id: string | null;
    status: string | null;
    totalPrice: number | null;
    paidAt: Date;
  };
  orderStatus: string | null;
};
