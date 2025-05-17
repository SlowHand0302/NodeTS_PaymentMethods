import mongoose from 'mongoose';

const Schema = mongoose.Schema;

interface IProduct extends Document {
    name: string;
    originalPrice: number;
    sellPrice: number;
    variants: [IVariants];
}

interface IVariants extends Document {
    attribute: string;
    values: string | string[];
}

const Variants = new Schema<IVariants>({
    attribute: { type: String, required: true },
    values: { type: Schema.Types.Mixed, required: true },
});

const Products = new Schema<IProduct>(
    {
        name: { type: String, required: true },
        originalPrice: { type: Number, required: true },
        sellPrice: { type: Number, required: true },
        variants: { type: [Variants] }, // Array of Variants
    },
    {
        timestamps: true,
    },
);

const ProductModel = mongoose.model<IProduct>('Products', Products);

export { ProductModel, IProduct };
