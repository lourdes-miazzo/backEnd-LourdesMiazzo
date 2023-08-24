import container from '../../container.js';
import emailValidation from '../validations/session/emailValidation.js';
import passValidation from '../validations/session/passValidation.js';
import createUserValidation from '../validations/user/createUserValidation.js';

class SessionManager
{
    constructor()
    {
        this.repository = container.resolve('SessionRepository');
    }
    async getOneByEmail(email)
    {
        await emailValidation.parseAsync(email);
        return this.repository.getOneByEmail(email);
    }
    async collate(password, user)
    {
        await passValidation.parseAsync(password);
        return this.repository.collate(password, user);
    }
    async create(body, cartAssociated)
    {
        await createUserValidation.parseAsync(body);
        return this.repository.create(body, cartAssociated);
    }
    async forgetPass(dto)
    {
        await emailValidation.parseAsync(dto.email);
        await passValidation.parseAsync(dto.password);
        return this.repository.forgetPass(dto);
    }
    async changePass(dto)
    {
        return this.repository.changePass(dto);
    }
}

    export default SessionManager;
