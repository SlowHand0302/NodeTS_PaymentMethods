import mongoose, { Schema, Types } from 'mongoose';

interface IPayment {
    orderId: Types.ObjectId;
    amount: number;
    currency: string;
    status: string;
    paymentMethod: string;
    provider?: string;
    transactionId?: string;
    metadata?: string;
}

const Payments = new Schema<IPayment>({
    orderId: { type: Schema.Types.ObjectId, ref: 'Orders', required: true },
    amount: { type: Number, required: true },
    currency: { type: String, required: true },
    paymentMethod: { type: String, required: true, enum: ['cash', 'stripe'] },
    status: { type: String, enum: ['pending', 'failed', 'succeed'] },
    provider: { type: String, enum: ['stripe'] },
    transactionId: { type: String },
    metadata: { type: String },
});

const PaymentModel = mongoose.model<IPayment>('Payments', Payments);

export { IPayment, PaymentModel };
