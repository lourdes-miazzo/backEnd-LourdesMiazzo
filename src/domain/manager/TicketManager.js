import container from '../../container.js';
import createTicketValidation from '../validations/ticket/createTicketValidation.js';

class TicketManager
{
    constructor()
    {
        this.repository = container.resolve('TicketRepository');
    }
    async createNewTicket(data)
    {
        await createTicketValidation.parseAsync(data);
        return this.repository.createNewTicket(data);
    }
}

export default TicketManager;
