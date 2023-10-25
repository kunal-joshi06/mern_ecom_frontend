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
  _id: string;
  name: string;
  price: number;
  rating: number;
  imageUrl: string;
  category: string;
  description: string;
  stock: number;
  reviews: Array<{
    user: string;
    name: string;
    rating: number;
    comment: string;
    _id: string;
  }>;
};
