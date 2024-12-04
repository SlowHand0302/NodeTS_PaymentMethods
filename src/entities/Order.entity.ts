import { Types } from 'mongoose';

export enum OrderState {
    PENDING = 'pending',
    SUCCEED = 'succeed',
    CANCELED = 'canceled',
}

export type Order = {
    _id: Types.ObjectId;
    userId: Types.ObjectId;
    paymentId: Types.ObjectId;
    items: OrderDetail[];
    totalAmount: number;
    status: OrderState;
    shipping?: string;
    metadata?: JSON;
};

export type OrderDetail = {
    productId: Types.ObjectId;
    quantity: number;
    price: number;
};
