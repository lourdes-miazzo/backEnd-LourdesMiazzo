import roleModel from "../models/role.model.js"
class RoleMongooseDao{
    async findList(){
        const document = await roleModel.find()
        document.map(doc=>({
            id: doc._id,
            name: doc.name,
            permissions: doc.permissions
        }))
        return document
    }
    async oneRole(id){
        const document = await roleModel.findOne({_id: id})
        return{
            id: document?._id,
            name: document?.name,
            permissions: document?.permissions
        }
    }
    async createRole(body){
        const document = await roleModel.create(body)
        return{
            id: document._id,
            name: document.name,
            permissions: document.permissions
        }
    }
    async roleUpdated(id, body){
        const document= await roleModel.findOneAndUpdate(
            {_id: id},
            body,
            {new: true}
        )
        return{
            id: document._id,
            name: document.name,
            permissions: document.permissions
        }
    }
    async eraseRole(id){
        const document= await roleModel.findOneAndDelete({_id: id})
        return{
            id: document._id,
            name: document.name,
            permissions: document.permissions
        }
    }
}

export default RoleMongooseDao