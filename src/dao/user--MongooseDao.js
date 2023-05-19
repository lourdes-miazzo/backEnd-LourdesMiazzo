import userModel from "../models/users.model.js"

class UserMongooseDao{
    async list(limit, page){
            const document = await userModel.paginate({}, {limit, page})
            document.docs = document.docs.map(d => ({
                id: d._id,
                firstName: d.firstName,
                lastName: d.lastName,
                email: d.email,
                age: d.age
            }))
            return document
    }
    async getOne(uid){
            const document = await userModel.findById(uid)
            if(!document){
                throw new Error ("User not found")
            }
            return {
                id: document?._id,
                firstName: document?.firstName,
                lastName: document?.lastName,
                email: document?.email,
                age: document?.age,
                password: document?.password
            }
    }
    async create(body){
            const document = await userModel.create(body)
            return {
                id: document._id,
                firstName: document.firstName,
                lastName: document.lastName,
                email: document.email,
                age: document.age,
            }
    }
    async updateOne(uid, body){
            const document = await userModel.findByIdAndUpdate(
                {_id: uid},
                    body,
                {new: true})
            return {
                id: document._id,
                firstName: document.firstName,
                lastName: document.lastName,
                email: document.email,
                age: document.age
            }     
    }
    async deleteOne(uid){
            return userModel.deleteOne({_id: uid})
    }
}

export default UserMongooseDao