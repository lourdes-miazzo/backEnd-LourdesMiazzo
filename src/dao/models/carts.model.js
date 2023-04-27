import mongoose, { Schema } from "mongoose";

const cartsCollections = "carts"

const cartsSchema= new mongoose.Schema({
    products: {type: Schema.Types.Array}
})

export const cartsModel= mongoose.model(cartsCollections, cartsSchema)