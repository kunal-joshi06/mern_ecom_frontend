import { Fragment, useRef, useState } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { useForm, SubmitHandler } from "react-hook-form"
import { EyeIcon } from '@heroicons/react/24/outline'
import { EyeOffIcon } from 'lucide-react'
import { useAppDispatch } from '@/store/hooks'
import { updatePasswordAsync } from '@/store/features/user/userSlice'

const ChangePasswordModal = () => {
    const dispatch = useAppDispatch();

    type Inputs = {
        oldPassword: string;
        newPassword: string;
        confirmPassword: string;
    };

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<Inputs>();

    const onSubmit: SubmitHandler<Inputs> = (data) => {
        dispatch(updatePasswordAsync(data))
        handleClose()
    };

    const [open, setOpen] = useState(false);
    const [showOldPassword, setShowOldPassword] = useState(false);
    const [showNewPassword, setShowNewPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const cancelButtonRef = useRef(null);

    const handleModal = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false)
    }

    return (
        <>
            <button onClick={handleModal}><div className="cursor-pointer relative inline-flex items-center justify-center p-4 px-6 py-3 overflow-hidden font-medium text-zinc-800 transition duration-300 ease-out border-2 border-rose-500 rounded-full shadow-md group">
                <span className="absolute inset-0 flex items-center justify-center w-full h-full text-white duration-300 -translate-x-full bg-rose-500 group-hover:translate-x-0 ease">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
                </span>
                <span className="absolute flex items-center justify-center w-full h-full text-zinc-800 transition-all duration-400 transform group-hover:translate-x-full ease">Change Password</span>
                <span className="relative invisible">Change Password</span>
            </div>
            </button>
            <Transition.Root show={open} as={Fragment}>
                <Dialog as="div" className="relative z-10" initialFocus={cancelButtonRef} onClose={setOpen}>
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
                    </Transition.Child>

                    <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
                        <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                            <Transition.Child
                                as={Fragment}
                                enter="ease-out duration-300"
                                enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                                enterTo="opacity-100 translate-y-0 sm:scale-100"
                                leave="ease-in duration-200"
                                leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                                leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                            >
                                <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                                    <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                                        <div>
                                            <div className="mt-3 text-center sm:mt-0 sm:text-left">
                                                <Dialog.Title as="h3" className="text-lg font-semibold leading-6 text-gray-900">
                                                    Change Password
                                                </Dialog.Title>
                                                <form className="w-full max-w-lg mt-4" onSubmit={handleSubmit(onSubmit)}>
                                                    <div className=" -mx-3 mb-6">
                                                        <div className="w-full px-3 mb-6">
                                                            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-name">
                                                                Old Password
                                                            </label>
                                                            <div className="relative">
                                                                <input
                                                                    {...register("oldPassword", { required: true })}
                                                                    className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                                                                    id="old-pass"
                                                                    type={showOldPassword ? 'text' : 'password'}
                                                                    placeholder="Enter Old Password"
                                                                />
                                                                <div
                                                                    className="absolute right-4 top-1/2 transform -translate-y-1/2"
                                                                    onClick={() => setShowOldPassword(!showOldPassword)}
                                                                >
                                                                    {showOldPassword ? (
                                                                        <EyeOffIcon className="h-6 w-6 text-gray-500" />
                                                                    ) : (
                                                                        <EyeIcon className="h-6 w-6 text-gray-500" />
                                                                    )}
                                                                </div>
                                                            </div>
                                                            {errors.oldPassword && <span className='text-sm text-red-600'>This field is required</span>}
                                                        </div>
                                                        <div className="w-full  px-3 mb-6">
                                                            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-category">
                                                                New Password
                                                            </label>
                                                            <div className="relative">
                                                                <input
                                                                    {...register("newPassword", { required: true })}
                                                                    className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                                                                    id="new-pass"
                                                                    type={showNewPassword ? 'text' : 'password'}
                                                                    placeholder="Enter New Password"
                                                                />
                                                                <div
                                                                    className="absolute right-4 top-1/2 transform -translate-y-1/2"
                                                                    onClick={() => setShowNewPassword(!showNewPassword)}
                                                                >
                                                                    {showNewPassword ? (
                                                                        <EyeOffIcon className="h-6 w-6 text-gray-500" />
                                                                    ) : (
                                                                        <EyeIcon className="h-6 w-6 text-gray-500" />
                                                                    )}
                                                                </div>
                                                            </div>
                                                            {errors.newPassword && <span className='text-sm text-red-600'>This field is required</span>}
                                                        </div>

                                                        <div className="w-full px-3 mb-4">
                                                            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-category">
                                                                Confirm Password
                                                            </label>
                                                            <div className="relative">
                                                                <input
                                                                    {...register("confirmPassword", { required: true })}
                                                                    className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                                                                    id="conf-pass"
                                                                    type={showConfirmPassword ? 'text' : 'password'}
                                                                    placeholder="Enter Old Password"
                                                                />
                                                                <div
                                                                    className="absolute right-4 top-1/2 transform -translate-y-1/2"
                                                                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                                                >
                                                                    {showConfirmPassword ? (
                                                                        <EyeOffIcon className="h-6 w-6 text-gray-500" />
                                                                    ) : (
                                                                        <EyeIcon className="h-6 w-6 text-gray-500" />
                                                                    )}
                                                                </div>
                                                            </div>
                                                            {errors.confirmPassword && <span className='text-sm text-red-600'>This field is required</span>}
                                                        </div>
                                                    </div>


                                                    <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                                                        <button
                                                            type="submit"
                                                            className="inline-flex w-full justify-center rounded-md cta px-5 py-2 text-sm font-semibold text-white shadow-sm sm:ml-3 sm:w-auto"
                                                        >
                                                            Save
                                                        </button>
                                                        <button
                                                            type="button"
                                                            className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                                                            onClick={() => setOpen(false)}
                                                            ref={cancelButtonRef}
                                                        >
                                                            Cancel
                                                        </button>
                                                    </div>
                                                </form>
                                            </div>
                                        </div>
                                    </div>

                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </div>
                </Dialog>
            </Transition.Root>
        </>

    )
}


export default ChangePasswordModal;