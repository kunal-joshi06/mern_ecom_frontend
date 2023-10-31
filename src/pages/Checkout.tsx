import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { useNavigate } from "react-router-dom";
import * as z from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ScrollArea } from "@/components/ui/scroll-area"
import { useAppDispatch, useAppSelector } from "@/store/hooks"
import { loadStripe } from "@stripe/stripe-js"
import { createCheckout } from "@/store/features/cart/cartApi"
import { ArrowLeftCircle } from "lucide-react"
import { saveShippingInfo } from "@/store/features/user/userSlice";


export default function Checkout() {

    const dispatch = useAppDispatch();
    const products = useAppSelector(state => state.cart.cartItems);
    const cartTotal = useAppSelector(state => state.cart.cartTotal);
    const stripeKey = import.meta.env.VITE_STRIPE_KEY;

    const handlePayment = async () => {
        const stripe = await loadStripe(stripeKey);

        try {
            const response = await createCheckout(products);
            const result = await stripe?.redirectToCheckout({
                sessionId: response.data.id,
            });

            if (result?.error) {
                console.log(result.error);
            }
        } catch (error) {
            console.error(error);
        }
    };

    const addressSchema = z.object({
        name: z.string({ required_error: "Name is required", }).min(2).max(50),
        address: z.string({ required_error: "Address is required", }).min(2),
        phone: z.string({ required_error: "Phone number is required", }).min(10).max(10),
        state: z.string({ required_error: "Please select your state", }),
        city: z.string({ required_error: "Please select your city", }),
        pincode: z.string({ required_error: "Pincode is required", }),
    })

    const addressForm = useForm<z.infer<typeof addressSchema>>({
        resolver: zodResolver(addressSchema),
    })

    function onAddressSubmit(values: z.infer<typeof addressSchema>) {
        handlePayment()
        dispatch(saveShippingInfo(values))
    }
    const navigate = useNavigate();
    const goBack = () => {
        navigate(-1);
    };

    return (
        <div className="h-screen min:w-full flex flex-col p-8 justify-between">
            <div className="flex px-4 items-center justify-between lg:justify-start">
                <Button variant={"ghost"} onClick={goBack}><ArrowLeftCircle /></Button>
                <h1 className="text-2xl font-semibold text-center lg:text-left">Checkout</h1>
            </div>
            <div className="container lg:overflow-hidden lg:h-full min:w-full flex flex-col lg:flex-row p-8 justify-between items-center">
                <Card className="h-full w-full lg:w-2/4">
                    <ScrollArea className="h-full">
                        <CardHeader>
                            <CardTitle>Shipping details</CardTitle>
                            <CardDescription>Fill your complete shipping details below</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <Form {...addressForm}>
                                <form className="space-y-8">
                                    <FormField
                                        control={addressForm.control}
                                        name="name"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Full Name</FormLabel>
                                                <FormControl>
                                                    <Input placeholder="shadcn" {...field} />
                                                </FormControl>
                                                <FormDescription>
                                                    This is your billing name.
                                                </FormDescription>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={addressForm.control}
                                        name="address"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Address</FormLabel>
                                                <FormControl>
                                                    <Textarea
                                                        placeholder="Enter your complete address"
                                                        className="resize-none"
                                                        {...field}
                                                    />
                                                </FormControl>
                                                <FormDescription>
                                                    This is your shipping address.
                                                </FormDescription>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="grid gap-2">
                                            <FormField
                                                control={addressForm.control}
                                                name="state"
                                                render={({ field }) => (
                                                    <FormItem>
                                                        <FormLabel>State</FormLabel>
                                                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                                                            <FormControl>
                                                                <SelectTrigger>
                                                                    <SelectValue placeholder="Select your state" />
                                                                </SelectTrigger>
                                                            </FormControl>
                                                            <SelectContent>
                                                                <SelectItem value="haryana">Haryana</SelectItem>
                                                                <SelectItem value="delhi">Delhi</SelectItem>
                                                                <SelectItem value="punjab">Punjab</SelectItem>
                                                            </SelectContent>
                                                        </Select>
                                                        <FormMessage />
                                                    </FormItem>
                                                )}
                                            />
                                        </div>
                                        <div className="grid gap-2">
                                            <FormField
                                                control={addressForm.control}
                                                name="city"
                                                render={({ field }) => (
                                                    <FormItem>
                                                        <FormLabel>City</FormLabel>
                                                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                                                            <FormControl>
                                                                <SelectTrigger>
                                                                    <SelectValue placeholder="Select your city" />
                                                                </SelectTrigger>
                                                            </FormControl>
                                                            <SelectContent>
                                                                <SelectItem value="gurugram">Gurugram</SelectItem>
                                                                <SelectItem value="newdelhi">New delhi</SelectItem>
                                                                <SelectItem value="Ambala">ambala</SelectItem>
                                                            </SelectContent>
                                                        </Select>
                                                        <FormMessage />
                                                    </FormItem>
                                                )}
                                            />
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="grid gap-2">
                                            <FormField
                                                control={addressForm.control}
                                                name="phone"
                                                render={({ field }) => (
                                                    <FormItem>
                                                        <FormLabel>Phone</FormLabel>
                                                        <FormControl>
                                                            <Input type="number" placeholder="98XXXXXX61" {...field}
                                                                onInput={(e) => e.currentTarget.value = e.currentTarget.value.slice(0, 10)}
                                                            />
                                                        </FormControl>
                                                        <FormMessage />
                                                    </FormItem>
                                                )}
                                            />
                                        </div>
                                        <div className="grid gap-2">
                                            <FormField
                                                control={addressForm.control}
                                                name="pincode"
                                                render={({ field }) => (
                                                    <FormItem>
                                                        <FormLabel>Pin Code</FormLabel>
                                                        <FormControl>
                                                            <Input type="number" placeholder="Pin code" {...field}
                                                                onInput={(e) => e.currentTarget.value = e.currentTarget.value.slice(0, 6)} />
                                                        </FormControl>
                                                        <FormMessage />
                                                    </FormItem>
                                                )}
                                            />
                                        </div>
                                    </div>
                                </form>
                            </Form>
                        </CardContent>
                    </ScrollArea>
                </Card>
                <div className="h-full w-full lg:w-8/12 border lg:border-0 rounded-sm p-4 mt-4 lg:mt-0 lg:px-4 grid">
                    <ScrollArea>
                        {products.map((product) => (
                            <li key={product._id} className="flex border rounded-sm p-6 mb-2 duration-300 hover:bg-gray-50">
                                <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                                    {product.imageUrl && <img
                                        src={product.imageUrl}
                                        alt="alt-image"
                                        className="h-full w-full object-cover object-center"
                                    />}
                                </div>
                                <div className="ml-4 flex flex-1 flex-col">
                                    <div>
                                        <div className="flex justify-between text-base font-medium text-gray-900">
                                            <h3>
                                                <p>{product.name}</p>
                                            </h3>
                                            <p className="ml-4 font-normal">Rs. {product.price}</p>
                                        </div>
                                        <p className="mt-1 text-sm text-gray-500">Rating : {Math.round(product.rating!)}</p>
                                    </div>
                                    <div className="flex flex-1 items-end justify-between text-sm">
                                        <p className="text-gray-500"><span className='flex'>Qty :<span className='font-bold'>{product.quantity} </span></span></p>
                                    </div>
                                </div>
                            </li>
                        ))}

                    </ScrollArea>
                </div>
            </div>
            <div className="w-full py-4 lg:py-0 lg:px-12 flex-row flex justify-between">
                <h1 className="text-xl font-normal">Total : ₹{cartTotal}</h1>
                <Button onClick={addressForm.handleSubmit(onAddressSubmit)} type="submit">Proceed Payment</Button>
            </div>
        </div>
    )
}
