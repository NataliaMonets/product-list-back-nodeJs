import Product from "../models/Product.js";
import ApiError from '../exceptions/api-error.js';

class ProductService {
    async createProduct(product) {
        const existingProduct = await Product.findOne({name: product.name});
        if (existingProduct) {
            throw ApiError.BadRequest('Product already exists');
        }
        const createdProduct = await Product.create(product);
        return createdProduct;
    }

    async getAllProducts() {
        const products = await Product.find();
        return products;
    }

    async getProduct(id) {
        if (!id) {
            throw ApiError.BadRequest('Provide product id');
        }
        const product = await Product.findById(id);
        return product;
    }

    async updateProduct(product) {
        if (!product._id) {
            throw ApiError.BadRequest('Provide product id');
        }
        const existingProduct = await Product.findOne({name: product.name});
        if (existingProduct) {
            throw ApiError.BadRequest('Product already exists');
        }
        await Product.findByIdAndUpdate(product._id, product);
        const updatedProducts = await Product.find();
        return updatedProducts;
    }

    async deleteProduct(id) {
        if (!id) {
            throw ApiError.BadRequest('Provide product id');
        }
        await Product.findByIdAndDelete(id);
        const products = await Product.find();
        return products;
    }
}

export default new ProductService();