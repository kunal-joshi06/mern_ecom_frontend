import axios from "axios";
const apiUrl = import.meta.env.VITE_FRONTEND_URL;

export const getAllProducts = async () => {
  try {
    const response = await axios.get(`${apiUrl}/products`);
    return response;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
