import mongoose, { Schema } from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2"

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

productsSchema.plugin(mongoosePaginate)
export const productsModel= mongoose.model(productsCollections, productsSchema)