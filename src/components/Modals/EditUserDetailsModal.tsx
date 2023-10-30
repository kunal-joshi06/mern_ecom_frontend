// import { Fragment, useEffect, useRef, useState } from 'react'
// import { Dialog, Transition } from '@headlessui/react'
// import { useAppDispatch } from '../../../store/hooks';
// import { useForm, SubmitHandler } from "react-hook-form"
// import { editProductAsync, removeProductReviewAsync } from '../../../store/features/products/productsSlice';
// import { EditProductType } from '../../../store/features/products/productsTypes';
// import { PencilSquareIcon } from '@heroicons/react/24/solid';
// import { TrashIcon } from '@heroicons/react/20/solid';


// const EditProductModal = ({ product }: EditProductType) => {
//     const dispatch = useAppDispatch();

//     type Inputs = {
//         name: string;
//         category: string;
//         description: string;
//         price: number;
//         stock: number;
//         imageUrl: string;
//     };

//     const {
//         register,
//         handleSubmit,
//         setValue,
//         formState: { errors },
//     } = useForm<Inputs>();

//     const onSubmit: SubmitHandler<Inputs> = (data) => {
//         dispatch(editProductAsync({ id: product._id, data }));
//         setOpen(false);
//     };

//     const [open, setOpen] = useState(false);

//     const cancelButtonRef = useRef(null);

//     useEffect(() => {
//         setValue('name', product.name);
//         setValue('category', product.category);
//         setValue('description', product.description);
//         setValue('price', product.price);
//         setValue('stock', product.stock);
//         setValue('imageUrl', product.imageUrl);
//     }, [product, setValue]);

//     const handleModal = () => {
//         setOpen(true);
//     };

//     const removeReview = (productId: string, reviewId: string) => {
//         dispatch(removeProductReviewAsync({ pId: productId, rId: reviewId }))
//     }

//     return (
//         <>
//             <button onClick={handleModal}><PencilSquareIcon className="w-5 h-5" /></button>
//             <Transition.Root show={open} as={Fragment}>
//                 <Dialog as="div" className="relative z-10" initialFocus={cancelButtonRef} onClose={setOpen}>
//                     <Transition.Child
//                         as={Fragment}
//                         enter="ease-out duration-300"
//                         enterFrom="opacity-0"
//                         enterTo="opacity-100"
//                         leave="ease-in duration-200"
//                         leaveFrom="opacity-100"
//                         leaveTo="opacity-0"
//                     >
//                         <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
//                     </Transition.Child>

