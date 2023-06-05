import express from 'express';
import dotenv from "dotenv"
dotenv.config()
import mongoose from 'mongoose';

import productRouter from "./routes/productRouter.js"
import cartRouter from "./routes/cartRouter.js"
import sessionRouter from './routes/sessionRouter.js'
import userRouter from './routes/userRouter.js'
import roleRouter from './routes/roleRouter.js'
import errorHandler from './middlewares/errorHandler.js'

void(async() =>
{
    try
    {
        await mongoose.connect(process.env.MONGO_DB_URI, {
            useNewUrlParser:true,
            useUnifiedTopology: true
        }) 

        const app = express();
        app.use(express.json());
        app.use(express.urlencoded({ extended: true }));
        
        app.use("/api/products", productRouter)
        app.use("/api/carts", cartRouter)
        app.use("/api/sessions", sessionRouter)
        app.use("/api/users", userRouter)
        app.use("/api/roles", roleRouter)
        app.use(errorHandler)

        app.listen(process.env.NODE_PORT, () => {
            console.log(`Conectado al server en el puerto: ${process.env.NODE_PORT}`);
        });
    }
    catch (e)
    {
        console.log(e);
    }
})();


