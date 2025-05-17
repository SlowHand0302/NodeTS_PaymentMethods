import mongoose, { Schema, Types } from 'mongoose';
import { PaymentProvider, PaymentState } from '../entities/Payment.entity';

interface IPayment {
    orderId: Types.ObjectId;
    amount: number;
    currency: string;
    status: PaymentState;
    paymentMethod: string;
    provider?: PaymentProvider;
    transactionId?: string;
    metadata?: string;
}

const Payments = new Schema<IPayment>({
    orderId: { type: Schema.Types.ObjectId, ref: 'Orders', required: true },
    amount: { type: Number, required: true },
    currency: { type: String, required: true },
    paymentMethod: { type: String, required: true, enum: ['cash', 'card'] },
    status: { type: String, enum: PaymentState, default: PaymentState.PENDING, required: true },
    provider: { type: String, enum: PaymentProvider },
    transactionId: { type: String, unique: true },
    metadata: { type: String },
});

const PaymentModel = mongoose.model<IPayment>('Payments', Payments);

export { IPayment, PaymentModel };
