import productModel from "../../models/products/model.products.mongo.js";


class productManager {
    static getAll = async (req, res, query) => {
        try {
            const options = {
                page: req.query.page || 1,
                limit: req.query.limit || 10,
                lean: true
            };
            const datosProducts = await productModel.paginate({}, options);
            const products = datosProducts.docs;
            const hasPrevPage = datosProducts.hasPrevPage;
            const hasNextPage = datosProducts.hasNextPage;
            const prevPage = datosProducts.prevPage;
            const nextPage = datosProducts.nextPage;
            return { products, hasNextPage, hasPrevPage, nextPage, prevPage };

        } catch (err) {
            throw new Error(err);
        }
    }
    static getOne = async (id) => {
        try {
            return await productModel.findById(id).lean();
        } catch (err) {
            throw new Error(err);
        }
    }
    static createProduct = async (productData) => {
        try {
            const newProduct = new productModel(productData);
            return newProduct.save();
        } catch (err) {
            throw new Error(err);
        }
    }
    static updateProduct = async (id, newContent) => {
        try {
            return await productModel.findByIdAndUpdate(id, newContent);
        }
        catch (err) {
            throw new Error(err);
        }
    }
    static deleteProduct = async (id) => {
        try {
            return await productModel.findByIdAndDelete(id);
        }
        catch (err) {
            throw new Error(err);
        }
    }
}
export default productManager 