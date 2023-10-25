export type ProductResponse = {
    id: string;
    name: string;
    description: string;
    price: string;
    category: string;
    imageUrl:string;
    rating: number;
    stock: number;
    reviews: Array<object>;
};

