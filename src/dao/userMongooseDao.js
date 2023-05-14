import userModel from "../models/users.model.js"

class UserMongooseDao{
    async list(limit, page){
        try{
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
        catch(e){
            throw e
        }
    }
    async getOne(uid){
        try{
            const document = await userModel.findById(uid)
            if(!document){
                throw new Error ("User dont exist")
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
        catch(e){
            throw e
        }
    }
    async create(body){
        try{
            const document = await userModel.create(body)
            return {
                id: document._id,
                firstName: document.firstName,
                lastName: document.lastName,
                email: document.email,
                age: document.age,
            }
        }
        catch(e){
            throw e
        }
    }
    async updateOne(uid, body){
        try{
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
        catch(e){
            throw e
        }
    }
    async deleteOne(uid){
        try{
            return userModel.deleteOne({_id: uid})
        }
        catch(e){
            throw e
        }
    }
}

export default UserMongooseDao