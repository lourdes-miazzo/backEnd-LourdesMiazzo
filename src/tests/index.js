import dotenv from 'dotenv';
dotenv.config();

import AppFactory from '../presentation/factories/AppFactory.js';
import DbFactory from '../data/factories/DbFactory.js';

const initServer = (async() =>
{
    try
    {
        const db = DbFactory.create(process.env.DB);
        db.init(process.env.DB_URI);

        const app = AppFactory.create(process.env.PAYLOAD);
        app.init();
        app.build();

        return {
            app,
            db
        };
    }
    catch (e)
    {
        console.log(e);
    }
});

export default initServer;
