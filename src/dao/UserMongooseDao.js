import userModel from "../models/users.model.js"
import { createHash } from "../shared/index.js"

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
    async getOne(id){
            const document = await userModel.findById(id)
            if(!document){
                throw new Error ("User not found")
            }
            return {
                id: document?._id,
                firstName: document?.firstName,
                lastName: document?.lastName,
                email: document?.email,
                age: document?.age
            }
    }
    async create(body){
        const hashedPassword = await createHash(body)
        const userHashed = {...body, password : hashedPassword}
        const document = await userModel.create(userHashed)
            return {
                id: document._id,
                firstName: document.firstName,
                lastName: document.lastName,
                email: document.email,
                age: document.age,
            }
    }
    async updateOne(id, body){
            const document = await userModel.findByIdAndUpdate(
                {_id: id},
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
    async deleteOne(id){
            return userModel.deleteOne({_id: id})
    }
}

export default UserMongooseDao