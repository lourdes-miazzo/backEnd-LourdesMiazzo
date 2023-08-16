import userModel from "../models/userModel.js"
import { createHash } from "../../shared/index.js"
import User from "../../domain/entities/user.js"

class UserMongooseRepository{
    async list(limit, page){
            const document = await userModel.paginate({}, {limit, page})
            const { docs, ...pagination } = document

            const users = docs.map(d => new User({
                id: d._id,
                firstName: d.firstName,
                lastName: d.lastName,
                email: d.email,
                age: d.age, 
                cart: d.cart,
                role: d.role,
                isAdmin: d.isAdmin,
                documents: d.documents,
                lastConnection: d.lastConnection
            }))
            return {
                users, pagination
            }
    }
    async getOne(id){
            const document = await userModel.findOne({_id: id})
            if(!document){
                throw new Error ("User not found")
            }
            return new User({
                id: document?._id,
                firstName: document?.firstName,
                lastName: document?.lastName,
                email: document?.email,
                age: document?.age,
                cart: document?.cart,
                role: document?.role,
                isAdmin: document?.isAdmin,
                documents: document?.documents,
                lastConnection: document?.lastConnection
            })
    }
    async create(body){
        const hashedPassword = await createHash(body)
        const userHashed = {...body, password : hashedPassword}
        const document = await userModel.create(userHashed)
            return new User({
                id: document._id,
                firstName: document.firstName,
                lastName: document.lastName,
                email: document.email,
                age: document.age,
                cart: document.cart,
                role: document.role,
                isAdmin: document.isAdmin,
                documents: document.documents,
                lastConnection: document.lastConnection
            })
    }
    async saveCartInUser(id, createCart){
        await userModel.findById(id)
        const document = await userModel.findOneAndUpdate(
            {_id: id},
            {cart: createCart.id},
            {new:true})
            return new User({
                id: document._id,
                firstName: document.firstName,
                lastName: document.lastName,
                email: document.email,
                age: document.age,
                cart: document.cart,
                role: document.role,
                isAdmin: document.isAdmin,
                documents: document.documents,
                lastConnection: document.lastConnection
            })
    }
    async updateOne(id, body){
            const document = await userModel.findOneAndUpdate(
                {_id: id},
                    body,
                {new: true})
            return new User({
                id: document._id,
                firstName: document.firstName,
                lastName: document.lastName,
                email: document.email,
                age: document.age,
                cart: document.cart,
                role: document.role,
                isAdmin: document.isAdmin,
                documents: document.documents.map(doc => ({
                    name: doc.name,
                    link: doc.link
                })),
                lastConnection: document.lastConnection
            })

    }
    async deleteOne(id){
            await userModel.deleteOne({_id: id})
    }
}

export default UserMongooseRepository