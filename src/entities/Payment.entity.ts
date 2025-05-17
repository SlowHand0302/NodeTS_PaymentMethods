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
    metadata?: string;
};

// models/Order.ts
// export interface Order {
//     orderId: string;
//     customerId: string;
//     items: { productId: string; quantity: number; price: number }[];
//     totalAmount: number;
//     status: 'pending' | 'confirmed' | 'canceled' | 'shipped' | 'completed';
//     createdAt: Date;
//     updatedAt: Date;
// }

// models/Payment.ts
// export interface Payment {
//     paymentId: string;
//     orderId: string;
//     amount: number;
//     currency: string;
//     paymentMethod: string;
//     status: 'pending' | 'succeeded' | 'failed' | 'refunded';
//     createdAt: Date;
//     updatedAt: Date;
//     transactionId?: string;
// }
