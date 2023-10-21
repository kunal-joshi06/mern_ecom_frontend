import ProductCard from "./productCard";
import {useAppDispatch,useAppSelector} from "../../store/hooks"
// import{showMoreProducts}  from '../../store/features/products/productSlice'
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";

function allProducts() {
    // const dispatch = useAppDispatch();
    const {productsList} = useAppSelector((store)=> store.products);
  return (
    <>
        <Navbar/>
        <div className="bg-white">
            <div className="container mx-auto max-full px-4 py-12 sm:px-6 sm:py-18">
            <h2 className="text-2xl font-bold tracking-tight text-gray-900">All products</h2>
            <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
            {productsList.map((product) => (<ProductCard {...product}/>))}
        </div>
        </div>
    </div>
    <div className="flex justify-center items-center w-full pb-10">
          {/* <button onClick={()=>dispatch(showMoreProducts())} className="mt-2 px-4 py-2 bg-slate-100 font-semibold text-slate-700 rounded hover:bg-slate-3 00">
            Show More
          </button> */}
        </div>
    <Footer/>
    </>
  )
}

export default allProducts