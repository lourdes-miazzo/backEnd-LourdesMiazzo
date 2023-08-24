import { createContainer, asClass, Lifetime } from 'awilix';
import UserMongooseRepository from './data/repository/UserMongooseRepository.js';
import ProductMongooseRepository from './data/repository/ProductMongooseRepository.js';
import CartMongooseRepository from './data/repository/CartMongooseRepository.js';
import RoleMongooseRepository from './data/repository/RoleMongooseRepository.js';
import SessionMongooseRepository from './data/repository/SessionMongooseRepository.js';
import TicketMongooseRepository from './data/repository/TicketMongooseRepository.js';

const container = createContainer();
container.register('UserRepository', asClass(UserMongooseRepository), { lifetime: Lifetime.SINGLETON });
container.register('ProductRepository', asClass(ProductMongooseRepository), { lifetime: Lifetime.SINGLETON });
container.register('CartRepository', asClass(CartMongooseRepository), { lifetime: Lifetime.SINGLETON });
container.register('RoleRepository', asClass(RoleMongooseRepository), { lifetime: Lifetime.SINGLETON });
container.register('SessionRepository', asClass(SessionMongooseRepository), { lifetime: Lifetime.SINGLETON });
container.register('TicketRepository', asClass(TicketMongooseRepository), { lifetime: Lifetime.SINGLETON });

export default container;
