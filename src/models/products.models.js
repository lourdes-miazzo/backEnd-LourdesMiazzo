import mongoose, { Schema } from "mongoose";

const productsCollections = "products"

const productsSchema= new mongoose.Schema({
    title: {type: Schema.Types.String, require:true},
    description: {type: Schema.Types.String, require:true},
    price: {type: Schema.Types.Number, require:true},
    thumbnail: {type: Schema.Types.String, require:true},
    code: {type: Schema.Types.String, require:true},
    stock: {type: Schema.Types.Number, require:true},
    category: {type: Schema.Types.String, require:true},
    status: {type: Schema.Types.Boolean, default: true}
})

export const productsModel= mongoose.model(productsCollections, productsSchema)