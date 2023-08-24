import mongoose, { Schema } from 'mongoose';
import mongoosePaginate from 'mongoose-paginate-v2';

const productsCollections = 'products';

const productsSchema = new mongoose.Schema({
    title: { type: Schema.Types.String, required:true },
    description: { type: Schema.Types.String, required:true },
    price: { type: Schema.Types.Number, required:true },
    thumbnail: { type: Schema.Types.String, required:true },
    code: { type: Schema.Types.String, required:true },
    stock: { type: Schema.Types.Number, required:true },
    category: { type: Schema.Types.String, required:true },
    status: { type: Schema.Types.Boolean, default: true },
    owner: { type: Schema.Types.String, default: 'admin' }
});

productsSchema.plugin(mongoosePaginate);
export const productModel = mongoose.model(productsCollections, productsSchema);
