import express, { Request, Response } from 'express';
import authRouters from './auth.routes';
import userRouters from './user.routes';
import productRouters from './product.routes';
import orderRouters from './order.routes';
import paymentRouters from './payment.routes';
const router = express.Router();

router.get('/', (req: Request, res: Response): any => {
    return res.status(200).json({
        msg: 'API version 1 connected',
    });
});

router.use('/auth', authRouters);
router.use('/user', userRouters);
router.use('/product', productRouters);
router.use('/order', orderRouters);
router.use('/payment', paymentRouters);

export default router;
