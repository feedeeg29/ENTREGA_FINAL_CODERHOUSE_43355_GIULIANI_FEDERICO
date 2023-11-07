import mongoose from "mongoose";
import cartModel from '../carts/model.carts.mongo.js'
const userCollection = "users";

const UserSchema = new mongoose.Schema({
    first_name: String,
    last_name: String,
    email: String,
    age: Number,
    password: String,
    cart: { type: mongoose.Schema.Types.ObjectId, ref: cartModel },
    role: { type: String, enum: ["freeUser", "premiumUser", "admin", "superAdmin"], default: 'freeUser' },
    documents: [
        {
            name: String,
            reference: String,
        },
    ],
    last_connection: Date,
});

const userModel = mongoose.model(userCollection, UserSchema);
export default userModel;