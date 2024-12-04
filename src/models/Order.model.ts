import mongoose, { Types, Schema } from 'mongoose';

interface IOrder extends Document {
    userId: Types.ObjectId;
    paymentId?: Types.ObjectId;
    totalAmount: number;
    status: string;
    shipping?: string;
    metadata?: string;
}

interface IOrderDetail extends Document {
    orderId: Types.ObjectId;
    productId: Types.ObjectId;
    quantity: number;
    price: number;
}

const OrderDetails = new Schema<IOrderDetail>({
    orderId: { type: Schema.Types.ObjectId, ref: 'Orders', required: true },
    productId: { type: Schema.Types.ObjectId, ref: 'Products', required: true },
    quantity: { type: Number, required: true, min: 1 },
    price: { type: Number, required: true },
});

const Orders = new Schema<IOrder>(
    {
        userId: { type: Schema.Types.ObjectId, ref: 'Users', required: true },
        paymentId: { type: Schema.Types.ObjectId, ref: 'Payments' },
        totalAmount: { type: Number, required: true },
        status: { type: String, enum: ['pending', 'succeed', 'canceled'], default: 'pending', required: true },
        shipping: { type: String },
        metadata: { type: String },
    },
    {
        timestamps: true,
    },
);

const OrderModel = mongoose.model<IOrder>('Orders', Orders);
const OrderDetailModel = mongoose.model<IOrderDetail>('OrderDetails', OrderDetails);

export { IOrder, IOrderDetail, OrderModel, OrderDetailModel };
