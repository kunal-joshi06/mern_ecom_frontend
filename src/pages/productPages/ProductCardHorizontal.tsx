import { Link } from "react-router-dom";
import { ProductType } from "../../store/features/products/productType";
import { Button } from "@/components/ui/button";
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { currency } from "@/components/currency";

const ProductCardHorizontal = (product: ProductType) => {
    return (
        <Card className="w-full h-full p-4 flex flex-row justify-between">
            <div className="w-40 h-full flex justify-center items-center">
                {product.imageUrl && (
                    <img className="object-cover w-full h-full" src={product?.imageUrl} alt="product image" />
                )}
            </div>
            <div className="pl-5 flex flex-col justify-between w-60">
                <CardHeader className="p-2 pb-4">
                    <CardTitle className="text-xl">{product?.name}</CardTitle>
                    <CardDescription className="line-clamp-3">
                        {product.description}
                    </CardDescription>
                </CardHeader>
                <CardFooter className="justify-between p-2 pt-0">
                        <span className="text-lg font-normal overflow-hidden mr-2">{currency(product?.price)}</span>
                        {product._id && (
                            <Button variant={"secondary"}><Link to={product._id}>Details</Link>
                            </Button>
                        )}
                </CardFooter>
            </div>
        </Card>
    );
};

export default ProductCardHorizontal;
