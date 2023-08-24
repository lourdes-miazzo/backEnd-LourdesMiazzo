
import mongoose, { Schema } from 'mongoose';
import paginate from 'mongoose-paginate-v2';

const cartsCollections = 'carts';

const cartsSchema = new mongoose.Schema({
    products:
    {
        type:
            [{
                _id: { type: Schema.Types.ObjectId, required: true, ref: 'products' },
                quantity:{ type: Schema.Types.Number }
            }]
    }
});

cartsSchema.plugin(paginate);

export const cartModel = mongoose.model(cartsCollections, cartsSchema);
