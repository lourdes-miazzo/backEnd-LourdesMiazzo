import userModel from "../models/userModel.js";
import { passwordsCompare, createHash } from "../../shared/index.js";
import User from '../../domain/entities/user.js'

class SessionMongooseRepository{
    async getOneByEmail(email){
            const document = await userModel.findOne({email})
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
            const hashedPassword = await createHash(body.password)
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
    async forgetPass(dto){
        const user = await userModel.findOne({email: dto.email})
        //acá hago que el password viejo del user sea renovado por el nuevo password ya hasheado 
        //que se pasó por el body
        user.password = dto.password

        const updatePass= await userModel.updateOne({_id : user.id}, user);
        return updatePass
    }
}

export default SessionMongooseRepository