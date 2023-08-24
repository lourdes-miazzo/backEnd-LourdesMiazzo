import container from '../../container.js';
import idValidation from '../validations/idValidation.js';
import createUserValidation from '../validations/user/createUserValidation.js';
import updateUserValidation from '../validations/user/updateUserValidation.js';
import EmailManager from './EmailManager.js';


class UserManager
{
    constructor()
    {
        this.repository = container.resolve('UserRepository');
    }

    async list(limit, page)
    {
        return this.repository.list(limit, page);
    }
    async listSimplified()
    {
        return this.repository.listSimplified();
    }
    async getOne(id)
    {
        await idValidation.parseAsync(id);
        return this.repository.getOne(id);
    }
    async create(body)
    {
        await createUserValidation.parseAsync(body);
        return this.repository.create(body);
    }
    async saveCartInUser(id, createCart)
    {
        await idValidation.parseAsync(id);
        return this.repository.saveCartInUser(id, createCart);
    }
    async updateOne(id, body)
    {
        await updateUserValidation.parseAsync(id, body);
        return this.repository.updateOne(id, body);
    }
    async updateConnection(id, body)
    {
        return this.repository.updateConnection(id, body);
    }
    async deleteOne(id)
    {
        await idValidation.parseAsync(id);
        return this.repository.deleteOne(id);
    }
    async findInactive()
    {
        const now = new Date();
        const lessTwo = new Date(now - 2 * 24 * 60 * 60 * 1000);

        const emailManager = new EmailManager();
        const inactiveUsers = await this.repository.findInactive(lessTwo);

        if (inactiveUsers.length === 0)
        {
            return;
        }
        inactiveUsers.forEach(async userInact =>
            {
                await emailManager.emailInactive(userInact.email, userInact.id);
                await this.deleteOne(userInact.id);
            });
    }
}


export default UserManager;
