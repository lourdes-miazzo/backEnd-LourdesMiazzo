import RoleManager from '../../domain/manager/RoleManager.js';

export const list = async(req, res, next) =>
{
    try
    {
        const manager = new RoleManager();
        const roleList = await manager.findList();
        res.status(200).send({
            message: 'success',
            payload: roleList
        });
    }
    catch (e)
    {
        next(e);
    }
};
export const oneRole = async(req, res, next) =>
{
    try
    {
        const { id } = req.params;

        const manager = new RoleManager();
        const findOne = await manager.oneRole(id);

        res.status(200).send({
            message: 'Role found',
            payload: findOne
        });
    }
    catch (e)
    {
        next(e);
    }
};
export const saveRole = async(req, res, next) =>
{
    try
    {
        const body = req.body;

        const manager = new RoleManager();
        const newRole = await manager.createRoleByName(body.name);

        res.status(201). send({
            message: 'Role created',
            payload: newRole
        });
    }
    catch (e)
    {
        next(e);
    }
};
export const updateRole = async(req, res, next) =>
{
    try
    {
        const id = req.params.id;
        const body = req.body;

        const manager = new RoleManager();
        const updated = await manager.roleUpdated(id, body);
        res.status(200).send({
            message: 'Role updated',
            payload: updated
        });
    }
    catch (e)
    {
        next(e);
    }
};
export const deleteRole = async(req, res, next) =>
{
    try
    {
        const id = req.params.id;

        const manager = new RoleManager();
        const roleDeleted = await manager.eraseRole(id);

        res.status(200).send({
            message: 'Role deleted',
            payload: roleDeleted
        });
    }
    catch (e)
    {
        next(e);
    }
};
