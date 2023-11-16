import axios from "axios";
const apiUrl = import.meta.env.VITE_FRONTEND_URL;

export const getLoggedInUserOrders = async (token: string) => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };
    const reqUrl = `${apiUrl}/orders/me`;
    const response = await axios.get(reqUrl, config);
    return response;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const getSingleOrder = async (id: string, token: string) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  };
  const reqUrl = `${apiUrl}/order/${id}`;
  try {
    const response = await axios.get(reqUrl, config);
    return response;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
