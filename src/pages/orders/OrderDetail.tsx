import { getSingleOrderAsync } from "@/store/features/orders/orderSlice";
import { useAppDispatch, useAppSelector } from "@/store/hooks"
import { useEffect } from "react";
import { useParams } from "react-router-dom"

function OrderDetail() {
  const { oId } = useParams();
  const dispatch = useAppDispatch();
  const authToken = useAppSelector((state) => state.auth.user.token)
  // const currentOrder = useAppSelector(state => state.orders.currentOrder);

  useEffect(() => {
    if (oId) {
      dispatch(getSingleOrderAsync({ id: oId, token: authToken! }))
    }
  }, [authToken, dispatch, oId])
  return (
    <div>OrderDetail</div>
  )
}

export default OrderDetail