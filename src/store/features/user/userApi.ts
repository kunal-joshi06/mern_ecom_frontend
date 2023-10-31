import axios from "axios";
import {
  CreateNewOrder,
  RegisterRequest,
  RegisterResponse,
  UpdatePasswordRequest,
} from "./userTypes";
import Cookies from "js-cookie";
const apiUrl = import.meta.env.VITE_FRONTEND_URL;

export const registerUser = async (data: RegisterRequest) => {
  try {
    const response = await axios.post<RegisterResponse>(
      `${apiUrl}/register`,
      data
    );
    Cookies.set("token", response.data.token);
    return response;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const updatePassword = async (data: UpdatePasswordRequest) => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    };
    const response = await axios.put(`${apiUrl}/password/update`, data, config);
    return response;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const createOrder = async (data: CreateNewOrder) => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    };
    const response = await axios.post(`${apiUrl}/order/new`, data, config);
    return response;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
