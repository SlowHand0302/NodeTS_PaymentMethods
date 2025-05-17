import { Types } from 'mongoose';
import { Order, OrderDetail } from '../entities/Order.entity';
import { OrderRepo, OrderDetailRepo } from '../repositories/Order.repository';
import { OrderModel, OrderDetailModel } from '../models/Order.model';

class OrderService implements OrderRepo {
    async findAll(): Promise<Order[]> {
        return await OrderModel.find().lean();
    }
    async findById(_id: Types.ObjectId): Promise<Order | null> {
        return await OrderModel.findById(_id).lean();
    }
    async findByUser(userId: Types.ObjectId): Promise<Order[]> {
        return await OrderModel.find({ userId }).lean();
    }
    async findByPayment(paymentId: Types.ObjectId): Promise<Order | null> {
        return await OrderModel.findOne({ paymentId }).lean();
    }
    async create(order: Omit<Order, '_id'>): Promise<Order> {
        const newOrder = new OrderModel(order);
        await newOrder.save();
        return newOrder.toObject() as Order;
    }
    async update(order: Pick<Order, '_id'>, status: string): Promise<Order> {
        const updatedOrder = await OrderModel.findByIdAndUpdate(order, { status }, { returnOriginal: false });
        return updatedOrder as Order;
    }
}

class OrderDetailService implements OrderDetailRepo {
    async findAll(): Promise<OrderDetail[]> {
        return await OrderDetailModel.find().lean();
    }
    async findByOrderId(orderId: Types.ObjectId): Promise<OrderDetail[]> {
        return await OrderDetailModel.find({ orderId }).lean();
    }
    async createMany(items: OrderDetail[]): Promise<OrderDetail[]> {
        return await OrderDetailModel.insertMany(items);
    }
    async findByProductId(productId: Types.ObjectId): Promise<OrderDetail[]> {
        return await OrderDetailModel.find({ productId }).lean();
    }
}

export { OrderService, OrderDetailService };
