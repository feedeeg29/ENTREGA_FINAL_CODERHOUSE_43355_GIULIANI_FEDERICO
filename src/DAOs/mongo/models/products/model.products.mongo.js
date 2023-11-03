import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";

const productsCollection = "products";

const productSchema = new mongoose.Schema({
    name: { type: String, required: true, max: 100 },
    description: { type: String, required: true, max: 100 },
    code: { type: String, required: true, max: 100 },
    thumbnail: { type: String, required: true, max: 100 },
    price: { type: Number, required: true },
    stock: { type: Number, required: true }
});
productSchema.plugin(mongoosePaginate)

const productModel = mongoose.model(productsCollection, productSchema);
export default productModel;