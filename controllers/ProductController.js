import ProductService from '../services/ProductService.js';
import ValidationService from '../services/ValidationService.js';

class ProductController {
    async createProduct(req, res, next) {
        try {
            await ValidationService.fieldsValidation(req);
            const product = await ProductService.createProduct(req.body);
            res.json(product);
        } catch (e) {
            next(e);
        }
    }

    async getAllProducts(req, res, next) {
        try {
            const products = await ProductService.getAllProducts();
            return res.json(products);
        } catch (e) {
            next(e);
        }
    }

    async getProduct(req, res, next) {
        try {
            const product = await ProductService.getProduct(req.params.id);
            return res.json(product);
        } catch (e) {
            next(e);
        }
    }

    async updateProduct(req, res, next) {
        try {
            await ValidationService.fieldsValidation(req);
            const updatedProducts = await ProductService.updateProduct(req.body);
            return res.json(updatedProducts);
        } catch (e) {
            next(e);
        }
    }

    async deleteProduct(req, res, next) {
        try {
            const products = await ProductService.deleteProduct(req.params.id);
            return res.json(products);
        } catch (e) {
            next(e);
        }
    }
}

export default new ProductController();