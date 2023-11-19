export type OrderType = {
  _id: string;
  shippingInfo: {
    address: string;
    city: string;
    country: string;
    pinCode: number | string;
    phoneNo: number | string;
  };
  paymentInfo: {
    id: string;
    status: string;
    paidAt: string;
    totalPrice: string | number;
  };
  orderItems: Array<
    {
      name: string;
      quantity: number;
      price: number;
      imageUrl: string;
      _id: string
    }>;
  user: string;
  orderStatus: string;
  createdAt: string;
  __v: number
};

export type SingleOrder = {
    shippingInfo: {
      address: string;
      city: string;
      country: string;
      pinCode: number;
      phoneNo: number;
    };
    paymentInfo: {
      id: string;
      status: string;
      paidAt: string;
      totalPrice: number;
    };
    _id: string;
    orderItems: {
      name: string;
      quantity: number;
      price: number;
      imageUrl: string;
      _id: string;
    }[];
    user: {
      _id: string;
      name: string;
      email: string;
    };
    orderStatus: string;
    createdAt: string;
    __v: number;
};