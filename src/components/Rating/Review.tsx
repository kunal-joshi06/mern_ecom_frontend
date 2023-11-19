import { Fragment, useRef, useState } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { useAppDispatch } from '@/store/hooks'
import StarRating from './StarRating'
import { Card, CardHeader, CardContent, CardDescription, CardTitle, CardFooter } from '../ui/card'
import { Button } from '../ui/button'
import { Textarea } from '../ui/textarea'
import toast, { Toaster } from 'react-hot-toast'
import { productReviewAsync } from '@/store/features/rating/reviewSlice'

const Review = ({ pId='' , name=''}) => {
    const dispatch = useAppDispatch();
    // const authToken = useAppSelector((state) => state.auth.user.token)
    const [rating, setRating] = useState(1);
    const [comment, setComment] = useState("");


    const onSubmit = () => {
        if (comment == '') {
            toast.error('please add comments');
        }
        else{
            let data = {
                rating: rating,
                comment: comment,
                _id: pId
            }
            console.log(data)
            dispatch(productReviewAsync())
        }
        handleClose()
    };

    const [open, setOpen] = useState(false);

    const cancelButtonRef = useRef(null);

    const handleModal = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false)
    }

    return (
        <>
            <Button variant={'secondary'} onClick={handleModal}>Review</Button>
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
                                                    Review
                                                </Dialog.Title>
                                                <div className="w-full max-w-lg mt-4">
                                                    <Card>
                                                        <CardHeader className="space-y-1">
                                                            <CardTitle className="text-xl">{name}</CardTitle>
                                                            <CardDescription>
                                                                Tell us how you like the product !
                                                            </CardDescription>
                                                        </CardHeader>
                                                        <CardContent className="grid gap-6">
                                                            <StarRating rating={rating} setRating={setRating} />
                                                            <div className="grid gap-2">
                                                                <Textarea
                                                                    placeholder="comments"
                                                                    className="resize-none"
                                                                    value={comment}
                                                                    maxLength={500}
                                                                    onChange={(e)=>setComment(e.currentTarget.value)}
                                                                />
                                                            </div>
                                                        </CardContent>
                                                        <CardFooter>
                                                            <Button className="w-full cta" onClick={()=>onSubmit()}>Submit</Button>
                                                        </CardFooter>
                                                    </Card>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </div>
                </Dialog>
            </Transition.Root>
            <Toaster  position="top-center" />
        </>

    )
}


export default Review;