import PaymentRepo from '../repositories/Payment.repository';
import { Payment } from '../entities/Payment.entity';
import { Types } from 'mongoose';
import { PaymentModel } from '../models/Payment.model';

class PaymentService implements PaymentRepo {
    async create(payment: Omit<Payment, '_id'>): Promise<Payment> {
        const newPayment = new PaymentModel(payment);
        await newPayment.save();
        return newPayment.toObject();
    }
    async findAll(): Promise<Payment[]> {
        return await PaymentModel.find().lean();
    }
    async findById(paymentId: Types.ObjectId): Promise<Payment | null> {
        return await PaymentModel.findById(paymentId).lean();
    }
    async findByOrder(orderId: Types.ObjectId): Promise<Payment | null> {
        return await PaymentModel.findOne({ orderId }).lean();
    }
    async findByTransactionId(transactionId: string): Promise<Payment | null> {
        return await PaymentModel.findOne({ transactionId }).lean();
    }
    async update(payment: Partial<Payment>): Promise<Payment | null> {
        const updatedOrder = await PaymentModel.findByIdAndUpdate(
            payment._id,
            { ...payment },
            { returnOriginal: false },
        ).lean();
        return updatedOrder;
    }
}

export default PaymentService;
