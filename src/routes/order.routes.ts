import express from 'express';
import OrderController from '../controllers/order.controller';

const routers = express.Router();

routers.get('/read', OrderController.getAllOrder);
routers.get('/read/details', OrderController.getAllOrderDetail);
routers.get('/read/:orderId', OrderController.getOrder);
routers.get('/read/user/:userId', OrderController.getOrderByUser);
routers.get('/read/payment/:paymentId', OrderController.getOrderByPayment);
routers.post('/create', OrderController.create);
routers.put('/update', OrderController.updateOrder);

routers.get('/read/:orderId/detail', OrderController.getDetailsByOrder);

export default routers;
