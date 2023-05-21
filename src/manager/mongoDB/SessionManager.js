import SessionMongooseDao from "../../dao/SessionMongooseDao.js";

class SessionManager{
    constructor(){
        this.dao = new SessionMongooseDao()
    }
        async getOneByEmail(email){
                return this.dao.getOneByEmail(email)
        }
        async collate(password, user){
                return this.dao.collate(password, user)
        }
        async create(body){
                return this.dao.create(body)
        }
}
    export default SessionManager