import ProductService from './ProductService.js';

class ProductController {
    async createProduct(req, res) {
        try {
            const product = await ProductService.createProduct(req.body);
            res.json(product);
        } catch (e) {
            res.status(500).json(e);
        }
    }

    async getAllProducts(req, res) {
        try {
            const products = await ProductService.getAllProducts();
            return res.json(products);
        } catch (e) {
            res.status(500).json(e);
        }
    }

    async getProduct(req, res) {
        try {
            const product = await ProductService.getProduct(req.params.id);
            return res.json(product);
        } catch (e) {
            res.status(500).json(e);
        }
    }

    async updateProduct(req, res) {
        try {
            const updatedProducts = await ProductService.updateProduct(req.body);
            return res.json(updatedProducts);
        } catch (e) {
            res.status(500).json(e.message);
        }
    }

    async deleteProduct(req, res) {
        try {
            const products = await ProductService.deleteProduct(req.params.id);
            return res.json(products);
        } catch (e) {
            res.status(500).json(e.message);
        }
    }
}

export default new ProductController();