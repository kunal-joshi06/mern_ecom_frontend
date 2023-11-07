import { Card, CardContent, CardDescription, CardTitle } from '@/components/ui/card';
import { Separator } from "@/components/ui/separator"
import { ProductType } from "@/store/features/products/productType"
import { Link } from "react-router-dom"
import { currency } from '../../components/currency';

const ProductHomeCard: React.FC<ProductType> = (product:ProductType) => {
    return (
        <Link to={`products/${product._id}`}>
            <Card className="duration-300 hover:scale-105 hover:shadow-lg">
                <div className="overflow-hidden rounded-md aspect-h-1 aspect-w-1 w-full bg-white lg:aspect-none group-hover:opacity-75 lg:h-80 p-4">
                    <img className="h-72 w-full object-contain object-center" src={product.imageUrl!} alt="Product Image" />
                </div>
                <Separator />
                    <CardContent className="p-4 text-center">
                        <CardTitle className="text-lg mb-1 uppercase font-medium dark:text-white text-gray-900">{product.name}</CardTitle>
                        <CardDescription className="mb-2">Category: {product.category}</CardDescription>
                            <p className="mr-2 text-md font-bold text-gray-900 dark:text-white">{currency(product.price)}</p>
                    </CardContent>
            </Card>
        </Link>
    )
}

export default ProductHomeCard
