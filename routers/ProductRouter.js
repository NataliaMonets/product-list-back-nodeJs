import Router from 'express';
import ProductController from '../controllers/ProductController.js';

const productRouter = new Router();

productRouter.post('/products', ProductController.createProduct);
productRouter.get('/products', ProductController.getAllProducts);
productRouter.get('/products/:id', ProductController.getProduct);
productRouter.put('/products', ProductController.updateProduct);
productRouter.delete('/products/:id', ProductController.deleteProduct);

export default productRouter;