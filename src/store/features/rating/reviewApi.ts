import axios from "axios";
const apiUrl = import.meta.env.VITE_FRONTEND_URL;

export const productReview = async (data:any) => {
  try {
    let reqUrl = `${apiUrl}/review`;
    const response = await axios.put(reqUrl, data);
    return response;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
