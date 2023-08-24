import container from '../../container.js';
import idValidation from '../validations/idValidation.js';
import createRoleValidation from '../validations/role/createRoleValidation.js';
import updateRoleValidation from '../validations/role/updateRoleValidation.js';

class RoleManager
{
    constructor()
    {
        this.repository = container.resolve('RoleRepository');
    }
    async findList()
    {
        return this.repository.findList();
    }
    async oneRole(id)
    {
        await idValidation.parseAsync(id);
        return this.repository.oneRole(id);
    }
    async createRoleByName(role)
    {
        return this.repository.createRoleByName(role);
    }
    async roleUpdated(id, body)
    {
        await updateRoleValidation.parseAsync(id, { ...body });
        return this.repository.roleUpdated(id, body);
    }
    async eraseRole(id)
    {
        await idValidation.parseAsync(id);
        return this.repository.eraseRole(id);
    }
}

export default RoleManager;
