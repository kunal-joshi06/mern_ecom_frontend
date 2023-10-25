import { Link } from "react-router-dom"
import { ProductType } from "../../store/features/products/productType"

const ProductCardVertical = (product: ProductType) => {
  return (
    <div className="group relative p-6 rounded shadow-lg">
      <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-white lg:aspect-none group-hover:opacity-75 lg:h-80">
        {product.imageUrl && product.name ? <img
          src={product.imageUrl}
          alt={product.name}
          className="h-full w-full object-contain object-center lg:h-full lg:w-full"
        /> : ""}
      </div>
      <div className="mt-4 flex justify-between">
        <div>
          <h3 className="text-sm text-gray-700">
            <Link to={`products/${product._id}`}>
              <span aria-hidden="true" className="absolute inset-0" />
              {product.name}
            </Link>
          </h3>
        </div>
        <p className="text-sm font-medium text-gray-900">{'$' + product.price}</p>
      </div>
    </div>
  )
}

export default ProductCardVertical