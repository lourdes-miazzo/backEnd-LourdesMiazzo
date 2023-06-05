import SessionMongooseDao from "../../dao/SessionMongooseDao.js";
import emailValidation from "../../validations/session/emailValidation.js";
import passValidation from "../../validations/session/passValidation.js";
import createUserValidation from "../../validations/user/createUserValidation.js";

class SessionManager{
    constructor(){
        this.dao = new SessionMongooseDao()
    }
        async getOneByEmail(email){
            await emailValidation.parseAsync(email)
            return this.dao.getOneByEmail(email)
        }
        async collate(password, user){
            await passValidation.parseAsync(password)
            return this.dao.collate(password, user)
        }
        async create(body){
            await createUserValidation.parseAsync(body)
            return this.dao.create(body)
        }
}
    export default SessionManager