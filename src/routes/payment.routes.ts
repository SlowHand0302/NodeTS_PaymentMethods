import { Router } from 'express';
import PaymentController from '../controllers/payment.controller';
import StripeControllers from '../controllers/stripe.controller';

const routers = Router();

routers.get('/read', PaymentController.findAll);
routers.get('/read/:paymentId', PaymentController.findById);
routers.get('/read/order/:orderId', PaymentController.findByOrder);
routers.post('/create', PaymentController.create);
routers.put('/update', PaymentController.update);

routers.post('/stripe/createIntent', StripeControllers.CreatePaymentIntent);
routers.get('/stripe/complete/:paymentId', StripeControllers.CompletePayment);

export default routers;
