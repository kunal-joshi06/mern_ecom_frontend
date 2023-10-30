import { Link } from "react-router-dom"
import { ProductType } from "../../store/features/products/productType"
import { Card, CardContent} from '@/components/ui/card';
import { Separator } from "@/components/ui/separator";
import { currency } from "@/components/currency";

const ProductCardVertical = (product: ProductType) => {

  return (
    <Card>
      <div className="overflow-hidden rounded-md aspect-h-1 aspect-w-1 w-full bg-white lg:aspect-none group-hover:opacity-75 lg:h-80 p-4">
        {product.imageUrl && product.name ? 
        <Link to={`products/${product._id}`}>
          <img
            src={product.imageUrl}
            alt={product.name}
            className="h-full w-full object-contain object-center lg:h-full lg:w-full"
          /> 
        </Link>: ""}
      </div>
      <Separator />
      <CardContent className="p-4">
        <div className="w-full text-center justify-between">
            <h3 className="text-sm font-medium text-gray-700">
              <Link to={`products/${product._id}`}>
                <span aria-hidden="true" className="absolute inset-0" />
                {product.name}
              </Link>
            </h3>
          <p className="text-sm text-gray-900">{currency(product.price)}</p>
        </div>
      </CardContent>
    </Card>
  )
}

export default ProductCardVertical