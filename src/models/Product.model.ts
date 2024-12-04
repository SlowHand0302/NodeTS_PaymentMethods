import mongoose from 'mongoose';

const Schema = mongoose.Schema;

interface IProduct extends Document {
    name: string;
    originalPrice: number;
    sellPrice: number;
}

const Products = new Schema<IProduct>({
    name: { type: String, required: true },
    originalPrice: { type: Number, required: true },
    sellPrice: { type: Number, required: true },
});

const ProductModel = mongoose.model<IProduct>('Products', Products);

export { ProductModel, IProduct };
