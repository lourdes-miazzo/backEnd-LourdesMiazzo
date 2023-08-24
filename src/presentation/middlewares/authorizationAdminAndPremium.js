
export const authorizationAdminAndPremium = async(req, res, next) =>
{
    const user = req.user;
    if ((user.isAdmin == false) && !user.role.name.includes('premium'))
    {
        return res.status(401).send({ message: 'You lack authorization to continue' });
    }
    next();
};
