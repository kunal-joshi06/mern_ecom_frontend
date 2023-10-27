import { Link } from "react-router-dom";
import { ProductType } from "../../store/features/products/productType";

const ProductCardHorizontal = (product: ProductType) => {
    return (<div>
        <div className="relative flex h-full w-full max-w-[48rem] flex-row rounded-xl bg-white bg-clip-border text-gray-700 shadow-md">
            <div className="relative m-0 w-2/5 shrink-0 overflow-hidden rounded-xl rounded-r-none bg-white bg-clip-border text-gray-700">
                <img
                    src={product?.imageUrl}
                    alt="image"
                    className="h-full w-full object-contain"
                />
            </div>
            <div className="p-6 h-full flex flex-col justify-between">
            <div>
                <h6 className="mb-2 block font-sans text-xl font-semibold leading-snug tracking-normal text-blue-gray-900 antialiased">
                    {product.name}
                </h6>
                <p className="mb-8 break-word line-clamp-3 block font-sans text-base font-normal leading-relaxed text-gray-700 antialiased">
                    {product.description}
                </p>
            </div>
            <div>
               <Link className="inline-block" to={product._id}>
                    <button
                        className="flex select-none items-center gap-2 rounded-lg py-3 px-6 text-center align-middle font-sans text-xs font-bold uppercase text-pink-500 transition-all hover:bg-pink-500/10 active:bg-pink-500/30 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                        type="button"
                    >
                        View
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke-width="2"
                            stroke="currentColor"
                            aria-hidden="true"
                            className="h-4 w-4"
                        >
                            <path
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3"
                            ></path>
                        </svg>
                    </button>
                </Link>
               </div>
            </div>
        </div>
    </div>)
}

export default ProductCardHorizontal;