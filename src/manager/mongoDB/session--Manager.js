import SessionMongooseDao from "../../dao/session--MongooseDao.js";

class SessionManager{
    constructor(){
        this.dao = new SessionMongooseDao()
    }
        async getOneByEmail(email){
            try{
                return this.dao.getOneByEmail(email)
            }
            catch(e){
                throw e
            }
        }
        async collate(password, user){
            try{
                return this.dao.collate(password, user)
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
}
    export default SessionManager