import axios from "axios";
import { ProductType } from "../products/productType";

const apiUrl = import.meta.env.VITE_FRONTEND_URL;

const stripeApiKey = import.meta.env.VITE_STRIPE_KEY;

export const createCheckout = async (data: ProductType[]) => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${stripeApiKey}`,
      },
      withCredentials: true, // This will send cookies with the request
    };
    const response = await axios.post(
      `${apiUrl}/payment/checkout`,
      data,
      config
    );
    return response;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
