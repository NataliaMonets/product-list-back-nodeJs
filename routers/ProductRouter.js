import Router from 'express';
import ProductController from '../controllers/ProductController.js';
import { check } from 'express-validator';

const productRouter = new Router();

productRouter.post('/products', [
    check('name', "Name field is required").notEmpty(),
    check('description', "Description field is required").notEmpty()
], ProductController.createProduct);
productRouter.get('/products', ProductController.getAllProducts);
productRouter.get('/products/:id', ProductController.getProduct);
productRouter.put('/products', [
    check('name', "Name field is required").notEmpty(),
    check('description', "Description field is required").notEmpty()
], ProductController.updateProduct);
productRouter.delete('/products/:id', ProductController.deleteProduct);

export default productRouter;