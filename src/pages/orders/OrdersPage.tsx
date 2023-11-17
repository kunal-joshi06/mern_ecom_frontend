import { getLoggedInUserOrdersAsync } from "@/store/features/orders/orderSlice";
import BreadCrumb from "@/components/ProductDetails/BreadCrumb"
import { useAppDispatch, useAppSelector } from "@/store/hooks"
import { useEffect } from "react";
import { ScrollArea } from "@radix-ui/react-scroll-area";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { Link, useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, } from '@/components/ui/card';
import { v4 as uuidv4 } from 'uuid';


function OrdersPage() {
    const dispatch = useAppDispatch();
    const authToken = useAppSelector((state) => state.auth.user.token)
    const navigate = useNavigate();
    const orders = useAppSelector(state => state.orders.orders);
    const uniqueID = uuidv4();
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

                                <Card key={uniqueID}>
                                    <CardHeader className="text-sm flex lg:hidden justify-between">
                                        <Link className="text-rose-500" to={order._id}>#{item._id}</Link>
                                    </CardHeader>
                                    <CardHeader className="text-sm text-gray-600 lg:flex flex-row items-center justify-between hidden">
                                        <Link className="text-blue-500" to={order._id}>#{item._id}</Link>
                                        <p>Placed on: {showDate(order.createdAt)}</p>
                                    </CardHeader>
                                    <Separator></Separator>
                                    <CardContent className="flex flex-row justify-between items-center mt-4">
                                        <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md  lg:mr-6">
                                            {item.imageUrl && <img
                                                src={item.imageUrl}
                                                alt="alt-image"
                                                className="h-full w-full object-contain object-center"
                                            />}
                                        </div>
                                        <div className="flex flex-col text-xs lg:text-sm lg:space-y-2 items-end">
                                            <p className="font-bold text-base lg:text-lg">{item.name}</p>
                                            <p className="lg:hidden">Placed on: {showDate(order.createdAt)}</p>
                                            <p>status: {order.orderStatus}</p>
                                            <p>Total: {item.price}</p>
                                        </div>
                                    </CardContent>
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