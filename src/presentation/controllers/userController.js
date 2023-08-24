import UserManager from '../../domain/manager/UserManager.js';
import CartManager from '../../domain/manager/CartManager.js';
import RoleManager from '../../domain/manager/RoleManager.js';

export const allUsers = async(req, res, next) =>
{
    try
    {
        const limit = req.query.limit ? +req.query.limit : 10;
        const page = req.query.page ? +req.query.page : 1;

        const manager = new UserManager();
        const users = await manager.list(limit, page);

        res.status(200).send({ status: 'success', users: users.docs, ...users, docs: undefined });
    }
    catch (e)
    {
        next(e);
    }
};
export const allUsersSimplified = async(req, res, next) =>
{
    try
    {
        const manager = new UserManager();
        const users = await manager.listSimplified();

        res.status(200).send({ status: 'success', users: users.docs, ...users, docs: undefined });
    }
    catch (e)
    {
        next(e);
    }
};
export const oneUser = async(req, res, next) =>
{
    try
    {
        const { id } = req.params;

        const manager = new UserManager();
        const user = await manager.getOne(id);

        res.status(200).send({ status: 'success', user });
    }
    catch (e)
    {
        next(e);
    }
};
export const saveNewUser = async(req, res, next) =>
{
    try
    {
        const body = req.body;

        const cart = new CartManager();
        const cartAssociated = await cart.newCart();
        body.cart = cartAssociated.id;
        if (body.role !== undefined)
        {
            const role = new RoleManager();
            const newRole = await role.createRoleByName(body.role);
            body.role = newRole.id;
        }

        const manager = new UserManager();
        const user = await manager.create(body);

        res.status(201).send({
            status: 'success',
            message: 'User created.',
            payload: user });
    }
    catch (e)
    {
        next(e);
    }
};

export const updateUser = async(req, res, next) =>
{
    try
    {
        const { id } = req.params;
        const body = req.body;
        const manager = new UserManager();
        const existingUser = await manager.getOne(id);

        if (!existingUser)
        {
            return res.status(404).json({ error: 'User not found' });
        }

        const updatedUser = { ...existingUser, ...body };

        const result = await manager.updateOne(id, updatedUser);

        res.status(200).send({
            status: 'success',
            message: 'User updated.',
            payload: result });
    }
    catch (e)
    {
        next(e);
    }
};
export const deleteUser = async(req, res, next) =>
{
    try
    {
        const { id } = req.params;

        const manager = new UserManager();
        await manager.deleteOne(id);

        res.status(200).send({
            status: 'success',
            message: 'User deleted.' });
    }
    catch (e)
    {
        next(e);
    }
};
export const modifyUser = async(req, res, next) =>
{
    try
    {
        const id = req.params.id;
        const files = req.files;
        const requiredFiles = ['identification', 'adressProof', 'accountStateProof'];

        for (const fieldname of requiredFiles)
        {
            if (!req.files.find(file => file.fieldname === fieldname))
            {
                return res.status(400).send({ message: `File ${fieldname} has not been uploaded yet` });
            }
        }
        const documentsInfo = await files.map(f => ({ name: f.originalname, link: f.path }));

        const manager = new UserManager();
        const user = await manager.getOne(id);
        if (user.role.name === 'premium')
        {
        // si "premium" está presente, se cambia a client
            const role = new RoleManager();
            const changeRole = await role.createRoleByName('client');
            user.role = changeRole.id;
            // y se eliminan los documentos cargados
            user.documents = [];
        }
        else
        {
        // sino se agrega
            const role = new RoleManager();
            const changeRole2 = await role.createRoleByName('premium');
            user.role = changeRole2.id;
            // y se agrega la info de los archivos a documents
            user.documents = documentsInfo;
        }
        const modifyRole = await manager.updateOne(id, user);

        res.status(200).send({
            status: 'success',
            message: 'User modified correctly',
            payload: modifyRole }); 
    }
    catch (e)
    {
        next(e);
    }
};

export const postDocuments = async(req, res, next) =>
{
    try
    {
        if (!req.files)
        {
            return  res.status(400).send({ message: 'Your file has not been uploaded successfully' });
        }
        res.status(200).send({ message: 'File uploaded successfully' }); 
    }
    catch (e)
    {
        next(e);
    }
};
