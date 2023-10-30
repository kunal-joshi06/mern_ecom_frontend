import { useEffect } from "react"
import { useParams } from "react-router-dom"
import { useAppDispatch, useAppSelector } from "../../store/hooks"
import { getProductDetailsAsync } from "../../store/features/products/productSlice"
import StarRating from "../../components/ProductDetails/StarRating"
import BreadCrumb from "../../components/ProductDetails/BreadCrumb"
import { ProductType } from "../../store/features/products/productType"
import { addItemToCart } from "../../store/features/cart/cartSlice"
import toast from "react-hot-toast"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Button } from "@/components/ui/button"
import { currency } from '../../components/currency';


const ProductDetail = () => {

    const { pId } = useParams()
    const dispatch = useAppDispatch()

    const isLoggedIn = useAppSelector(state => state.auth.user.isLoggedIn)
    const currentProduct = useAppSelector(state => state.products.currentProduct)

    const handleAddToCart = (product: ProductType) => {
        isLoggedIn ? dispatch(addItemToCart(product)) : toast.error("Please Login To Add Item")
    }

    useEffect(() => {
        if (pId) {
            dispatch(getProductDetailsAsync(pId))
        }
    }, [dispatch, pId])

    return (
        <section className="text-gray-700 body-font overflow-hidden bg-white">
            <div className="container px-5 py-24 mx-auto">
                <BreadCrumb currentPage={currentProduct?.name} />
                <div className="lg:w-4/5 mx-auto flex flex-wrap">
                    {currentProduct?.imageUrl ? <img alt="ecommerce" className="lg:w-1/2 w-full object-cover object-center rounded border border-gray-200" src={currentProduct.imageUrl} /> : "No Product Image found"}
                    <div className="lg:w-1/2 w-full lg:pl-10 lg:py-6 mt-6 lg:mt-0">
                        <h2 className="text-sm title-font text-gray-500 tracking-widest">Product Id: #{currentProduct._id}</h2>
                        <h1 className="text-gray-900 text-3xl title-font font-medium mb-1">{currentProduct.name}</h1>
                        <div className="flex mb-4">
                            <span className="flex items-center">
                                {currentProduct?.rating ? <StarRating rating={currentProduct?.rating} />:
                                                          <StarRating rating={0} />}
                                <span className="text-gray-600 ml-3">{currentProduct?.reviews.length} Reviews</span>
                            </span>
                            <span className="flex ml-3 pl-3 py-2 border-l-2 border-gray-200">
                                <a className="text-gray-500">
                                    <svg fill="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-5 h-5" viewBox="0 0 24 24">
                                        <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"></path>
                                    </svg>
                                </a>
                                <a className="ml-2 text-gray-500">
                                    <svg fill="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-5 h-5" viewBox="0 0 24 24">
                                        <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z"></path>
                                    </svg>
                                </a>
                                <a className="ml-2 text-gray-500">
                                    <svg fill="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-5 h-5" viewBox="0 0 24 24">
                                        <path d="M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z"></path>
                                    </svg>
                                </a>
                            </span>
                        </div>
                        <p className="flex items-center">
                            <span className="text-gray-600 ">Stock : <span className="font-bold">{currentProduct.stock}</span></span>
                        </p>
                        <p className="leading-relaxed">{currentProduct.description}</p>

                        <div className="flex mt-5">
                            <span className="title-font font-normal text-2xl align-self-end text-gray-900">Price:&nbsp;{currency(currentProduct.price)}</span>
                            <Button className="flex ml-auto  py-2 px-6 "
                                onClick={() => handleAddToCart(currentProduct)}
                            >Add to Cart</Button>
                        </div>

                        {currentProduct.reviews && <ScrollArea className="rounded-lg border border-solid border-gray-200 p-6 text-xs mt-8 mx-4 sm:mx-0 bg-white ">
                            <div>
                                <div className="flex flex-col px-5">
                                    {currentProduct.reviews.length > 0 ? <h1 className="text-gray-800 text-xl font-medium mb-2">Customer Rating</h1> :
                                    <h1 className="text-gray-800 text-xl text-center font-medium pt-6">No customer review</h1>}
                                </div>
                                <div className="max-h-60 overflow-y-scroll no-scrollbar px-6 pb-6">
                                    {currentProduct.reviews.map((review, index: number) => (
                                        <div key={index} className="border-gray-200 review-shadow p-4 mt-5">
                                            <div>
                                                <div className="flex justify-between items-center">
                                                    {review.rating && <StarRating rating={review?.rating} />}
                                                </div>
                                            </div>
                                            <div>
                                                <div className="my-4 text-sm flex justify-between items-center">
                                                    <span>{review?.comment}</span>
                                                </div>
                                            </div>
                                            <div>
                                                <div className="flex justify-between items-center">
                                                    <span>by: {review?.name}</span>
                                                </div>

                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </ScrollArea>}

                    </div>
                </div>
            </div>
        </section>
    )
}

export default ProductDetail

