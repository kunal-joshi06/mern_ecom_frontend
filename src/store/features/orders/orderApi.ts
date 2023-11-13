import axios from "axios";
const apiUrl = import.meta.env.VITE_FRONTEND_URL;


export const getLoggedInUserOrders = async () => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true, // This will send cookies with the request
    };
    let reqUrl = `${apiUrl}/orders/me`;
    const response = await axios.get(reqUrl,config);
    return response;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const getSingleOrder = async (id: string) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
    withCredentials: true, // This will send cookies with the request
  };
  let reqUrl = `${apiUrl}/order/${id}`;

  try {
    const response = await axios.get(reqUrl,config);
    return response;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
