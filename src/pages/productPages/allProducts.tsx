import { Fragment, useEffect, useState } from 'react'
import ProductCardHorizontal from "./ProductCardHorizontal";
import { useAppDispatch, useAppSelector } from "../../store/hooks"
import { Dialog, Disclosure, Menu, Transition } from '@headlessui/react'
import { XMarkIcon } from '@heroicons/react/24/outline'
import { ChevronDownIcon, FunnelIcon, MinusIcon, PlusIcon } from '@heroicons/react/20/solid'
import { ProductType } from '../../store/features/products/productType';
import { getAllProductsAsync } from '../../store/features/products/productSlice';
import Pagination from '../pagination';


function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ')
}

function AllProducts() {
  const dispatch = useAppDispatch();
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false)
  const [selectedCategory, setSelectedCategory] = useState<string[]>([]);
  const [sortLabel, setSortLabel] = useState("A-z")
  const [sortBy, setSortBy] = useState("name");
  const products = useAppSelector((store) => store.products.products);

  useEffect(() => {
    const queryParams: {
      page?: string;
      sortBy?: string;
      filterBy?: string[];
      limit?: string
    } = {
      page: "1",
      sortBy: sortBy,
      filterBy: selectedCategory,
      limit: "8"
    };
    dispatch(getAllProductsAsync(queryParams))
  }, [dispatch, selectedCategory, sortBy])

  const handleSortAscending = () => {
    setSortBy("name")
    setSortLabel("A-z")
  }

  const handleSortDescending = () => {
    setSortBy("-name")
    setSortLabel("Z-a")
  }

  const handleCategoryFilter = (category: string) => {
    setSelectedCategory((prevSelectedCategories) => [...prevSelectedCategories, category]);
  }

  const handleUncheckedCategoryFilter = (category: string) => {
    setSelectedCategory((prevSelectedCategories) =>
      prevSelectedCategories.filter((item) => item !== category)
    );
  }

  const sortOptions = [
    { name: 'A-z', current: true, action: handleSortAscending },
    { name: 'Z-a', current: false, action: handleSortDescending },
  ]

  const filters = [
    {
      id: 'category',
      name: 'Category',
      options: [
        { value: 'clothing', label: 'Clothing' },
        { value: 'sports', label: 'Sports' },
        { value: 'gaming', label: 'Gaming' },
        { value: 'accessories', label: 'Accessories' },
      ],
    },
  ]

  return (
    <>
      <div className="bg-white">
        <div>
          {/* Mobile filter dialog */}
          <Transition.Root show={mobileFiltersOpen} as={Fragment}>
            <Dialog as="div" className="relative z-40 lg:hidden" onClose={setMobileFiltersOpen}>
              <Transition.Child
                as={Fragment}
                enter="transition-opacity ease-linear duration-300"
                enterFrom="opacity-0"
                enterTo="opacity-100"
                leave="transition-opacity ease-linear duration-300"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
              >
                <div className="fixed inset-0 bg-black bg-opacity-25" />
              </Transition.Child>

              <div className="fixed inset-0 z-40 flex">
                <Transition.Child
                  as={Fragment}
                  enter="transition ease-in-out duration-300 transform"
                  enterFrom="translate-x-full"
                  enterTo="translate-x-0"
                  leave="transition ease-in-out duration-300 transform"
                  leaveFrom="translate-x-0"
                  leaveTo="translate-x-full"
                >
                  <Dialog.Panel className="relative ml-auto flex h-full w-full max-w-xs flex-col overflow-y-auto bg-white py-4 pb-12 shadow-xl">
                    <div className="flex items-center justify-between px-4">
                      <h2 className="text-lg font-medium text-gray-900">Filters</h2>
                      <button
                        type="button"
                        className="-mr-2 flex h-10 w-10 items-center justify-center rounded-md bg-white p-2 text-gray-400"
                        onClick={() => setMobileFiltersOpen(false)}
                      >
                        <span className="sr-only">Close menu</span>
                        <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                      </button>
                    </div>

                    {/* Filters */}
                    <form className="mt-4 border-t border-gray-200">
                      <h3 className="sr-only">Categories</h3>
                      {filters.map((section) => (
                        <Disclosure as="div" key={section.id} className="border-t border-gray-200 px-4 py-6">
                          {({ open }) => (
                            <>
                              <h3 className="-mx-2 -my-3 flow-root">
                                <Disclosure.Button className="flex w-full items-center justify-between bg-white px-2 py-3 text-gray-400 hover:text-gray-500">
                                  <span className="font-medium text-gray-900">{section.name}</span>
                                  <span className="ml-6 flex items-center">
                                    {open ? (
                                      <MinusIcon className="h-5 w-5" aria-hidden="true" />
                                    ) : (
                                      <PlusIcon className="h-5 w-5" aria-hidden="true" />
                                    )}
                                  </span>
                                </Disclosure.Button>
                              </h3>
                              <Disclosure.Panel className="pt-6">
                                <div className="space-y-6">
                                  {section.options.map((option, optionIdx) => (
                                    <div key={option.value} className="flex items-center">
                                      <input
                                        id={`filter-mobile-${section.id}-${optionIdx}`}
                                        name={`${section.id}[]`}
                                        defaultValue={option.value}
                                        type="checkbox"
                                        className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                                        onChange={(event) => {
                                          if (event.target.checked) {
                                            handleCategoryFilter(option.value);
                                          } else {
                                            handleUncheckedCategoryFilter(option.value);
                                          }
                                        }}
                                      />
                                      <label
                                        htmlFor={`filter-mobile-${section.id}-${optionIdx}`}
                                        className="ml-3 min-w-0 flex-1 text-gray-500"
                                      >
                                        {option.label}
                                      </label>
                                    </div>
                                  ))}
                                </div>
                              </Disclosure.Panel>
                            </>
                          )}
                        </Disclosure>
                      ))}
                    </form>
                  </Dialog.Panel>
                </Transition.Child>
              </div>
            </Dialog>
          </Transition.Root>
          <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex items-baseline justify-between border-b border-gray-200 pb-6 pt-24">
              <h1 className="text-4xl font-bold tracking-tight text-gray-900">All Products</h1>
              <div className="flex items-center">
                {/* sort filter  */}
                <Menu as="div" className="relative inline-block text-left">
                  <div>
                    <Menu.Button className="group inline-flex justify-center text-sm font-medium text-gray-700 hover:text-gray-900">
                      Sort : {sortLabel}
                      <ChevronDownIcon
                        className="-mr-1 ml-1 h-5 w-5 flex-shrink-0 text-gray-400 group-hover:text-gray-500"
                        aria-hidden="true"
                      />
                    </Menu.Button>
                  </div>

                  <Transition
                    as={Fragment}
                    enter="transition ease-out duration-100"
                    enterFrom="transform opacity-0 scale-95"
                    enterTo="transform opacity-100 scale-100"
                    leave="transition ease-in duration-75"
                    leaveFrom="transform opacity-100 scale-100"
                    leaveTo="transform opacity-0 scale-95"
                  >
                    <Menu.Items className="absolute right-0 z-10 mt-2 w-40 origin-top-right rounded-md bg-white shadow-2xl ring-1 ring-black ring-opacity-5 focus:outline-none">
                      <div className="py-1">
                        {sortOptions.map((option) => (
                          <Menu.Item key={option.name}>
                            {({ active }) => (
                              <div
                                onClick={option.action}
                                className={classNames(
                                  option.current ? 'font-medium text-gray-900' : 'text-gray-500',
                                  active ? 'bg-gray-100' : '',
                                  'block px-4 py-2 text-sm'
                                )}
                              >
                                {option.name}
                              </div>
                            )}
                          </Menu.Item>
                        ))}
                      </div>
                    </Menu.Items>
                  </Transition>
                </Menu>
                {/* filter button for small screen  */}
                <button
                  type="button"
                  className="-m-2 ml-4 p-2 text-gray-400 hover:text-gray-500 sm:ml-6 lg:hidden"
                  onClick={() => setMobileFiltersOpen(true)}
                >
                  <span className="sr-only">Filters</span>
                  <FunnelIcon className="h-5 w-5" aria-hidden="true" />
                </button>
              </div>
            </div>

            <section aria-labelledby="products-heading" >
              <h2 id="products-heading" className="sr-only">
                Products
              </h2>

              <div className="grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-4">
                {/* Filters */}
                <form className="hidden lg:block">
                  <h3 className="sr-only">Categories</h3>
                  {filters.map((section) => (
                    <Disclosure as="div" key={section.id} className="border-b border-gray-200 py-6">
                      {({ open }) => (
                        <>
                          <h3 className="-my-3 flow-root">
                            <Disclosure.Button className="flex w-full items-center justify-between bg-white py-3 text-sm text-gray-400 hover:text-gray-500">
                              <span className="font-medium text-gray-900">{section.name}</span>
                              <span className="ml-6 flex items-center">
                                {open ? (
                                  <MinusIcon className="h-5 w-5" aria-hidden="true" />
                                ) : (
                                  <PlusIcon className="h-5 w-5" aria-hidden="true" />
                                )}
                              </span>
                            </Disclosure.Button>
                          </h3>
                          <Disclosure.Panel className="pt-6">
                            <div className="space-y-4">
                              {section.options.map((option, optionIdx) => (
                                <div key={option.value} className="flex items-center">
                                  <input
                                    id={`filter-${section.id}-${optionIdx}`}
                                    name={`${section.id}[]`}
                                    defaultValue={option.value}
                                    type="checkbox"
                                    className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                                    onChange={(event) => {
                                      if (event.target.checked) {
                                        handleCategoryFilter(option.value);
                                      } else {
                                        handleUncheckedCategoryFilter(option.value);
                                      }
                                    }}
                                  />
                                  <label
                                    htmlFor={`filter-${section.id}-${optionIdx}`}
                                    className="ml-3 text-sm text-gray-600"
                                  >
                                    {option.label}
                                  </label>
                                </div>
                              ))}
                            </div>
                          </Disclosure.Panel>
                        </>
                      )}
                    </Disclosure>
                  ))}
                </form>
                <div className="bg-white h-screen no-scrollbar overflow-auto lg:col-span-3 ">
                  <div className="container mx-auto max-full">
                    <div className="mt-6 grid grid-cols-1 lg:grid-cols-2 gap-6 p-4 place-items-center">
                      {products.map((product: ProductType, index: number) => (<ProductCardHorizontal key={index} {...product} />))}
                    </div>
                  </div>
                </div>
                <div className="flex justify-center items-center w-full pb-10">
                  {/* <button onClick={()=>dispatch(showMoreProducts())} className="mt-2 px-4 py-2 bg-slate-100 font-semibold text-slate-700 rounded hover:bg-slate-3 00">
                        Show More
                      </button> */}
                </div>
                <div className="lg:col-span-3">{/* Your content */}</div>
              </div>
            </section>
          </main>
        </div>
      </div>
      <Pagination />
    </>
  )
}

export default AllProducts