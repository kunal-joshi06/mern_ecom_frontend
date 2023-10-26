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
            <ol className="flex leading-none text-blue-500 divide-x">
                <li className="pr-4">
                    <div onClick={goToPreviousPage} className="cursor-pointer inline-flex items-center hover:text-blue-500 hover:underline">
                        Go Back
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