import ticketModel from '../models/ticketModel.js';
import Ticket from '../../domain/entities/ticket.js';

class TicketMongooseRepository
{
    async createNewTicket(data)
    {
        const document = await ticketModel.create(data);
        return new Ticket({
            id: document._id,
            code: document.code,
            purchaseDateTime: document.purchaseDateTime,
            amount: document.amount,
            purchaser: document.purchaser
        });
    }
}

export default TicketMongooseRepository;
