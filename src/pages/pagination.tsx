import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/20/solid'
import { useAppSelector, useAppDispatch } from '../store/hooks'
import { useEffect, useState } from 'react';
import { getAllProductsAsync } from '../store/features/products/productSlice';

export default function Pagination() {
  const dispatch = useAppDispatch();
  const { limit, page, totalProducts } = useAppSelector((store) => store.products);
  const [currentPage, setCurrentPage] = useState(page);
  const [initialProductCount, setInitialProductCount] = useState(1);
  const [finalProductCount, setFinalProductCount] = useState(limit);

  useEffect(() => {
    dispatch(getAllProductsAsync({ page: currentPage.toString(), limit: "6" }));
  }, [currentPage, dispatch]);

  useEffect(() => {
    // When the page changes, update the product count
    setInitialProductCount((currentPage - 1) * limit + 1);
    setFinalProductCount(Math.min(currentPage * limit, totalProducts));
  }, [currentPage, limit, totalProducts]);

  const totalPages = Math.ceil(totalProducts / limit);

  const handlePrev = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  }

  const handleNext = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  }

  return (
    <>
      {totalPages > 0 ? (
        <div className="flex items-center justify-between bg-white px-4 py-3 sm:px-6">
          <div className="flex flex-1 justify-between sm:hidden">
            <div
              onClick={handlePrev}
              className="relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
            >
              Previous
            </div>
            {currentPage === totalPages ? (
              <></>
            ) : (
              <div
                onClick={handleNext}
                className="relative ml-3 inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
              >
                Next
              </div>
            )}
          </div>

          <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
            <div>
              <p className="text-sm text-gray-700">
                Showing <span className="font-medium">{initialProductCount}</span> to{' '}
                <span className="font-medium">{finalProductCount}</span> of
                <span className="font-medium"> {totalProducts} </span> results
              </p>
            </div>
            <div>
              <nav className="isolate inline-flex -space-x-px rounded-md shadow-sm" aria-label="Pagination">
                <div
                  onClick={handlePrev}
                  className="relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
                >
                  <span className="sr-only">Previous</span>
                  <ChevronLeftIcon className="h-5 w-5" aria-hidden="true" />
                </div>

                {Array.from({ length: totalPages }, (_, i) => i + 1).map((val) => (
                  <div
                    onClick={() => setCurrentPage(val)}
                    key={val}
                    aria-current="page"
                    className={
                      currentPage === val
                        ? 'relative z-10 inline-flex items-center bg-blue-500 px-4 py-2 text-sm font-semibold text-white focus:z-20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'
                        : 'relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover.bg-gray-50 focus:z-20 focus:outline-offset-0'
                    }
                  >
                    {val}
                  </div>
                ))}
                <div
                  onClick={handleNext}
                  className="relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover.bg-gray-50 focus:z-20 focus:outline-offset-0"
                >
                  <span className="sr-only">Next</span>
                  <ChevronRightIcon className="h-5 w-5" aria-hidden="true" />
                </div>
              </nav>
            </div>
          </div>
        </div>
      ) : (
        <div className="w-full px-4 pt-4 pb-12 text-center">
          <p>No more products to show</p>
        </div>
      )}
    </>
  );
}
