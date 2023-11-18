// import HomeSlider from '../components/homeSlider';
import { useAppDispatch, useAppSelector } from "../store/hooks"
import { ProductType } from "../store/features/products/productType";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import { getAllProductsAsync } from "../store/features/products/productSlice";
import { Button } from "@/components/ui/button";
import ProductHomeCard from "./productPages/ProductHomeCard";
import EmblaCarousel from "@/components/Carousel/EmblaCarousel";
import '../components/Carousel/embla.css'
import SkeletonVCard from "@/components/Loaders/SkeletonVCard";
import Oops from "@/components/Loaders/Oops";

const Home = () => {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(getAllProductsAsync({ page: "1", limit: "8" }))
  }, [dispatch])

  const {loading, products} = useAppSelector((store) => store.products);
  return (
    <main className="w-100">
      <section className="relative">
        <EmblaCarousel />
      </section>
      <div className="bg-white">
        <div className="container mx-auto max-full px-4 py-12 sm:px-6 sm:py-18">
          <h2 className="text-2xl font-bold tracking-tight text-gray-900">Our top products</h2>
          <div className="container mx-auto p-4 h-full flex items-center justify-center">
            {
              loading == 'succeeded' ? 
            <div className="h-full w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
              {products.map((product: ProductType) => (<ProductHomeCard key={product._id} {...product} />))}
            </div>
            :  loading == 'failed' ? <Oops/> 
            :
            <div className="h-full w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
            {  Array.from(Array(4)).map((index)=><SkeletonVCard key={index} />)}
            </div>
            }
          </div>
        </div>
      </div>
      <div className="flex justify-center items-center w-full pb-10">
        <Button className="sono">
          <Link to="/products">
            More Products
          </Link>
        </Button>
      </div>
      <div className="flex justify-center items-center w-full pb-10">
      </div>
    </main>
  )
}

export default Home








