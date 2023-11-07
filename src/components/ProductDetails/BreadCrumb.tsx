import { useNavigate } from "react-router-dom";

interface BreadCrumbProps {
    currentPage: string | null;
}

const BreadCrumb: React.FC<BreadCrumbProps> = ({ currentPage }) => {
    const navigate = useNavigate();

    const goToPreviousPage = () => {
        navigate(-1); // This navigates back to the previous page
    };
    return <div className="bg-white p-4 flex items-center flex-wrap">
        <nav aria-label="breadcrumb">
            <ol className="flex leading-none cta-text divide-x">
                <li className="pr-4">
                    <div onClick={goToPreviousPage} className="cursor-pointer inline-flex items-center cta-text hover:underline">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 15L3 9m0 0l6-6M3 9h12a6 6 0 010 12h-3" />
                    </svg>
                    </div>
                </li>

                <li className="inline-flex items-center px-4 text-gray-700" aria-current="page">
                    <span className="text-gray-600 cursor-default">
                        {currentPage}
                    </span>
                </li>

            </ol>
        </nav>
    </div>
}

export default BreadCrumb