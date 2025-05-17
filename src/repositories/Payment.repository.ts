import { Types } from 'mongoose';
import { Payment } from '../entities/Payment.entity';

export default interface PaymentRepo {
    create(payment: Omit<Payment, '_id'>): Promise<Payment>;
    findAll(): Promise<Payment[]>;
    findById(paymentId: Types.ObjectId): Promise<Payment | null>;
    findByOrder(orderId: Types.ObjectId): Promise<Payment | null>;
    findByTransactionId(transactionId: string): Promise<Payment | null>
    update(payment: Partial<Payment>): Promise<Payment | null>;
}
