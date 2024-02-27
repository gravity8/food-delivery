import { Schema, model, models } from "mongoose";

const sizeSchema = new Schema({
    name: { type: String },
    price: { type: Number },
});


const productSchema = new Schema({
    basePrice: { type: Number },
    category: { type: String },
    description: { type: String },
    extras: { type: [sizeSchema] },
    image: { type: String },
    name: { type: String },
    size: { type: sizeSchema },
    sizes: { type: [sizeSchema] },
});

const CartContentSchema = new Schema({
    email: { type: String, required: true, unique: true }, // Add a userId field to associate the cart with a user
    allCartItems: { type: [productSchema] },
}, { timestamps: true });


export const CartContent = models?.CartContent || model("CartContent", CartContentSchema)