import { Product } from '../entities/Product.entity';
import { Types } from 'mongoose';

export default interface ProductRepo {
    findAll(): Promise<Product[]>;
    findById(_id: Types.ObjectId): Promise<Product | null>;
    findByName(name: string): Promise<Product[]>;
    create(product: Omit<Product, '_id'>): Promise<Product>;
    update(product: Partial<Product>): Promise<Product>;
}
