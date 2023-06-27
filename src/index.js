import dotenv from "dotenv"
dotenv.config();
import DbFactory from "./data/factories/DbFactory.js"
import AppFactory from "./presentation/factories/AppFactory.js";



void(async() =>
{
    try
    {
        const db = DbFactory.create(process.env.DB)
        db.init(process.env.DB_URI)

        const app= AppFactory.create(process.env.PAYLOAD) 
        app.init()
        app.build()
        app.listen()
    }
    catch (e)
    {
        console.log(e);
    }
})();


