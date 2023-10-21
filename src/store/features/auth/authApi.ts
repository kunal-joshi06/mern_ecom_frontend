import axios from "axios";
import { LoginRequest, LoginResponse } from "./authTypes";
import Cookies from "js-cookie";
const apiUrl = import.meta.env.VITE_FRONTEND_URL;

export const loginUser = async (data: LoginRequest) => {
  try {
    const response = await axios.post<LoginResponse>(`${apiUrl}/login`, data);
    Cookies.set("token", response.data.token);
    return response;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const logoutUser = async () => {
  try {
    const response = await axios.get(`${apiUrl}/logout`);
    return response;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
