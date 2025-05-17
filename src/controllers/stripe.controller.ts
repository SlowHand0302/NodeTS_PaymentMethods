import Stripe from 'stripe';
import dotenv from 'dotenv';
import { RequestHandler } from 'express';
import PaymentService from '../services/Payment.services';
import { OrderService } from '../services/Order.services';
import { PaymentProvider, PaymentState } from '../entities/Payment.entity';
import { Types } from 'mongoose';
dotenv.config();

export type PaymentIntent = {
    amount: number;
    currency: string;
    description: string;
};

const stripe = new Stripe(process.env.STRIPE_SECRETKEY as string);

class StripeControllers {
    static GetPublicKey: RequestHandler = async (req, res, next) => {
        if (process.env.STRIPE_PUBLICKEY) {
            res.status(200).json({
                statusCode: 200,
                publicKey: process.env.STRIPE_PUBLICKEY,
            });
        }
        next();
    };

    static CreatePaymentIntent: RequestHandler = async (req, res, next) => {
        const { amount, currency, description } = <PaymentIntent>req.body;
        try {
            const paymentIntent = await stripe.paymentIntents.create({
                amount: amount,
                currency: currency,
                payment_method_types: ['card'],
                description: description,
            });
            if (paymentIntent) {
                res.status(200).json({
                    statusCode: 200,
                    clientSecret: paymentIntent.client_secret,
                });
                return;
            }
        } catch (error) {
            console.error(error);
            next(error);
        }
    };

    static CompletePayment: RequestHandler = async (req, res, next) => {
        const { paymentId } = req.params;
        const paymentService = new PaymentService();
        const orderService = new OrderService();
        try {
            const paymentIntent = await stripe.paymentIntents.retrieve(paymentId);
            if (paymentIntent) {
                const transactionId = paymentIntent.id;
                const transactionStatus = paymentIntent.status;
                const transactionAmount = paymentIntent.amount;
                const transactionCurrency = paymentIntent.currency;
                const orderId = paymentIntent.description?.split(' ')[1];
                if (orderId && transactionStatus === 'succeeded') {
                    const createdPayment = await paymentService.create({
                        orderId: new Types.ObjectId(orderId),
                        amount: transactionAmount,
                        currency: transactionCurrency,
                        provider: PaymentProvider.STRIPE,
                        paymentMethod: 'card',
                        status: PaymentState.SUCCEED,
                        trasactionId: transactionId,
                    });
                    const updatedOrder = await orderService.update(new Types.ObjectId(orderId), transactionStatus);
                    res.status(200).json({
                        statusCode: 200,
                        msg: 'Payment completed',
                    });
                    return;
                }
            }
        } catch (error) {
            next(error);
        }
    };
}

export default StripeControllers;
