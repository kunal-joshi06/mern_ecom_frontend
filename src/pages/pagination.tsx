import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/20/solid'
import { useAppSelector, useAppDispatch } from '../store/hooks'
import { useEffect, useState } from 'react';
import { getAllProductsAsync } from '../store/features/products/productSlice';

export default function Pagination() {
  const dispatch = useAppDispatch();
  const {limit,page, totalProducts} = useAppSelector((store:any)=> store.products);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(()=>{
    dispatch(getAllProductsAsync({page: currentPage.toString(),}))
      },[currentPage])
  const totalPages = Math.ceil(totalProducts/limit);
  const handlePrev = ()=>{
    if(currentPage > 1){
      setCurrentPage(currentPage - 1);
    }
  }
  const handleNext = ()=>{
    if(totalPages > 1 && currentPage != totalPages){
      setCurrentPage(currentPage + 1);
    }
    return;
  }
  



  return (<>
      {
        totalPages > 1 ? <div className="flex items-center justify-between bg-white px-4 py-3 sm:px-6">
        {/* next prev links for small screen*/}
        <div className="flex flex-1 justify-between sm:hidden">
          <a
            href="javascript:void(0);"
            onClick={handlePrev}
            className="relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
          >
            Previous
          </a>
          {
            currentPage == totalPages ? <></> :  <a
            href="avascript:void(0);"
            onClick={handleNext}
            className="relative ml-3 inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
          >
            Next
          </a>
          }
        </div>

        <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
          <div>
            <p className="text-sm text-gray-700">
              Showing <span className="font-medium">{0}</span> to <span className="font-medium">{limit}</span> of{0}
              <span className="font-medium">{0}</span> results
            </p>
          </div>
          <div>
            <nav className="isolate inline-flex -space-x-px rounded-md shadow-sm" aria-label="Pagination">
              <a
                href="javascript:void(0);"
                onClick={handlePrev}
                className="relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
              >
                <span className="sr-only">Previous</span>
                <ChevronLeftIcon className="h-5 w-5" aria-hidden="true" />
              </a>
              {/* Current: "z-10 bg-indigo-600 text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600", Default: "text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:outline-offset-0" */}
              
              {
                Array.from({length: totalPages}, (_, i) => i + 1).map(val=>{
                  return (
                    <a
                    href="javascript:void(0);"
                    onClick={()=> setCurrentPage(val)}
                    key={val}
                    aria-current="page"
                    className={currentPage == val ? "relative z-10 inline-flex items-center bg-indigo-600 px-4 py-2 text-sm font-semibold text-white focus:z-20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600" : 
                                            "relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
                                          }
                  >
                    {val}
                  </a>
                  )
                })
              }
              <a
                href="javascript:void(0);"
                onClick={handleNext}
                className="relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
              >
                <span className="sr-only">Next</span>
                <ChevronRightIcon className="h-5 w-5" aria-hidden="true" />
              </a>
            </nav>
          </div>
        </div>
      </div>
      : <><div className='w-full px-4 pt-4 pb-12 text-center'><p>No more products to show</p></div></>
      }
   </>
  )
}
