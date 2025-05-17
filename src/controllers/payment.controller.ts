import { RequestHandler } from 'express';
import { Payment, PaymentProvider, PaymentState } from '../entities/Payment.entity';
import PaymentService from '../services/Payment.services';
import { Types } from 'mongoose';

class PaymentController {
    static findAll: RequestHandler = async (req, res, next) => {
        const service = new PaymentService();
        try {
            const payments = await service.findAll();
            res.status(200).json({
                statusCode: 200,
                msg: 'Success',
                metadata: payments,
            });
            return;
        } catch (error) {
            console.error(error);
            next(error);
        }
    };
    static findById: RequestHandler<{ paymentId: Types.ObjectId }> = async (req, res, next) => {
        const { paymentId } = req.params;
        const service = new PaymentService();
        try {
            const payment = await service.findById(paymentId);
            if (!payment) {
                res.status(404).json({
                    statusCode: 404,
                    msg: 'Not found',
                });
                return;
            }
            res.status(200).json({
                statusCode: 200,
                msg: 'Success',
                metadata: payment,
            });
            return;
        } catch (error) {
            console.error(error);
            next(error);
        }
    };
    static findByOrder: RequestHandler<{ orderId: Types.ObjectId }> = async (req, res, next) => {
        const { orderId } = req.params;
        const service = new PaymentService();
        try {
            const payment = await service.findByOrder(orderId);
            if (!payment) {
                res.status(404).json({
                    statusCode: 404,
                    msg: 'Not found',
                });
                return;
            }
            res.status(200).json({
                statusCode: 200,
                msg: 'Success',
                metadata: payment,
            });
            return;
        } catch (error) {
            console.error(error);
            next(error);
        }
    };
    static create: RequestHandler = async (req, res, next) => {
        const payment = <Omit<Payment, '_id'>>req.body;
        const service = new PaymentService();
        try {
            const createdPayment = await service.create(payment);
            if (createdPayment) {
                res.status(200).json({
                    statusCode: 200,
                    msg: 'Success',
                    metadata: createdPayment,
                });
                return;
            }
        } catch (error) {
            console.error(error);
            next(error);
        }
    };
    static update: RequestHandler = async (req, res, next) => {
        const payment = <Partial<Payment>>req.body;
        const service = new PaymentService();
        try {
            const updatedPayment = await service.update(payment);
            res.status(200).json({
                statusCode: 200,
                msg: 'Success',
                metadata: updatedPayment,
            });
            return;
        } catch (error) {
            console.error(error);
            next(error);
        }
    };
}

export default PaymentController;
