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


app.listen(8082, ()=>{
    console.log("servidor escuchando en puerto 8082")
}) 





//se instancia la clase ProductManager para poder usar su método readFiles(), 
//no uso getProducts()porque en realidad en getProducts estoy llamando a readFiles 
//que es el que se encarga de parsear el arcivo JSON para leerlo
   //const newProduct = new ProductManager()
   //const productos = newProduct.readFiles()


/* app.get("/products",async (req,res)=>{
    //se crea la variable limit que guarda en su interior lo que viene por parametro, 
    //se pone el + para que la string se transforme en numero
    let limit = +req.query.limit
    //si no se pasa un numero como limite se envia la lista completa de los productos
        if(!limit){
            res.send(await productos)
        }else{
            //sino se usa la informacion guardada en limites para hacer un slice del 
            //array, que comience en cero y muestre productos hasta el limite selecionado
            let allProducts = await productos
            let limitDefined= allProducts.slice(0, limit)
            res.send(limitDefined) 
        }
    })

app.get("/products/:pid",async (req, res)=>{
    //se guarda en variable pid el valor recibido por parametro que llega en modo string: ""
    const pid= req.params.pid
    const allProducts = await productos
    //se busca a través de find el objeto dentro del array cuyo id coincide con el id 
    //pasado por parametro. Se usa comparacion == porque el numero que llega lo hace como string.
    // Otra forma de hacerlo es ponerle + delante de req.params.pid y en ese caso la comparacion 
    //puede ser realizada con === (igualdad estricta)
    const prodId= allProducts.find(prod=> prod.id == pid)
    //si no se encuentra el objeto con un id que coincida se avisa del error
    if(!prodId){
        res.send("Product not found")
    }
    res.send(prodId)
})

 */
