import { Fragment } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { XMarkIcon } from '@heroicons/react/24/outline'
import { useAppDispatch, useAppSelector } from '../store/hooks'
import { decreaseQuantity, increaseQuantity, removeItemFromCart, setClose } from '../store/features/cart/cartSlice'
import { Link } from 'react-router-dom'
import { Button } from './ui/button'



export default function Cart() {
    const dispatch = useAppDispatch()
    const isCartOpen = useAppSelector(state => state.cart.openState)
    const isLoggedIn = useAppSelector(state => state.auth.user.isLoggedIn)

    const handleCartClose = () => {
        dispatch(setClose())
    }

    const handleRemoveItem = (id: string) => {
        dispatch(removeItemFromCart(id))
    }

    const products = useAppSelector(state => state.cart.cartItems)

    const cartTotal = useAppSelector(state => state.cart.cartTotal)

    const handleIncreaseQty = (id: string) => {
        dispatch(increaseQuantity(id))
    }

    const handleDecreaseQty = (id: string) => {
        dispatch(decreaseQuantity(id))
    }

  

    return (
        <Transition.Root show={isCartOpen} as={Fragment}>
            <Dialog as="div" className="relative z-50" onClose={handleCartClose}>
                <Transition.Child
                    as={Fragment}
                    enter="ease-in-out duration-500"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in-out duration-500"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
                </Transition.Child>

                <div className="fixed inset-0 overflow-hidden">
                    <div className="absolute inset-0 overflow-hidden">
                        <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
                            <Transition.Child
                                as={Fragment}
                                enter="transform transition ease-in-out duration-500 sm:duration-700"
                                enterFrom="translate-x-full"
                                enterTo="translate-x-0"
                                leave="transform transition ease-in-out duration-500 sm:duration-700"
                                leaveFrom="translate-x-0"
                                leaveTo="translate-x-full"
                            >
                                <Dialog.Panel className="pointer-events-auto h-screen w-screen max-w-md">
                                    <div className="flex h-full flex-col overflow-y-scroll bg-white shadow-xl">
                                        <div className={isLoggedIn ? "flex-1 overflow-y-auto px-4 py-6 sm:px-6 no-scrollbar"
                                                        : "flex-1 overflow-hidden px-4 py-6 sm:px-6"}>
                                            <div className="flex items-start justify-between">
                                                <Dialog.Title className="text-lg font-medium text-gray-900">Shopping cart</Dialog.Title>
                                                <div className="ml-3 flex h-7 items-center">
                                                    <button
                                                        type="button"
                                                        className="relative -m-2 p-2 text-gray-400 hover:text-gray-500"
                                                        onClick={handleCartClose}
                                                    >
                                                        <span className="absolute -inset-0.5" />
                                                        <span className="sr-only">Close panel</span>
                                                        <XMarkIcon className="h-6 w-6" aria-hidden="true" onClick={() => dispatch(setClose())} />
                                                    </button>
                                                </div>
                                            </div>

                                            {products.length < 1 && isLoggedIn && (
                                                <h3 className="mt-8 text-md font-medium text-gray-900">Your Cart is Empty. Add items in the cart to view.</h3>
                                            )}


                                            {isLoggedIn ? (
                                                <div className="mt-8">
                                                    <div className="flow-root">
                                                        <ul role="list" className="-my-6 divide-y divide-gray-200">
                                                            {products.map((product) => (
                                                                <li key={product._id} className="flex py-6">
                                                                    <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                                                                        {product.imageUrl && <img
                                                                            src={product.imageUrl}
                                                                            alt="alt-image"
                                                                            className="h-full w-full object-cover object-center"
                                                                        />}
                                                                    </div>

                                                                    <div className="ml-4 flex flex-1 flex-col">
                                                                        <div>
                                                                            <div className="flex justify-between text-base font-medium text-gray-900">
                                                                                <h3>
                                                                                    <p>{product.name}</p>
                                                                                </h3>
                                                                                <p className="ml-4">Rs. {product.price}</p>
                                                                            </div>
                                                                            <p className="mt-1 text-sm text-gray-500">Rating : {Math.round(product.rating!)}</p>
                                                                        </div>
                                                                        <div className="flex flex-1 items-end justify-between text-sm">
                                                                            <p className="text-gray-500"><span className='flex'>Qty : <button className=' mx-1 border-slate-300 border-2 w-4' onClick={() => handleIncreaseQty(product._id!)}>+</button><span className='font-bold'>{product.quantity} </span><button className='mx-1 border-slate-300 border-2 w-4' onClick={() => handleDecreaseQty(product._id!)}>-</button></span></p>
                                                                            <div className="flex">
                                                                                <button
                                                                                    onClick={() => handleRemoveItem(product._id!)}
                                                                                    type="button"
                                                                                    className="font-medium text-indigo-600 hover:text-indigo-500"
                                                                                >
                                                                                    Remove
                                                                                </button>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </li>
                                                            ))}
                                                        </ul>
                                                    </div>
                                                </div>
                                            ) : (
                                                <div className='flex py-8 h-full w-full flex-col overflow-hidden justify-between'>  
                                                <div className='flex flex-row justify-between items-baseline'>
                                                    <h3 className="text-md font-medium text-gray-900">Please login to view your cart.</h3>
                                                    <Button variant={"secondary"}><Link to="/login">Login</Link></Button>  
                                                </div>
                                                <div className='flex flex-row justify-between items-end'>
                                                    <h3 className="text-md font-medium text-gray-900">Don't have an account?</h3>
                                                    <Button><Link to="/register">Create Account</Link></Button>  
                                                </div>

                                                </div>
                                            )}
                                        </div>


                                        {isLoggedIn && products.length > 0 && (
                                            <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
                                                <div className="flex justify-between text-base font-medium text-gray-900">
                                                    <p>Subtotal</p>
                                                    <p>Rs. {cartTotal}</p>
                                                </div>
                                                <p className="mt-0.5 text-sm text-gray-500">Shipping and taxes calculated at checkout.</p>
                                                <div className="mt-6">
                                                    <Button><Link to='/checkout'>Checkout</Link></Button>
                                                </div>
                                            </div>
                                        )}


                                    </div>
                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </div>
                </div>
            </Dialog>
        </Transition.Root>
    )
}

