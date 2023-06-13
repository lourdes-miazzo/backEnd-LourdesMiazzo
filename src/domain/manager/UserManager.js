import UserMongooseDao from "../../data/dao/UserMongooseDao.js"
import idValidation from "../validations/idValidation.js"
import createUserValidation from "../validations/user/createUserValidation.js"
import updateUserValidation from "../validations/user/updateUserValidation.js"

class UserManager{
    constructor(){
        this.dao = new UserMongooseDao()
    }

    async list(limit, page){
        return this.dao.list(limit, page)
    }
    async getOne(id){
        await idValidation.parseAsync(id)
        return this.dao.getOne(id)
    }
    async create(body){
        await createUserValidation.parseAsync(body)
        return this.dao.create(body)
    }
    async saveCartInUser(id, createCart){
        await idValidation.parseAsync(id)
        return this.dao.saveCartInUser(id, createCart)
    }
    async updateOne(id, body){
        await updateUserValidation.parseAsync(id, {...body})
        return this.dao.updateOne(id, body)
    }
    async deleteOne(id){
        await idValidation.parseAsync(id)
        return this.dao.deleteOne(id)
    }
}

export default UserManager