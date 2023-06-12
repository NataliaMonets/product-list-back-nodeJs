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
        await Product.findByIdAndUpdate(product._id, product);
        const updatedProducts = await Product.find();
        return updatedProducts;
    }

    async deleteProduct(id) {
        if (!id) {
            throw new Error('provide id');
        }
        await Product.findByIdAndDelete(id);
        const products = await Product.find();
        return products;
    }
}

export default new ProductService();