
export type ProductResponse = {
  id: string;
  name: string;
  description: string;
  price: string;
  category: string;
  imageUrl: string;
  rating: number;
  stock: number;
  reviews: Array<object>;
};

export type ProductType = {
  _id: string | null;
  name: string | null;
  price: number | null;
  rating: number | null;
  imageUrl: string | null;
  category: string | null;
  description: string | null;
  stock: number | null;
  quantity: number | null;
  reviews: Array<{
    user: string | null;
    name: string | null;
    rating: number | null;
    comment: string | null;
    _id: string | null;
  }>;
};
