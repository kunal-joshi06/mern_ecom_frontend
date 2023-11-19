import { getLoggedInUserOrdersAsync } from "@/store/features/orders/orderSlice";
import BreadCrumb from "@/components/ProductDetails/BreadCrumb"
import { useAppDispatch, useAppSelector } from "@/store/hooks"
import { useEffect } from "react";
import { ScrollArea } from "@radix-ui/react-scroll-area";
import { Button } from "@/components/ui/button";
import { Link, useNavigate } from "react-router-dom";
import { Card, CardContent, CardFooter, CardHeader, } from '@/components/ui/card';
import { currency } from '../../components/currency'
import { Separator } from "@/components/ui/separator";
import Review from '../../components/Rating/Review';


function OrdersPage() {
    const dispatch = useAppDispatch();
    const authToken = useAppSelector((state) => state.auth.user.token)
    const navigate = useNavigate();
    const orders = useAppSelector(state => state.orders.orders);
    useEffect(() => {
        dispatch(getLoggedInUserOrdersAsync(authToken!));
    }, [authToken, dispatch]);
    function showDate(orderDate: string) {
        const d = new Date(orderDate);
        return d.toLocaleDateString('en-GB'); // dd/mm/yyyy
    }
    return (
        <div className="min:h-screen">
            <div className="w-full">
                <BreadCrumb currentPage="My Orders" />
            </div>

            <ScrollArea className="h-screen no-scrollbar overflow-auto p-10">
                {orders.length > 0 ?
                    <div className="grid gap-4 2xl:grid-cols-2">
                        {orders.map((order) => (
                            <Card key={order._id}>
                                <CardHeader className="flex flex-row justify-between items-center text-sm py-4">
                                    <p>Placed on: {showDate(order.createdAt)}</p>
                                    <p>status: {order.orderStatus}</p>
                                </CardHeader>
                                <Separator></Separator>
                                <CardContent className="px-6 py-0 mt-4">
                                    {order.orderItems.map((item) => (
                                        <div className="flex flex-col space-y-4 lg:space-y-0 lg:flex-row w-full items-center justify-between p-4 text-xs lg:text-sm xl:text-base" >
                                            <div className="h-36 w-36 lg:h-16 lg:w-16 flex-shrink-0 overflow-hidden rounded-md">
                                                {item.imageUrl && <img
                                                    src={item.imageUrl}
                                                    alt="alt-image"
                                                    className="h-full w-full object-contain object-center"
                                                />}
                                            </div>
                                            <p className="font-medium">{item.name}(x{item.quantity})</p>
                                            <p className="font-medium hidden lg:block">{currency((item.price))}</p>
                                            {/* <Button variant={"secondary"} className="px-6">
                                                Review
                                            </Button> */}
                                            <Review pId={item._id} name={item.name} />
                                        </div>
                                    ))}
                                </CardContent>
                                <Separator/>
                                <CardFooter className="flex flex-col lg:flex-row justify-between items-center px-10 mt-6">
                                        <p className="hidden lg:block text-center font-bold cta-text">#{order._id}</p>
                                        <Button className="cta">
                                            <Link to={order._id}>Order details</Link>
                                        </Button>
                                </CardFooter>
                            </Card>
                        ))
                        }
                    </div>
                    :
                    <div className="flex items-center flex-col justify-between space-y-4">
                        <h1 className="text-xl font-semibold">You have placed no orders</h1>
                        <Button className="cta" onClick={() => navigate("/products")}>Continue Shopping</Button>
                    </div>
                }
            </ScrollArea>
        </div>
    )
}

export default OrdersPage