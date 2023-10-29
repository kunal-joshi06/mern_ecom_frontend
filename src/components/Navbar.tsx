import { Link } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from "../store/hooks";
import ProfileDropdown from "./ProfileDropdown";
import { setOpen } from "../store/features/cart/cartSlice";

const Navbar = () => {
    const dispatch = useAppDispatch()
    const isLoggedIn = useAppSelector(state => state.auth.user.isLoggedIn)
    const totalItems = useAppSelector(state => state.cart.totalItems)
    return (
        <header className="z-40 items-center w-full h-14 shadow-lg bg-gradient-to-r from-cyan-500 to-blue-500">
            <div className="relative z-20 flex flex-col justify-center h-full px-3 mx-auto flex-center">
                <div className="relative flex items-center w-full pl-1 lg:max-w-68 sm:pr-2 sm:ml-0">
                    <div className="container relative left-0 z-50 flex w-3/4 h-auto">
                        <Link to="/" className="flex items-center">
                            <span className="self-center text-2xl font-semibold whitespace-nowrap text-white">Jainuine products</span>
                        </Link>
                    </div>
                    <div className="relative flex items-center text-white justify-end w-1/4 p-1 ml-5 mr-4 sm:mr-0 sm:right-auto">
                        <button type="button" onClick={() => dispatch(setOpen())} className="relative inline-flex items-center mx-2 p-1 text-sm font-medium text-center text-white bg-blue-500 rounded-lg hover:bg-blue-500 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-500 dark:hover:bg-blue-500 dark:focus:ring-blue-500">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
                            </svg>
                            <span className="sr-only">bag</span>
                            <div className="absolute inline-flex items-center justify-center w-6 h-6 text-xs font-bold text-white bg-red-500 border-2 border-blue-500 rounded-full -top-2 -right-2">{totalItems}</div>
                        </button>
                        {isLoggedIn ? <ProfileDropdown /> : <Link className="font-semibold mx-2" to="/login">Login</Link>}
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Navbar;
