import userModel from "../models/users.model.js";
import bcrypt from "bcrypt"

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
    async comparePassword(user, password){
        try{
            return bcrypt.compare(password, user.password)
        }
        catch(e){
            throw e
        }
    }
    async create(body){
        try{
            const hashedPassword = await bcrypt.hash(body.password, 10)
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