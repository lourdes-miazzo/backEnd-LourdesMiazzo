import userModel from '../models/userModel.js';
import { passwordsCompare, createHash } from '../../shared/index.js';
import User from '../../domain/entities/user.js';

class SessionMongooseRepository
{
    async getOneByEmail(email)
    {
            const document = await userModel.findOne({ email });
            return new User({
                id: document?._id,
                firstName: document?.firstName,
                lastName: document?.lastName,
                email: document?.email,
                age: document?.age,
                password: document?.password,
                cart: document?.cart,
                role: document?.role,
                isAdmin: document?.isAdmin,
                documents: document?.documents,
                lastConnection: document?.lastConnection
            });
    }
    async collate(password, user)
    {
            return passwordsCompare(password, user);
    }
    async create(body)
    {
        if (body.terminal === undefined)
        {
            body.isAdmin = false;
        }
        const hashedPassword = await createHash(body.password);
        const userHashed = { ...body, password : hashedPassword };
        const document = await userModel.create(userHashed);
        const pDocument = await userModel.findById(document._id).populate('cart role').exec();
        return new User({
            id: pDocument._id,
            firstName: pDocument.firstName,
            lastName: pDocument.lastName,
            email: pDocument.email,
            age: pDocument.age,
            cart: pDocument.cart,
            role: pDocument.role,
            isAdmin: pDocument.isAdmin,
            documents: pDocument.documents,
            lastConnection: pDocument.lastConnection
        });
    }
    async forgetPass(dto)
    {
        const user = await userModel.findOne({ email: dto.email });
        // acá hago que el password viejo del user sea renovado por el nuevo password ya hasheado
        // que se pasó por el body
        user.password = dto.password;

        const updatePass = await userModel.updateOne({ _id : user.id }, user);
        return updatePass;
    }
    async changePass(dto)
    {
        const hashedPassword = await createHash(dto.password);
        const user = await userModel.findOne({ email: dto.email });
        user.password = hashedPassword;

        const updatePass = await userModel.updateOne({ _id : user.id }, user);
        return updatePass;
    }
}

export default SessionMongooseRepository;
