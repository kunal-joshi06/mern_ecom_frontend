import ChangePasswordModal from "@/components/Modals/ChangePasswordModal"
// import EditUserDetailsModal from "@/components/Modals/EditUserDetailsModal"
import BreadCrumb from "@/components/ProductDetails/BreadCrumb"
import { useAppSelector } from "@/store/hooks"


const AccountSettings = () => {

    const user = useAppSelector(state => state.auth.user)

    return (
        <>
            <div className="container mx-auto max-full px-4 py-12 sm:px-6 sm:py-18 h-screen">
                <BreadCrumb currentPage="Account Settings" />
                <h1 className="text-2xl font-bold tracking-tight text-gray-900">Account Settings</h1>

                <div className="bg-white overflow-hidden shadow rounded-lg border m-10 w-1/2">
                    <div className="px-4 py-5 sm:px-6">
                        <div className="flex justify-between">
                            <h3 className="text-lg leading-6 font-medium text-gray-900">
                                Your Profile
                            </h3>
                            {/* <button className="cursor-pointer mr-2 transform hover:text-yellow-500 hover:scale-110"><EditUserDetailsModal /></button> */}
                        </div>

                        <p className="mt-1 max-w-2xl text-sm text-gray-500">
                            Here`s  your personal information.
                        </p>
                    </div>
                    <div className="border-t border-gray-200 px-4 py-5 sm:p-0">
                        <div className="sm:divide-y sm:divide-gray-200">
                            <div className="py-3 px-6 flex justify-between">
                                <div className="text-sm font-medium text-gray-500">
                                    Full name
                                </div>
                                <div className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                                    {user.name}
                                </div>
                            </div>
                            <div className="py-3 px-6 flex justify-between">
                                <div className="text-sm font-medium text-gray-500">
                                    Email address
                                </div>
                                <div className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                                    {user.email}
                                </div>
                            </div>
                            {/* <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                <dt className="text-sm font-medium text-gray-500">
                                    Phone number
                                </dt>
                                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                                    (123) 456-7890
                                </dd>
                            </div>
                            <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                <dt className="text-sm font-medium text-gray-500">
                                    Address
                                </dt>
                                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                                    123 Main St<br />
                                    Anytown, USA 12345
                                </dd>
                            </div> */}
                        </div>
                    </div>
                </div>

                <div className="mx-10">
                    <ChangePasswordModal />
                </div>
            </div>
        </>

    )
}

export default AccountSettings