import userModel from "../models/userModel.js";
import { passwordsCompare, createHash } from "../../shared/index.js";
import User from '../../domain/entities/user.js'

class SessionMongooseRepository{
    async getOneByEmail(email){
            const document = await userModel.findOne({email})
            if(!document){
                throw new Error("User dont exist")
            }
            return new User({
                id: document?._id,
                firstName: document?.firstName,
                lastName: document?.lastName,
                email: document?.email,
                age: document?.age,
                password: document?.password,
                role: document?.role,
                isAdmin: document?.isAdmin, 
                cart: document?.cart
            })
    }
    async collate(password, user){
            return passwordsCompare(password, user)
    }
    async create(body, cartAssociated){
        body.cart = cartAssociated.id
        console.log(body)
            const hashedPassword = await createHash(body)
            const userHashed = {...body, password : hashedPassword}
            const document = await userModel.create(userHashed)

            return new User({
                id: document._id,
                firstName: document.firstName,
                lastName: document.lastName,
                email: document.email,
                age: document.age,
                role: document.role,
                isAdmin: document.isAdmin,
                cart: document.cart
            })
    }
}

export default SessionMongooseRepository