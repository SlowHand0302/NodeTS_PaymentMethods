import express from 'express';
import ProductController from '../controllers/product.controllers';
const routers = express.Router();

routers.get('/read', ProductController.getAllProduct);
routers.get('/read/:_id', ProductController.getProductById);
routers.post('/create', ProductController.createProduct);
routers.put('/update', ProductController.updateProductById);

export default routers;
