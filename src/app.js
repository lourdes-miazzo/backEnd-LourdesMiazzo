import express from 'express';
import dotenv from "dotenv"
dotenv.config()
import { engine } from 'express-handlebars';
import { resolve } from 'path';
import { Server } from 'socket.io';
import { nanoid } from 'nanoid';
import mongoose from 'mongoose';
import productRouter from "./routes/productRouter.js"
import cartRouter from "./routes/cartRouter.js"
import viewsRouter from "./routes/viewsRouter.js"


void(async() =>
{
    try
    {
        await mongoose.connect(process.env.MONGO_DB_URI, {
            useNewUrlParser:true,
            useUnifiedTopology: true
        })
        
        const SERVER_PORT = 8083;
    
        const app = express();
        app.use(express.json());
        app.use(express.urlencoded({ extended: true }));

        const viewsPath = resolve('src/views');

        app.engine('handlebars', engine({
            layoutsDir: `${viewsPath}/layouts`,
            defaultLayout: `${viewsPath}/layouts/main.handlebars`,
        }));

        app.set('view engine', 'handlebars');
        app.set('views', viewsPath);

        app.use("/api/products", productRouter)
        app.use("/api/carts", cartRouter)
        app.use("/", viewsRouter)


        const httpServer = app.listen(SERVER_PORT, () => {
            console.log(`Conectado al server en el puerto: ${SERVER_PORT}`);
        });


        let productosArray= []


        const socketServer = new Server(httpServer);
        socketServer.on('connection', socket=>{
            console.log("nuevo cliente conectado")

            socket.emit('productList', productosArray)

            socket.on('newProd', (element)=>{
                element.id = nanoid(7)
                element.status = true
                productosArray.push(element)
                //se usa socketServer.emit para enviar a todos, incluso al socket que carga o elimina el producto
                socketServer.emit('productList', productosArray)
            })

            socket.on('deleteProd', (idDelete)=>{
                productosArray = productosArray.filter(prod=> prod.id !== idDelete)
                socketServer.emit('productList', productosArray)
            })

            socket.on('messages', async (element)=>{
                console.log(element)
                const result = await messagesModel(element)
                result.save()
                let arrayMensajes = await messagesModel.find()
                socketServer.emit('arrayMensajes' ,arrayMensajes)
            })
                
            
        }) 

    }
    catch (e)
    {
        console.log(e);
    }


})();


