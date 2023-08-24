import ProductManager from '../../domain/manager/ProductManager.js';

export const authorizationAdminAndPremium2 = async(req, res, next) =>
{
    const id = req.params.pid;

    const manager = new ProductManager();
    const getProduct = await manager.getOne(id);
    const user = req.user;
    if ((user.isAdmin) || (user.role.name.includes('premium') && user.email === getProduct.owner))
    {
        next();
    }
    else
    {
        res.status(401).send({ message: 'You lack authorization to continue' });
    }
};
