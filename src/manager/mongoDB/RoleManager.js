import RoleMongooseDao from "../../dao/RoleMongooseDao.js";
import idValidation from "../../validations/idValidation.js";
import createRoleValidation from "../../validations/role/createRoleValidation.js";
import updateRoleValidation from "../../validations/role/updateRoleValidation.js";

class RoleManager{
    constructor(){
        this.dao= new RoleMongooseDao()
    }
    async findList(){
        return this.dao.findList()
    }
    async oneRole(id){
        await idValidation.parseAsync(id)
        return this.dao.oneRole(id)
    }
    async createRole(body){
        await createRoleValidation.parseAsync(body)
        return this.dao.createRole(body)
    }
    async roleUpdated(id, body){
        await updateRoleValidation.parseAsync(id, {...body})
        return this.dao.roleUpdated(id, body)
    }
    async eraseRole(id){
        await idValidation.parseAsync(id)
        return this.dao.eraseRole(id)
    }
}

export default RoleManager