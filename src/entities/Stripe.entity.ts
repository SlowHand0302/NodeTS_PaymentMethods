import { Types } from 'mongoose';

export type StripePaymentIntent = {
    orderId: Types.ObjectId;
    amount: number;
    currency: string;
    paymentMethod: string[];
    metadata: string;
    shipping?: string;
    receiptEmail?: string;
};

export type StripeCheckoutSession = {};
