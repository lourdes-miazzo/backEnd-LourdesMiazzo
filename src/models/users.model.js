import mongoose, { Schema } from "mongoose"
import mongoosePaginate from "mongoose-paginate-v2"

const usersCollection= "users"
const userSchema = new mongoose.Schema({
    firstName: {type: Schema.Types.String, required: true},
    lastName: {type: Schema.Types.String, required: true},
    email: {type: Schema.Types.String, required: true, unique: true},
    age: {type: Schema.Types.Number},
    password: {type: Schema.Types.String, required: true}
})


userSchema.plugin(mongoosePaginate)
const userModel = mongoose.model(usersCollection, userSchema)
export default userModel