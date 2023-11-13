export type OrderType = {
     _id: string;
      shippingInfo: {
        address: string;
        city: string;
        country: string;
        pinCode: number|string;
        phoneNo: number|string;
      };
      paymentInfo: {
        id: string;
        status: string;
        paidAt: string;
        totalPrice: string|number;
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