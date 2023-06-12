import Product from "./Product.js";

class ProductService {
    async createProduct(product, picture) {
        const createdProduct = await Product.create(product);
        return createdProduct;
    }

    async getAllProducts() {
        const products = await Product.find();
        return products;
    }

    async getProduct(id) {
        if (!id) {
            throw new Error('provide id');
        }
        const product = await Product.findById(id);
        return product;
    }

    async updateProduct(product) {
        if (!product._id) {
            throw new Error('provide id');
        }
        const updatedProduct = await Product.findByIdAndUpdate(product._id, product, { new: true });
        return updatedProduct;
    }

    async deleteProduct(id) {
        if (!id) {
            throw new Error('provide id');
        }
        const product = await Product.findByIdAndDelete(id);
        return product;
    }
}

export default new ProductService();