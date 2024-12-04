import { Types } from 'mongoose';

export enum PaymentState {
    PENDING = 'pending',
    SUCCEED = 'succeed',
    FAILED = 'failed',
}

export enum PaymentProvider {
    CASH = 'cash',
    STRIPE = 'stripe',
}

export type Payment = {
    _id: Types.ObjectId;
    orderId: Types.ObjectId;
    amount: number;
    currency: string;
    paymentMethod: string;
    status: PaymentState;
    provider?: PaymentProvider;
    trasactionId?: string;
    metadata?: JSON;
};