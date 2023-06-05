import userModel from "../models/users.model.js";
import { passwordsCompare, createHash } from "../shared/index.js";

class SessionMongooseDao{
    async getOneByEmail(email){
            const document = await userModel.findOne({email})
            if(!document){
                throw new Error("User dont exist")
            }
            return {
                id: document?._id,
                firstName: document?.firstName,
                lastName: document?.lastName,
                email: document?.email,
                age: document?.age,
                password: document?.password,
                role: document?.role,
                isAdmin: document?.isAdmin
            }
    }
    async collate(password, user){
            return passwordsCompare(password, user)
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
                role: document.role,
                isAdmin: document.isAdmin
            }
    }
}

export default SessionMongooseDao