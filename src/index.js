
import dotenv from "dotenv"
dotenv.config()
import mongoose from 'mongoose';
import AppFactory from "./presentation/factories/AppFactory.js";



void(async() =>
{
    try
    {
        await mongoose.connect(process.env.MONGO_DB_URI, {
            useNewUrlParser:true,
            useUnifiedTopology: true
        }) 

        //esta linea de abajo podría ser así: const app= AppFactory.create(process.env.APPLICATION), 
        //si la dejo vacía como abajo usa la info de static y evito que si APPLICATION dentro de .env 
        //está vacía o no existe, me tire undefined
        const app= AppFactory.create() 
        app.init()
        app.build()
        app.listen()
    }
    catch (e)
    {
        console.log(e);
    }
})();


