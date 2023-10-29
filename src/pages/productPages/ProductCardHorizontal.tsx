import { Link } from "react-router-dom";
import { ProductType } from "../../store/features/products/productType";
import StarRating from "../../components/ProductDetails/StarRating";

const ProductCardHorizontal = (product: ProductType) => {
    return (
        <div className="w-full h-full p-4 flex flex-row justify-between bg-white border-2 border-gray-100 rounded-lg shadow-md">
            <div className="min:h-full min:w-full flex justify-center items-center">
                {product.imageUrl && <img className="object-contain" src={product?.imageUrl} alt="product image" />}
            </div>
            <div className="pl-5 flex flex-col min:h-full min:w-full">
                <div className="h-1/2 min:w-full overflow-hidden">
                    <h5 className="text-xl font-semibold tracking-tight text-gray-900 ">{product?.name}</h5>
                </div>
                <div className="h-1/2">
                    <div className="flex items-center mt-2.5 mb-5">
                     {product.rating ? <StarRating rating={product?.rating} /> : <StarRating rating={0} />} 
                     {product.rating ? <span className="bg-blue-100 text-blue-800 text-xs font-semibold mr-2 px-2.5 py-0.5 rounded dark:bg-blue-200 dark:text-blue-800 ml-3">{Math.ceil(product?.rating)}</span>:
                     <span className="bg-blue-100 text-blue-800 text-xs font-semibold mr-2 px-2.5 py-0.5 rounded dark:bg-blue-200 dark:text-blue-800 ml-3">0</span>}
                    </div>
                    <div className="flex items-center justify-between">
                        <span className="text-lg font-bold text-gray-500">₹{product?.price}</span>
                        {product._id && <Link to={product._id} className="text-white bg-blue-500 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center">View</Link>}
                    </div>
                </div>

            </div>
        </div>
    )
}

export default ProductCardHorizontal;