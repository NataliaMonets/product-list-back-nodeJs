import Router from 'express';
import ProductController from './ProductController.js';

const router = new Router();

router.post('/products', ProductController.createProduct);
router.get('/products', ProductController.getAllProducts);
router.get('/products/:id', ProductController.getProduct);
router.put('/products', ProductController.updateProduct);
router.delete('/products/:id', ProductController.deleteProduct);

export default router;