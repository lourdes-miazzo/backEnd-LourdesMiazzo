import container from "../../container.js"
import idValidation from "../validations/idValidation.js"
import createUserValidation from "../validations/user/createUserValidation.js"
import updateUserValidation from "../validations/user/updateUserValidation.js"

class UserManager{
    constructor(){
        this.repository = container.resolve('UserRepository')
    }

    async list(limit, page){
        return this.repository.list(limit, page)
    }
    async getOne(id){
        await idValidation.parseAsync(id)
        return this.repository.getOne(id)
    }
    async create(body){
        await createUserValidation.parseAsync(body)
        return this.repository.create(body)
    }
    async saveCartInUser(id, createCart){
        await idValidation.parseAsync(id)
        return this.repository.saveCartInUser(id, createCart)
    }
    async updateOne(id, body){
        await updateUserValidation.parseAsync(id, {...body})
        return this.repository.updateOne(id, body)
    }
    async deleteOne(id){
        await idValidation.parseAsync(id)
        return this.repository.deleteOne(id)
    }
}

export default UserManager