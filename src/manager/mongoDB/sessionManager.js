import SessionMongooseDao from "../../dao/sessionMongooseDao.js";

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
        async comparePassword(user, password){
            try{
                return this.dao.comparePassword(user, password)
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