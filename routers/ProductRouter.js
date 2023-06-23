import Router from 'express';
import ProductController from '../controllers/ProductController.js';
import { check } from 'express-validator';
import { authMiddleware } from '../middleware/auth-middleware.js';

const productRouter = new Router();

productRouter.post('/products', [
    check('description', "Description should be between 3 and 300 symbols").isLength({ min: 3, max: 300 }),
    check('name', "Name should be between 3 and 40 symbols").isLength({ min: 3, max: 40 })
], authMiddleware, ProductController.createProduct);
productRouter.get('/products', authMiddleware, ProductController.getAllProducts);
productRouter.get('/products/:id', authMiddleware, ProductController.getProduct);
productRouter.put('/products', [
    check('description', "Description should be between 3 and 300 symbols").isLength({ min: 3, max: 300 }),
    check('name', "Name should be between 3 and 40 symbols").isLength({ min: 3, max: 40 })
], authMiddleware, ProductController.updateProduct);
productRouter.delete('/products/:id', authMiddleware, ProductController.deleteProduct);

export default productRouter;