//                     <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
//                         <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
//                             <Transition.Child
//                                 as={Fragment}
//                                 enter="ease-out duration-300"
//                                 enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
//                                 enterTo="opacity-100 translate-y-0 sm:scale-100"
//                                 leave="ease-in duration-200"
//                                 leaveFrom="opacity-100 translate-y-0 sm:scale-100"
//                                 leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
//                             >
//                                 <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
//                                     <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
//                                         <div className="sm:flex sm:items-start">
//                                             <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
//                                                 <Dialog.Title as="h3" className="text-lg font-semibold leading-6 text-gray-900">
//                                                     Edit Product.
//                                                 </Dialog.Title>
//                                                 <form className="w-full max-w-lg mt-4" onSubmit={handleSubmit(onSubmit)}>
//                                                     <div className="flex flex-wrap -mx-3 mb-6">
//                                                         <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
//                                                             <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-name">
//                                                                 Product Name
//                                                             </label>
//                                                             <input
//                                                                 {...register("name", { required: true })}
//                                                                 className="appearance-none block w-full bg-gray-200 text-gray-700 border  rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
//                                                                 id="grid-first-name"
//                                                                 type="text"
//                                                                 placeholder="Name of the product" />
//                                                             {errors.name && <span className='text-sm text-red-600'>This field is required</span>}
//                                                         </div>
//                                                         <div className="w-full md:w-1/2 px-3">
//                                                             <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-category">
//                                                                 Category
//                                                             </label>
//                                                             <input
//                                                                 {...register("category", { required: true })}
//                                                                 className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
//                                                                 id="grid-last-name"
//                                                                 type="text"
//                                                                 placeholder="Category of the product" />
//                                                             {errors.category && <span className='text-sm text-red-600'>This field is required</span>}
//                                                         </div>
//                                                     </div>
//                                                     <div className="flex flex-wrap -mx-3 mb-6">
//                                                         <div className="w-full px-3">
//                                                             <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-description">
//                                                                 Description
//                                                             </label>
//                                                             <textarea
//                                                                 id="desc"
//                                                                 {...register("description", { required: true })}
//                                                                 rows={3}
//                                                                 className="block w-full rounded-md border-0 p-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
//                                                                 defaultValue={''}
//                                                             />
//                                                             {errors.description && <span className='text-sm text-red-600'>This field is required</span>}
//                                                         </div>
//                                                     </div>
//                                                     <div className="flex flex-wrap -mx-3 mb-2">
//                                                         <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
//                                                             <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-city">
//                                                                 Price
//                                                             </label>
//                                                             <input
//                                                                 {...register("price", { required: true })}
//                                                                 className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
//                                                                 id="grid-price"
//                                                                 type="number"
//                                                                 placeholder="Rs. 0.00" />
//                                                             {errors.price && <span className='text-sm text-red-600'>This field is required</span>}
//                                                         </div>
//                                                         <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
//                                                             <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-stock">
//                                                                 Stock
//                                                             </label>
//                                                             <input
//                                                                 {...register("stock", { required: true })}
//                                                                 className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
//                                                                 id="grid-stock"
//                                                                 type="number"
//                                                                 placeholder="0-100" />
//                                                             {errors.stock && <span className='text-sm text-red-600'>This field is required</span>}
//                                                         </div>
//                                                         <div className="w-full p-3 mt-3">
//                                                             <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-image">
//                                                                 Image URL
//                                                             </label>
//                                                             <input
//                                                                 {...register("imageUrl", { required: true })}
//                                                                 className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
//                                                                 id="grid-image"
//                                                                 type="text"
//                                                             />
//                                                             {errors.imageUrl && <span className='text-sm text-red-600'>This field is required</span>}
//                                                         </div>
//                                                         <div className="w-full p-3 mt-3">
//                                                             <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-reviews">
//                                                                 Reviews
//                                                             </label>

//                                                             {product.reviews.map((review) => (
//                                                                 <div
//                                                                     key={review._id}
//                                                                     className="my-2 flex justify-between appearance-none  w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
//                                                                     id="grid-image"
//                                                                 >
//                                                                     <div>
//                                                                         <p><span className='font-bold'>Reviewer Name :</span> {review.name}</p>
//                                                                         <p><span className='font-bold'>Rating :</span> {review.rating}</p>
//                                                                         <p><span className='font-bold'>Comment:</span> {review.comment}</p>
//                                                                     </div>
//                                                                     <div className="w-4 cursor-pointer mr-2 transform hover:text-red-500 hover:scale-110"
//                                                                         onClick={() => removeReview(product._id, review._id)}
//                                                                     ><TrashIcon className='h-5 w-5' /></div>

//                                                                 </div>

//                                                             ))}

//                                                         </div>
//                                                     </div>
//                                                     <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
//                                                         <button
//                                                             type="submit"
//                                                             className="inline-flex w-full justify-center rounded-md bg-green-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 sm:ml-3 sm:w-auto"
//                                                         >
//                                                             Update
//                                                         </button>
//                                                         <button
//                                                             type="button"
//                                                             className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
//                                                             onClick={() => setOpen(false)}
//                                                             ref={cancelButtonRef}
//                                                         >
//                                                             Cancel
//                                                         </button>
//                                                     </div>
//                                                 </form>
//                                             </div>
//                                         </div>
//                                     </div>

//                                 </Dialog.Panel>
//                             </Transition.Child>
//                         </div>
//                     </div>
//                 </Dialog>
//             </Transition.Root>
//         </>

//     )
// }


// export default EditProductModal;