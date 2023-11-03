import mongoose from "mongoose";
import productModel from "../products/model.products.mongo.js";
import mongoosePaginate from 'mongoose-paginate-v2';

const cartsCollection = "carts";

const cartSchema = new mongoose.Schema({
    items: [
        {
            productId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: productModel
            },
            quantity: {
                type: Number,
                default: 1
            }
        }
    ]
});
cartSchema.plugin(mongoosePaginate)

const cartModel = mongoose.model(cartsCollection, cartSchema);
export default cartModel;