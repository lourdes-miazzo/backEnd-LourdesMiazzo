import mongoose, { Schema } from 'mongoose';
import mongoosePaginate from 'mongoose-paginate-v2';


const usersCollection = 'users';
const userSchema = new mongoose.Schema({
    firstName: { type: Schema.Types.String, required: true },
    lastName: { type: Schema.Types.String, required: true },
    email: { type: Schema.Types.String, required: true },
    age: { type: Schema.Types.Number, required: true },
    password: { type: Schema.Types.String, required: true },
    cart: { type: Schema.Types.ObjectId, ref:'carts', index: true },
    role:{ type: Schema.Types.ObjectId, ref: 'roles', index: true, default: null },
    isAdmin: { type: Schema.Types.Boolean, default: false },
    documents: [{ name:{ type: Schema.Types.String }, link:{ type: Schema.Types.String } }],
    lastConnection: { type: Schema.Types.Date },
    terminal: { type: Schema.Types.Boolean, default: false }
});


userSchema.plugin(mongoosePaginate);

userSchema.pre('find', function(next)
{
    this.populate('cart role');
    next();
});

userSchema.pre('findOne', function(next)
{
    this.populate('cart role');
    next();
});

userSchema.pre('findOneAndUpdate', function(next)
{
    this.populate('cart role');
    next();
});

  const userModel = mongoose.model(usersCollection, userSchema);
  export default userModel;

