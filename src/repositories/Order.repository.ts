import { Order, OrderDetail } from '../entities/Order.entity';
import { Types } from 'mongoose';

export interface OrderRepo {
    findAll(): Promise<Order[]>;
    findById(_id: Types.ObjectId): Promise<Order | null>;
    findByUser(userId: Types.ObjectId): Promise<Order[]>;
    findByPayment(paymentId: Types.ObjectId): Promise<Order | null>;
    create(order: Omit<Order, '_id'>): Promise<Order>;
    update(order: Pick<Order, '_id'>, status: string): Promise<Order>;
}

export interface OrderDetailRepo {
    findAll(): Promise<OrderDetail[]>;
    findByOrderId(orderId: Types.ObjectId): Promise<OrderDetail[]>;
    findByProductId(productId: Types.ObjectId): Promise<OrderDetail[]>;
    createMany(items: OrderDetail[]): Promise<OrderDetail[]>;
}
