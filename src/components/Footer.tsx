import { Slack } from "lucide-react";
import { Link } from "react-router-dom";

function Footer() {
  return (
   
<footer className="bg-zinc-900 text-white sono">
    <div className="w-full max-w-screen-xl mx-auto p-4 md:py-8">
        <div className="sm:flex sm:items-center sm:justify-between">
            <Link to="/" className="flex items-center mb-4 sm:mb-0">
               <Slack size={40} />
                <span className="self-center text-2xl font-semibold whitespace-nowrap text-rose-500">&nbsp; Jainwin</span>
            </Link>
            <ul className="flex flex-wrap items-center mb-6 text-sm font-medium sm:mb-0 text-gray-400">
                <li>
                    <Link to="/" className="mr-4 hover:underline md:mr-6 ">About</Link>
                </li>
                <li>
                    <Link to="/" className="mr-4 hover:underline md:mr-6">Privacy Policy</Link>
                </li>
                <li>
                    <Link to="/" className="mr-4 hover:underline md:mr-6 ">Licensing</Link>
                </li>
                <li>
                    <Link to="/" className="hover:underline">Contact</Link>
                </li>
            </ul>
        </div>
        <hr className="my-6  sm:mx-auto border-gray-700 lg:my-8" />
        <span className="block text-sm  sm:text-center text-gray-400">© 2023 <a href="https://jainwin.com/" className="hover:underline">Jainwin™</a>. All Rights Reserved.</span>
    </div>
</footer>


  );
}

export default Footer