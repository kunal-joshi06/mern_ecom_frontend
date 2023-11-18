import ProductCardHorizontal from "./ProductCardHorizontal";
import { useAppDispatch, useAppSelector } from "../../store/hooks"
import { ProductType } from '../../store/features/products/productType';
import { getAllProductsAsync } from '../../store/features/products/productSlice';
import Sidebar from './Sidebar';
import { ScrollArea } from '@/components/ui/scroll-area';
import PaginationComponent from '../pagination';
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Filter } from "lucide-react";
import { setFilterOpen } from '../../store/features/products/productSlice'
import FilterModal from '../../components/FilterModal'
import SkeletonHCard from "@/components/Loaders/SkeletonHCard";
import Oops from "@/components/Loaders/Oops";

function AllProducts() {
  const dispatch = useAppDispatch();

  const { products, page, limit, filterByCategory, minPrice, maxPrice, loading } = useAppSelector((store) => store.products);
  useEffect(() => {
    const queryParams: {
      page?: string;
      filterBy?: string[];
      limit?: string;
      minPrice?: number;
      maxPrice?: number;
    } = {
      page: page.toString(),
      limit: limit.toString(),
      filterBy: filterByCategory,
      minPrice: minPrice,
      maxPrice: maxPrice,
    };
    dispatch(getAllProductsAsync(queryParams))
  }, [dispatch, page, limit, filterByCategory, minPrice, maxPrice])

  return (
    <>
      <div className="bg-background">
        <FilterModal />
        <div className="flex flex-row p-4 justify-between lg:hidden">
          <h1>All Products</h1>
          <Button variant={"ghost"} onClick={() => dispatch(setFilterOpen())}><Filter /></Button>
        </div>
        <div className="grid lg:grid-cols-5">
          <Sidebar className={"hidden lg:block"} />
          <div className="col-span-3 lg:col-span-4 lg:border-l">
            <div className="h-full px-4 py-6 lg:px-8">
              <ScrollArea className="bg-white h-screen no-scrollbar overflow-auto lg:col-span-3 ">
                <div className="container mx-auto max-full">{
                  loading == 'succeeded' ?
                  <div className="grid grid-cols-1 lg:grid-cols-2 2xl:grid-cols-3 gap-6 place-items-center">
                    {   products.map((product: ProductType, index: number) => (<ProductCardHorizontal key={index} {...product} />))}
                  </div>
                    : loading == 'failed' ? <Oops/> :
                    <div className="grid grid-cols-1 lg:grid-cols-2 2xl:grid-cols-3 gap-6 place-items-center">
                    {  Array.from(Array(6)).map((index)=><SkeletonHCard key={index} />)}
                    </div>
                }
                </div>
              </ScrollArea>
              <PaginationComponent />
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default AllProducts