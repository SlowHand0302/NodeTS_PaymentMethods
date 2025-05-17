import { Types } from 'mongoose';
import { Product } from '../entities/Product.entity';
import ProductRepo from '../repositories/Product.repository';
import { ProductModel } from '../models/Product.model';

class ProductService implements ProductRepo {
    async findAll(): Promise<Product[]> {
        return await ProductModel.find().lean();
    }
    async findById(_id: Types.ObjectId): Promise<Product | null> {
        return await ProductModel.findById(_id).lean();
    }
    async findByName(name: string): Promise<Product[]> {
        return await ProductModel.find({ name: name }).limit(10).lean();
    }
    async create(product: Omit<Product, '_id'>): Promise<Product> {
        const newProduct = new ProductModel(product);
        await newProduct.save();
        return newProduct.toObject();
    }
    async update(product: Partial<Product>): Promise<Product> {
        const updatedProduct = await ProductModel.findByIdAndUpdate(
            product._id,
            { ...product },
            { returnOriginal: false },
        );
        return updatedProduct as Product;
    }
}

export default ProductService;
