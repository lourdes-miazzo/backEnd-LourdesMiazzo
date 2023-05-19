import UserMongooseDao from "../../dao/user--MongooseDao.js"

class UserManager{
    constructor(){
        this.dao = new UserMongooseDao()
    }

    async list(limit, page){
            return this.dao.list(limit, page)
    }
    async getOne(uid){
            return this.dao.getOne(uid)
    }
    async create(body){
            return this.dao.create(body)
        }
    async updateOne(uid, body){
            return this.dao.updateOne(uid, body)
    }
    async deleteOne(uid){
            return this.dao.deleteOne(uid)
    }
}

export default UserManager