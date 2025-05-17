import { Types } from 'mongoose';

export enum OrderState {
    PENDING = 'pending',
    SUCCEED = 'succeed',
    CANCELED = 'canceled',
}

export type Order = {
    _id: Types.ObjectId;
    userId: Types.ObjectId;
    paymentId?: Types.ObjectId;
    totalAmount: number;
    status: OrderState;
    shipping?: string;
    metadata?: string;
};

export type OrderDetail = {
    orderId: Types.ObjectId;
    productId: Types.ObjectId;
    quantity: number;
    price: number;
};  
