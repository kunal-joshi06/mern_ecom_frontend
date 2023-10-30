import { useEffect } from 'react'
import ProductCardHorizontal from "./productPages/ProductCardHorizontal";
import { useAppDispatch, useAppSelector } from "../store/hooks"
import { ProductType } from '../store/features/products/productType';
import { getAllProductsAsync } from '../store/features/products/productSlice';
import Pagination from './pagination';
import Sidebar from './productPages/Sidebar';
import { ScrollArea } from '@/components/ui/scroll-area';


function Temp() {
    const dispatch = useAppDispatch();
    const { products, page, limit } = useAppSelector((store) => store.products);
    useEffect(() => {
        const queryParams: {
          page?: string;
          filterBy?: string[];
          limit?: string
        } = {
          page: page.toString(),
          limit: limit.toString(),
        };

        dispatch(getAllProductsAsync(queryParams))

      }, [dispatch, page, limit])

  

  
  return (
      <>
        <>
          <div className="bg-background">
            <div className="grid lg:grid-cols-5">
              <Sidebar className="hidden lg:block" />
              <div className="col-span-3 lg:col-span-4 lg:border-l">
                <div className="h-full px-4 py-6 lg:px-8">
                <ScrollArea className="bg-white h-screen no-scrollbar overflow-auto lg:col-span-3 ">
                  <div className="container mx-auto max-full">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 place-items-center">
                      {products.map((product: ProductType, index: number) => (<ProductCardHorizontal key={index} {...product} />))}
                    </div>
                  </div>
                </ScrollArea>
                <Pagination/>
                </div>
              </div>
            </div>
          </div>
        </>
      </>
  )
}

export default Temp