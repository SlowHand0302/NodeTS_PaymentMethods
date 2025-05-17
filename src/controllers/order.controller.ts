import { RequestHandler } from 'express';
import { Types } from 'mongoose';
import { OrderService, OrderDetailService } from '../services/Order.services';
import { Order, OrderDetail } from '../entities/Order.entity';

class OrderController {
    static create: RequestHandler = async (req, res, next) => {
        const { items, ...order } = req.body;
        const orderService = new OrderService();
        const orderDetailService = new OrderDetailService();
        console.log(req.body);
        try {
            const createdOrder = await orderService.create(order);
            if (createdOrder) {
                const orderDetail = items.map((item: Omit<OrderDetail, 'orderId'>[]) => ({
                    ...item,
                    orderId: createdOrder._id,
                }));
                const result = await orderDetailService.createMany(orderDetail);
                res.status(200).json({
                    statusCode: 200,
                    msg: 'Create Success',
                    metadata: { ...createdOrder, items: result },
                });
                return;
            }
        } catch (error) {
            console.error(error);
            next(error);
        }
    };

    static getAllOrder: RequestHandler = async (req, res, next) => {
        const orderService = new OrderService();
        try {
            const orders = await orderService.findAll();
            res.status(200).json({
                statusCode: 200,
                msg: 'Get All Success',
                metadata: orders,
            });
            return;
        } catch (error) {
            console.error(error);
            next(error);
        }
    };

    static getOrder: RequestHandler<{ orderId: Types.ObjectId }> = async (req, res, next) => {
        const { orderId } = req.params;
        const service = new OrderService();
        try {
            const order = await service.findById(orderId);
            if (!order) {
                res.status(404).json({
                    statusbar: 404,
                    msg: 'Not found',
                });
                return;
            }
            res.status(200).json({
                statusCode: 200,
                msg: 'Success',
                metadata: order,
            });
            return;
        } catch (error) {
            console.error(error);
            next(error);
        }
    };

    static getOrderByUser: RequestHandler<{ userId: Types.ObjectId }> = async (req, res, next) => {
        const { userId } = req.params;
        const service = new OrderService();
        try {
            const orders = await service.findByUser(userId);
            res.status(200).json({
                statusCode: 200,
                msg: 'Success',
                metadata: orders,
            });
            return;
        } catch (error) {
            console.error(error);
            next(error);
        }
    };

    static getOrderByPayment: RequestHandler<{ paymentId: Types.ObjectId }> = async (req, res, next) => {
        const { paymentId } = req.params;
        const service = new OrderService();
        try {
            const orders = await service.findByPayment(paymentId);
            res.status(200).json({
                statusCode: 200,
                msg: 'Success',
                metadata: orders,
            });
            return;
        } catch (error) {
            console.error(error);
            next(error);
        }
    };

    static updateOrder: RequestHandler = async (req, res, next) => {
        const { orderId, status }: { orderId: Types.ObjectId; status: string } = req.body;
        const service = new OrderService();
        try {
            const updatedOrder = await service.update(orderId, status);
            console.log(updatedOrder)
            res.status(200).json({
                statusCode: 200,
                msg: 'Success',
                metadata: updatedOrder,
            });
            return;
        } catch (error) {
            console.error(error);
            next(error);
        }
    };

    static getAllOrderDetail: RequestHandler = async (req, res, next) => {
        const service = new OrderDetailService();
        try {
            const details = await service.findAll();
            res.status(200).json({
                statusCode: 200,
                msg: 'Success',
                metadata: details,
            });
            return;
        } catch (error) {
            console.error(error);
            next(error);
        }
    };

    static getDetailsByOrder: RequestHandler<{ orderId: Types.ObjectId }> = async (req, res, next) => {
        const { orderId } = req.params;
        const service = new OrderDetailService();
        try {
            const details = await service.findByOrderId(orderId);
            res.status(200).json({
                statusCode: 200,
                msg: 'Success',
                metadata: details,
            });
            return;
        } catch (error) {
            console.error(error);
            next(error);
        }
    };
}

export default OrderController;
