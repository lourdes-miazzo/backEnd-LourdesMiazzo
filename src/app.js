import express from 'express';
import dotenv from "dotenv"
dotenv.config()
import mongoose from 'mongoose';
import session from 'express-session';
import mongoStore from 'connect-mongo';

import productRouter from "./routes/productRouter.js"
import cartRouter from "./routes/cartRouter.js"
import sessionRouter from './routes/sessionRouter.js';
import userRouter from './routes/userRouter.js';



void(async() =>
{
    try
    {
        await mongoose.connect(process.env.MONGO_DB_URI, {
            useNewUrlParser:true,
            useUnifiedTopology: true
        }) 
        
        const SERVER_PORT = 8081;
    
        const app = express();
        app.use(express.json());
        app.use(express.urlencoded({ extended: true }));
        app.use(session({
            store: mongoStore.create({
                mongoUrl: process.env.MONGO_DB_URI,
                mongoOptions: { useNewUrlParser:true, useUnifiedTopology: true },
                ttl: 10
            }),
            secret: 'CoderS3cR3tC0D3',
            resave: false,
            saveUninitialized: false
        }))

        app.use("/api/products", productRouter)
        app.use("/api/carts", cartRouter)
        app.use("/api/sessions", sessionRouter)
        app.use("/api/users", userRouter)

        app.listen(SERVER_PORT, () => {
            console.log(`Conectado al server en el puerto: ${SERVER_PORT}`);
        });

    }
    catch (e)
    {
        console.log(e);
    }


})();


