import dotenv from 'dotenv';
dotenv.config();
import cron from 'node-cron';
import DbFactory from './data/factories/DbFactory.js';
import AppFactory from './presentation/factories/AppFactory.js';
import UserManager from './domain/manager/UserManager.js';


void(async() =>
{
    try
    {
        const db = DbFactory.create(process.env.DB);
        db.init(process.env.DB_URI);

        const app = AppFactory.create(process.env.PAYLOAD);
        app.init();
        app.build();
        app.listen();

        const manager = new UserManager();
        cron.schedule('0 0 */2 * *', async() =>
{
            await manager.findInactive();
            console.log('Inactive users deleted');
        });
    }
    catch (e)
    {
        console.log(e);
    }
})();


