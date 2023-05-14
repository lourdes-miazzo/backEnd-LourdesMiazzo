import UserMongooseDao from "../../dao/userMongooseDao.js"

class UserManager{
    constructor(){
        this.dao = new UserMongooseDao()
    }

    async list(limit, page){
        try{
            return this.dao.list(limit, page)
        }
        catch(e){
            throw e
        }
    }
    async getOne(uid){
        try{
            return this.dao.getOne(uid)
        }
        catch(e){
            throw e
        }
    }
    async create(body){
        try{
            return this.dao.create(body)
        }
        catch(e){
            throw e
        }
    }
    async updateOne(uid, body){
        try{
            return this.dao.updateOne(uid, body)
        }
        catch(e){
            throw e
        }
    }
    async deleteOne(uid){
        try{
            return this.dao.deleteOne(uid)
        }
        catch(e){
            throw e
        }
    }
 
}

export default UserManager