import mongoose from "mongoose";

const userCollection = "users";

const UserSchema = new mongoose.Schema({
    first_name: String,
    last_name: String,
    email: String,
    age: Number,
    password: String,
    cart: { type: mongoose.Schema.Types.ObjectId, ref: 'Cart' },
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