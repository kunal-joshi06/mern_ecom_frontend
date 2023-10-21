import axios from "axios";
const apiUrl = 'https://fakestoreapi.com/products?limit=';


export const getAllProducts = async () => {
  try {
    const response = await axios.get(`${apiUrl}`);
    return response;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

