import { useAppDispatch, useAppSelector } from "@/store/hooks";
import MainNav from "./Navbar/MainNav";
import { UserNav } from "./Navbar/UserNav";
import { Button } from "./ui/button";
import { Link } from "react-router-dom";
import { setOpen } from "@/store/features/cart/cartSlice";
import { Input } from "./ui/input";

function Navbar() {
    const dispatch = useAppDispatch();
    const isLoggedIn = useAppSelector((state) => state.auth.user.isLoggedIn);
    const totalItems = useAppSelector(state => state.cart.totalItems);

    return (
        <>
            <div className="flex-col flex sono">
                <div className="border-b">
                    <div className="flex h-16 items-center px-4">
                        <MainNav className="mx-6" />
                        <div>
                            <Input
                                type="search"
                                placeholder="Search..."
                                className="md:w-[100px] lg:w-[300px]"
                            />
                        </div>
                        <div className="ml-auto flex items-center space-x-4">
                            <button type="button" onClick={() => dispatch(setOpen())} className="relative inline-flex items-center text-sm font-medium text-center bg-white">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="Black" className="w-6 h-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
                                </svg>
                                <span className="sr-only">bag</span>
                                {totalItems > 0 && <div className="absolute w-5 h-5 bg-rose-500 text-white rounded-full bottom-1 right-4">{totalItems > 9 ? "9+" : totalItems}</div>}
                            </button>
                            {isLoggedIn ? <UserNav /> : <Button variant={"secondary"} className="hover:shadow-zinc-300  hover:shadow-md transition-shadow duration-100"><Link to="/login">Login</Link></Button>}
                        </div>
                    </div>
                </div>
            </div>
        </>)
}

export default Navbar