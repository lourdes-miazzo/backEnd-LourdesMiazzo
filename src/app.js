import express from "express"

import productRouter from "./routes/productRouter.js"
import cartRouter from "./routes/cartRouter.js"


const app= express()
app.use(express.json())
//la siguiente linea se agrega debido a que el dinamismo de los
// url aumentan
app.use(express.urlencoded({extended:true}))

app.use("/api/products", productRouter)
app.use("/api/carts", cartRouter)


app.listen(8083, ()=>{
    console.log("servidor escuchando en puerto 8083")
}) 

