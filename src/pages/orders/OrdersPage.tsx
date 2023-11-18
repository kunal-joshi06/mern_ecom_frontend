import { getLoggedInUserOrdersAsync } from "@/store/features/orders/orderSlice";
import BreadCrumb from "@/components/ProductDetails/BreadCrumb"
import { useAppDispatch, useAppSelector } from "@/store/hooks"
import { useEffect } from "react";
import { ScrollArea } from "@radix-ui/react-scroll-area";
import { Button } from "@/components/ui/button";
import { Link, useNavigate } from "react-router-dom";
import { Card, CardFooter, CardHeader, } from '@/components/ui/card';
import {currency} from '../../components/currency'


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
                    <div className="grid gap-4 lg:grid-cols-2 2xl:grid-cols-3">
                        {orders.map((order) => (
                            order.orderItems.map((item) => (
                                <Card key={item._id}>
                                    <CardHeader className="flex flex-col lg:flex-row justify-between items-center">
                                        <div className="w-full lg:h-32 lg:w-32 flex-shrink-0 overflow-hidden rounded-md  lg:mr-6">
                                            {item.imageUrl && <img
                                                src={item.imageUrl}
                                                alt="alt-image"
                                                className="h-full w-full object-contain object-center"
                                            />}
                                        </div>
                                        <div className="flex w-full lg:w-auto flex-col text-xs lg:text-sm lg:space-y-2 items-end">
                                            <p className="font-bold text-xl mb-2">{item.name}</p>
                                            <p>Placed on: {showDate(order.createdAt)}</p>
                                            <p>status: {order.orderStatus}</p>
                                            <p> Payment : {order.paymentInfo.status}</p>
                                        </div>
                                    </CardHeader>
                                    <CardFooter className=" flex flex-col lg:flex-row justify-between items-end">
                                        <p className="font-medium mb-4 lg:mb-0">Total: {currency((item.price))}</p>
                                        <div className="space-x-4 w-full lg:w-auto flex justify-between lg:justify-end">
                                        <Button className="px-6" variant={"secondary"}>
                                            Rate
                                        </Button>
                                        <Button className="cta">
                                            <Link to={order._id}>Details</Link>
                                        </Button>
                                        </div>
                                    </CardFooter>
                                </Card>
                            ))
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