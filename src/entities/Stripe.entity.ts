import { Types } from 'mongoose';

export type StripePaymentIntent = {
    orderId: Types.ObjectId;
    amount: number;
    currency: string;
    paymentMethod: string[];
    metadata: JSON;
    shipping?: JSON;
    receiptEmail?: string;
};

export type StripeCheckoutSession = {};
