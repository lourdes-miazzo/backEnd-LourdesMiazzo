import userModel from "../models/users.model.js";
import { passwordsCompare, createHash } from "../shared/index.js";

class SessionMongooseDao{
    async getOneByEmail(email){
        try{
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
                password: document?.password
            }
        }
        catch(e){
            throw e
        }
    }
    async collate(password, user){
        try{
            return passwordsCompare(password, user)
        }
        catch(e){
            throw e
        }
    }
    async create(body){
        try{
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
        catch(e){
            throw e
        }
    }
}

export default SessionMongooseDao