import { getSingleOrderAsync } from "@/store/features/orders/orderSlice";
import { useAppDispatch, useAppSelector } from "@/store/hooks"
import { useEffect } from "react";
import { useParams } from "react-router-dom"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';

function OrderDetail() {
  const { oId } = useParams();
  const dispatch = useAppDispatch();
  const authToken = useAppSelector((state) => state.auth.user.token)
  const currentOrder = useAppSelector((state) => state.orders.currentOrder);
  useEffect(() => {
    if (oId) {
      dispatch(getSingleOrderAsync({ id: oId, token: authToken! }))
    }
  }, [authToken, dispatch, oId])

  return (
    <section className="text-gray-700 body-font overflow-hidden bg-white h-auto">
      <div className="p-8 space-y-4">
        <Card>
          <CardHeader>
            <CardTitle>{currentOrder?.user?.name}</CardTitle>
            <CardDescription>{currentOrder?.user?.email}</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col">
            <p className="font-semibold">Order</p>
            {currentOrder?.orderItems?.map((item, index) => (
              <div key={index}>
                <p>{item.name}x({item.quantity})</p>
              </div>
            ))
            }
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Shipping information</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col">
            <p>Status: {currentOrder?.paymentInfo?.status}</p>
            <p>Date: {currentOrder?.paymentInfo?.paidAt}</p>
            <p>Total: {currentOrder?.paymentInfo?.totalPrice}</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Shipping information</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col">
            <p>Address: {currentOrder?.shippingInfo?.address}</p>
            <p>City: {currentOrder?.shippingInfo?.city}</p>
            <p>Country: {currentOrder?.shippingInfo?.country}</p>
            <p>Pincode: {currentOrder?.shippingInfo?.pinCode}</p>
            <p>Phone: {currentOrder?.shippingInfo?.phoneNo}</p>
          </CardContent>
        </Card>
      </div>

    </section>
  )
}

export default OrderDetail