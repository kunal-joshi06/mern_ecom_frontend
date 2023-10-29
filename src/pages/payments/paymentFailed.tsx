import { Link } from "react-router-dom";

const PaymentCancel = () => {
    return (
        <div className="flex items-center justify-center h-screen">
            <div className="bg-gray-100">
                <div className="bg-white p-6 md:mx-auto">
                    <svg viewBox="0 0 24 24" className="text-red-600 w-16 h-16 mx-auto my-6">
                        <path fill="currentColor" d="M12,0A12,12,0,1,0,24,12,12.014,12.014,0,0,0,12,0ZM15.41,8.59a1,1,0,0,1,1.42,1.42L13.42,12l3.41,3.41a1,1,0,0,1-1.42,1.42L12,13.42,8.59,16.83a1,1,0,0,1-1.42-1.42L10.58,12,7.17,8.59a1,1,0,0,1,1.42-1.42L12,10.58,15.41,7.17a1,1,0,0,1,0,1.42Z" />
                    </svg>
                    <div className="text-center">
                        <h3 className="md:text-2xl text-base text-gray-900 font-semibold text-center">Payment Failed!</h3>
                        <p className="text-gray-600 my-2">Looks like something went wrong. Try again in sometime.</p>
                        <p> Our Apologies! </p>
                        <div className="py-10 text-center">
                            <Link to="/" className="px-12 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold py-3">
                                GO BACK
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PaymentCancel;
