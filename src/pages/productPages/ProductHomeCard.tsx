import { ProductType } from "@/store/features/products/productType"
import { Link } from "react-router-dom"

const ProductHomeCard: React.FC<ProductType> = (product) => {
    return (
        <Link to={`products/${product._id}`} className="mx-auto mt-11 w-80 transform overflow-hidden rounded-lg bg-white dark:bg-slate-800 shadow-md duration-300 hover:scale-105 hover:shadow-lg">
            <img className="h-72 w-full object-cover object-center" src={product.imageUrl!} alt="Product Image" />
            <div className="p-4">
                <h2 className="mb-2 text-lg font-medium dark:text-white text-gray-900">{product.name}</h2>
                <p className="mb-2 text-base dark:text-gray-300 text-gray-700 uppercase">Category: {product.category}</p>
                <div className="flex items-center">
                    <p className="mr-2 text-lg font-semibold text-gray-900 dark:text-white">₹. {product.price}</p>
                </div>
            </div>
        </Link>
    )
}

export default ProductHomeCard

