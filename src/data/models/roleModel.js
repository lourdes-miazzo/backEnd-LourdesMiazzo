import mongoose, { Schema } from "mongoose"

const rolesCollection= "role"
const roleSchema= new Schema({
    name: { type: Schema.Types.String, required: true},
    permissions: [{ type: Schema.Types.String }]
})

const roleModel= mongoose.model(rolesCollection, roleSchema)
export default roleModel
