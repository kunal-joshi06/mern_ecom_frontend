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
import {
    FacebookIcon,
    FacebookShareButton,
    RedditIcon,
    RedditShareButton,
    TelegramIcon,
    TelegramShareButton,
} from "react-share";
import Loader from "@/components/Loaders/Loader"


const ProductDetail = () => {

    const { pId } = useParams()
    const dispatch = useAppDispatch()

    const isLoggedIn = useAppSelector(state => state.auth.user.isLoggedIn)
    const currentProduct: ProductType = useAppSelector(state => state.products.currentProduct)
    const isLoading = useAppSelector(state => state.products.loading);

    const handleAddToCart = (product: ProductType) => {
        isLoggedIn ? dispatch(addItemToCart(product)) : toast.error("Please Login To Add Item")
    }

    const shareUrl = window.location.href;
    useEffect(() => {
        if (pId) {
            dispatch(getProductDetailsAsync(pId))
        }
    }, [dispatch, pId])

    return (
        <section className="text-gray-700 body-font overflow-hidden bg-white h-screen">
            {isLoading !== "succeeded" ? <Loader /> : <div className="container px-5 py-24 mx-auto">
                <BreadCrumb currentPage={currentProduct?.name} />
                <div className="lg:w-4/5 mx-auto flex flex-wrap">
                    {currentProduct?.imageUrl ? <img alt="ecommerce" className="lg:w-1/2 w-full object-cover object-center rounded border border-gray-200" src={currentProduct.imageUrl} /> : "No Product Image found"}
                    <div className="lg:w-1/2 w-full lg:pl-10 lg:py-6 mt-6 lg:mt-0">
                        <h2 className="text-sm title-font text-gray-500 tracking-widest">Product Id: #{currentProduct._id}</h2>
                        <h1 className="text-gray-900 text-3xl title-font font-medium mb-1">{currentProduct.name}</h1>
                        <div className="flex mb-4">
                            <span className="flex items-center">
                                {currentProduct?.rating ? <StarRating rating={currentProduct?.rating} /> :
                                    <StarRating rating={0} />}
                                <span className="text-gray-600 ml-3">{currentProduct?.reviews.length} Reviews</span>
                            </span>
                            <span className="flex ml-3 pl-3 py-2 border-l-2 space-x-2 border-gray-200">
                                <FacebookShareButton quote="Checkout this awesome product !" url={shareUrl} >
                                    <FacebookIcon size={24} round={true} />
                                </FacebookShareButton>

                                <RedditShareButton title="Checkout this awesome product !" url={shareUrl} >
                                    <RedditIcon size={24} round={true} />
                                </RedditShareButton>

                                <TelegramShareButton title="Checkout this awesome product !" url={shareUrl} >
                                    <TelegramIcon size={24} round={true} />
                                </TelegramShareButton>
                            </span>
                        </div>
                        <p className="flex items-center">
                            <span className="text-gray-900 ">Stock : <span className="font-bold">{currentProduct.stock}</span></span>
                        </p>
                        <p className="leading-relaxed text-gray-400">{currentProduct.description}</p>

                        <div className="flex mt-5">
                            <span className="title-font font-normal text-2xl align-self-end text-gray-900">Price:&nbsp;{currency(currentProduct?.price)}</span>
                            <Button className="flex ml-auto cta py-2 px-6 "
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
            </div>}

        </section>
    )
}

export default ProductDetail

