import express from 'express'
import swaggerUiExpress from "swagger-ui-express"
import swaggerJsdoc from "swagger-jsdoc"
import path from 'path'

import productRouter from "../routes/productRouter.js"
import cartRouter from "../routes/cartRouter.js"
import sessionRouter from '../routes/sessionRouter.js'
import userRouter from '../routes/userRouter.js'
import roleRouter from '../routes/roleRouter.js'

import errorHandler from '../middlewares/errorHandler.js'


class AppExpress{
    init(){
        this.app = express();
        this.app.use(express.json());
        this.app.use(express.urlencoded({ extended: true }));
    }
    setupSwagger() {
        const relativeRoute= ""
        const absoluteRoute= path.resolve(relativeRoute)
        const swaggerOptions = {
            definition: {
                openapi: "3.0.1",
                info: {
                    title: "E-commerce de obras de arte",
                    description: "Documentacion APi para e-commerce de obras de arte",
                }, 
            },
            apis: [`${absoluteRoute}/docs/**/*.yaml`],
        };

        const specs = swaggerJsdoc(swaggerOptions);
        this.app.use("/apidocs", swaggerUiExpress.serve, swaggerUiExpress.setup(specs))
        
    }

    build(){
        this.setupSwagger()
        this.app.use("/api/products", productRouter)
        this.app.use("/api/carts", cartRouter)
        this.app.use("/api/sessions", sessionRouter)
        this.app.use("/api/users", userRouter)
        this.app.use("/api/roles", roleRouter)

        this.app.use(errorHandler)
    }
    listen(){
        return this.app.listen(process.env.NODE_PORT, () => {
            console.log(`Conectado al server en el puerto: ${process.env.NODE_PORT}`)
        })
    }
    callback(){
        return this.app
    }
    close(){
        this.server.close()
    }
}

export default AppExpress