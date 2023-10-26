// import HomeSlider from '../components/homeSlider';
import { useAppSelector } from "../store/hooks"
import ProductCardVertical from "./productPages/ProductCardVertical";
import HomeSlider from "../components/homeSlider";
import { ProductType } from "../store/features/products/productType";
import { Link } from "react-router-dom";

const Home = () => {
  const products = useAppSelector((store) => store.products.products);
  return (
    <main>
      <div className="h-96">
        <HomeSlider />
      </div>
      <div className="bg-white">
        <div className="container mx-auto max-full px-4 py-12 sm:px-6 sm:py-18">
          <h2 className="text-2xl font-bold tracking-tight text-gray-900">Our top products</h2>
          <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
            {products.map((product: ProductType) => (<ProductCardVertical key={product._id} {...product} />))}
          </div>
        </div>
      </div>
      <div className="flex justify-center items-center w-full pb-10">
        <Link to="/products" className="mt-2 px-4 py-2 bg-slate-100 font-semibold text-slate-700 rounded hover:bg-slate-3 00">
          More Products
        </Link>
      </div>
    </main>
  )
}
//
// toast.error("Login Failed");
export default Home








