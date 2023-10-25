 const ProductCardVertical = (product:any)=> {
  return (
    <div className="group relative p-6 rounded shadow-lg">
    <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-white lg:aspect-none group-hover:opacity-75 lg:h-80">
      <img
        src={product.imageUrl}
        alt={product.name}
        className="h-full w-full object-contain object-center lg:h-full lg:w-full"
      />
    </div>
    <div className="mt-4 flex justify-between">
      <div>
        <h3 className="text-sm text-gray-700">
          <a href={product.name}>
            <span aria-hidden="true" className="absolute inset-0" />
            {product.name}
          </a>
        </h3>
      </div>
      <p className="text-sm font-medium text-gray-900">{'$' + product.price}</p>
    </div>
  </div>
  )
}

export default ProductCardVertical