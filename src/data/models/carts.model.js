import { ObjectId } from "mongodb";
import mongoose, { Schema } from "mongoose";

const cartsCollections = "carts"

const cartsSchema= new mongoose.Schema({
    products: {type:
            [{ 
                _id: {type: ObjectId, required: true, ref: 'products'},
                quantity:{type: Schema.Types.Number, required: true}
            }]
    }
})


export const cartsModel= mongoose.model(cartsCollections, cartsSchema)