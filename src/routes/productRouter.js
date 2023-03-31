import { Router } from "express";
import ProductManager from "../productManager.js";

const productRouter = Router()

//se instancia la clase ProductManager para poder usar su método readFiles(), 
//no uso getProducts()porque en realidad en getProducts estoy llamando a readFiles 
//que es el que se encarga de parsear el arcivo JSON para leerlo
const newProduct = new ProductManager()
const productos = newProduct.readFiles()

productRouter.get("/", async(req,res)=>{
    try{
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
        res.status(200).send(limitDefined) 
        }
    }
    catch(error){
        res.send(error)
    }
  
})



productRouter.get("/:pid", async(req,res)=>{
    try{
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
         res.status(404).send("Product not found")
     }
     res.status(200).send("Producto Encontrado", prodId)
    }
    catch(error){
        res.status(400).send(error)
    }
    })

productRouter.post("/", async (req,res)=>{
    try {
        const addedProd = req.body;
        console.log(`Router:`,addedProd);
        const result = await newProduct.addProduct(addedProd);
        res.send(result);
    }
    catch (error) {
        res.send(error);
    }
})

productRouter.put("/:pid", async (req, res)=>{
    try{
        const pid= +req.params.pid
        const {body}=req.body
        let update = await newProduct.updateProduct(body, pid)
        res.status(200).send("Producto Actualizado", update)
    }
    catch(error){
        res.status(404).send(error)
    }  
    })

productRouter.delete("/:pid", async(req,res)=>{
    try{
        const pid= +req.params.pid
        const deleteProd= await newProduct.deleteProduct(pid)
        res.send("productoEliminado", deleteProd)
    }
  catch(error){
    res.send(error)
  }
})



export default productRouter