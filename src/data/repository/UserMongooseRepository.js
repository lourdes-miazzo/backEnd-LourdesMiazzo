import userModel from '../models/userModel.js';
import { createHash } from '../../shared/index.js';
import User from '../../domain/entities/user.js';

class UserMongooseRepository
{
    async list(limit, page)
    {
        const document = await userModel.paginate({}, { limit, page });
        const { docs, ...pagination } = document;

        const users = docs.map(d => new User({
            id: d._id,
            firstName: d.firstName,
            lastName: d.lastName,
            email: d.email,
            age: d.age,
            cart: d.cart,
            role: d.role,
            isAdmin: d.isAdmin,
            documents: d.documents,
            lastConnection: d.lastConnection
        }));
        return {
            users, pagination
        };
    }
    async listSimplified()
    {
        const document = await userModel.find();

        const users = document.map(d => new User({
            firstName: d.firstName,
            lastName: d.lastName,
            email: d.email,
            role: d.role
        }));
        return  users;
    }
    async getOne(id)
    {
        const document = await userModel.findOne({ _id: id });
        if (!document)
        {
            throw new Error ('User not found');
        }
        return new User({
            id: document?._id,
            firstName: document?.firstName,
            lastName: document?.lastName,
            email: document?.email,
            age: document?.age,
            cart: document?.cart,
            role: document?.role,
            isAdmin: document?.isAdmin,
            documents: document?.documents,
            lastConnection: document?.lastConnection
        });
    }
    async create(body)
    {
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
    async saveCartInUser(id, createCart)
    {
        await userModel.findById(id);
        const document = await userModel.findOneAndUpdate(
            { _id: id },
            { cart: createCart.id },
            { new:true });
            return new User({
                id: document._id,
                firstName: document.firstName,
                lastName: document.lastName,
                email: document.email,
                age: document.age,
                cart: document.cart,
                role: document.role,
                isAdmin: document.isAdmin,
                documents: document.documents,
                lastConnection: document.lastConnection
            });
    }
    async updateOne(id, body)
    {
        const document = await userModel.findByIdAndUpdate(
            { _id: id },
                body,
            { new: true });
        return new User({
            id: document._id,
            firstName: document.firstName,
            lastName: document.lastName,
            email: document.email,
            age: document.age,
            cart: document.cart,
            role: document.role,
            isAdmin: document.isAdmin,
            documents: document.documents,
            lastConnection: document.lastConnection
        });
    }
    async updateConnection(id, body)
    {
        const document = await userModel.findOneAndUpdate(
            { _id: id },
                body,
            { new: true });
        return new User({
            id: document._id,
            firstName: document.firstName,
            lastName: document.lastName,
            email: document.email,
            age: document.age,
            password: document.password,
            cart: document.cart,
            role: document.role,
            isAdmin: document.isAdmin,
            documents: document.documents,
            lastConnection: document.lastConnection
        });
    }
    async deleteOne(id)
    {
        await userModel.deleteOne({ _id: id });
    }
    async findInactive(lessTwo)
    {
        const document = await userModel.find(
            { lastConnection: { $lt: lessTwo } }
        );
        return document;
    }
}

export default UserMongooseRepository;
