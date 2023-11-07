import axios from "axios";
const apiUrl = import.meta.env.VITE_FRONTEND_URL;

export const getAllProducts = async (queryParams?: {
  page?: string;
  sortBy?: string;
  filterBy?: string[];
  limit?: string;
  minPrice?: number;
  maxPrice?: number;
}) => {
  try {
    let reqUrl = `${apiUrl}/products`;
    if (queryParams) {
      const { page, sortBy, filterBy, limit, minPrice , maxPrice } = queryParams;

      const searchParams = new URLSearchParams();

      if (page) {
        searchParams.append("page", page);
      }

      if (sortBy) {
        searchParams.append("sortBy", sortBy);
      }
      if (minPrice) {
        searchParams.append("minPrice", minPrice.toString());
      }
      if (maxPrice) {
        searchParams.append("maxPrice", maxPrice.toString());
      }

      if (filterBy) {
        filterBy.forEach((filter) => {
          searchParams.append("filterBy", filter);
        });
      }

      if (limit) {
        searchParams.append("limit", limit);
      }

      reqUrl += `?${searchParams.toString()}`;
    }

    const response = await axios.get(reqUrl);
    return response;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const getProductDetails = async (id: string) => {
  try {
    const response = await axios.get(`${apiUrl}/product/${id}`);
    return response;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
