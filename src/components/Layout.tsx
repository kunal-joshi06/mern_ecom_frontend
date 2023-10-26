import { ReactNode } from "react";
import Navbar from "./Navbar"
import Footer from "./Footer";
import Cart from "./Cart";

interface LayoutProps {
    children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
    return (
        <>
            <Cart />
            <Navbar />
            {children}
            <Footer />
        </>
    )
}

export default Layout