import axios from "axios";
import { RegisterRequest,RegisterResponse  } from "./userTypes";
import Cookies from "js-cookie";
const apiUrl = import.meta.env.VITE_FRONTEND_URL;

export const registerUser = async (data: RegisterRequest) => {
  try {
    const response = await axios.post<RegisterResponse>(`${apiUrl}/register`, data);
    Cookies.set("token", response.data.token);
    return response;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
