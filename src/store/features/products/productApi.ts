import axios from "axios";
const apiUrl = import.meta.env.VITE_FRONTEND_URL;

export const getAllProducts = async (queryParams ?: Record<string, string>) => {
  try {
    let reqUrl = `${apiUrl}/products`;
    if(queryParams){
      reqUrl += `?${new URLSearchParams(queryParams).toString()}`;
    }
    const response = await axios.get(reqUrl);
    return response;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
