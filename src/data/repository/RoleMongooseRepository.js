import roleModel from '../models/roleModel.js';
import UserModel from '../models/userModel.js';
import Role from '../../domain/entities/role.js';
import { client, premium } from '../../shared/roles.js';

class RoleMongooseRepository
{
    async findList()
    {
        const document = await roleModel.find();
        document.map(doc => new Role({
            id: doc._id,
            name: doc.name,
            permissions: doc.permissions
        }));
        return document;
    }
    async oneRole(id)
    {
        const document = await roleModel.findOne({ _id: id });
        return new Role({
            id: document?._id,
            name: document?.name,
            permissions: document?.permissions
        });
    }
    async createRoleByName(role)
    {
        let permissions;
        if (role === 'client')
        {
            permissions = client;
        }
        else if (role === 'premium')
        {
            permissions = premium;
        }
            const dto = {
                name : role,
                permissions
            };

        const document = await roleModel.create(dto);
        return new Role({
            id: document._id,
            name: document.name,
            permissions: document.permissions
        });
    }
    async roleUpdated(id, body)
    {
        const document = await roleModel.findOneAndUpdate(
            { _id: id },
            body,
            { new: true }
        );
        return new Role({
            id: document._id,
            name: document.name,
            permissions: document.permissions
        });
    }
    async eraseRole(id)
    {
        const document = await roleModel.findOneAndDelete({ _id: id });
    }
}

export default RoleMongooseRepository;
