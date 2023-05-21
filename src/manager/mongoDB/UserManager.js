import UserMongooseDao from "../../dao/UserMongooseDao.js"

class UserManager{
        constructor(){
                this.dao = new UserMongooseDao()
        }

        async list(limit, page){
                return this.dao.list(limit, page)
        }
        async getOne(id){
                return this.dao.getOne(id)
        }
        async create(body){
                return this.dao.create(body)
                }
        async updateOne(id, body){
                return this.dao.updateOne(id, body)
        }
        async deleteOne(id){
                return this.dao.deleteOne(id)
        }
}

export default UserManager