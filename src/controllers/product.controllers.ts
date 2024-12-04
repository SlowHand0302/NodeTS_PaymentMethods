import { RequestHandler } from 'express';
import ProductService from '../services/Product.services';
import { Product } from '../entities/Product.entity';
import createHttpError from 'http-errors';
import { Types } from 'mongoose';

class ProductController {
    static getAllProduct: RequestHandler = async (req, res, next) => {
        const service = new ProductService();
        try {
            const products = await service.findAll();
            res.status(200).json({
                statusCode: 200,
                msg: 'Get all Product Success',
                metadata: [...products],
            });
            return;
        } catch (error) {
            next(error);
            throw error;
        }
    };

    static getProductById: RequestHandler<{ _id: Types.ObjectId }> = async (req, res, next) => {
        const { _id } = req.params;
        const service = new ProductService();
        try {
            const products = await service.findById(_id);
            if (!products) {
                next(createHttpError(404, 'Not Found User'));
                return;
            }
            res.status(200).json({
                statusCode: 200,
                msg: 'Found Product',
                metadata: { ...products },
            });
            return;
        } catch (error) {
            next(error);
            throw error;
        }
    };

    static createProduct: RequestHandler = async (req, res, next) => {
        const product = <Omit<Product, '_id'>> req.body;
        const service = new ProductService();
        try {
            const createdProduct = await service.create(product);
            res.status(200).json({
                statusCode: 200,
                msg: 'Created new Product',
                metadata: createdProduct,
            });
            return;
        } catch (error) {
            next(error);
            throw error;
        }
    };

    static updateProductById: RequestHandler = async (req, res, next) => {
        const product = <Partial<Product>> req.body;
        const service = new ProductService();
        try {
            const updatedProduct = await service.update(product);
            res.status(200).json({
                statusCode: 200,
                msg: 'Updated success',
                metadata: updatedProduct,
            });
            return;
        } catch (error) {
            next(error);
            throw error;
        }
    };
}

export default ProductController;
