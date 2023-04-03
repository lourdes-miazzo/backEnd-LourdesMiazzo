import { Router } from "express";
import ProductManager from "../productManager.js";

const productRouter = Router()

//se instancia la clase ProductManager para poder usar su métodos, 
const newProduct = new ProductManager()


productRouter.get("/", async(req,res)=>{
    try{
        let limit = +req.query.limit
        if(!limit){
            res.send(await newProduct.getProducts())
        }else{
        //se usa la informacion guardada en limites para hacer un slice del 
        //array, que comience en cero y muestre productos hasta el limite selecionado
            let allProducts = await newProduct.getProducts()
            let limitDefined= allProducts.slice(0, limit)
            res.status(200).send(limitDefined) 
        }
    }
    catch(error){
        res.status(404).send(error)
    }
})



productRouter.get("/:pid", async(req,res)=>{
    try{
    const pid= req.params.pid
    const getProd= await newProduct.getProductById(pid)
    res.status(200).send(getProd)
    }
    catch(error){
        res.status(400).send(error)
    }
})

productRouter.post("/", async (req,res)=>{
    try {
        const addedProd = req.body;
        const result = await newProduct.addProduct(addedProd);
        res.status(201).send(result);
    }
    catch (error) {
        res.status(404).send(error)
    }
})

productRouter.put("/:pid", async (req, res)=>{
    try{
        const pid= req.params.pid
        const body=req.body
        let update = await newProduct.updateProduct(body, pid)
        res.status(200).send(update)
    }
    catch(error){
        res.status(404).send(error)
    }  
})


productRouter.delete("/:pid", async(req,res)=>{
    try{
        const pid= req.params.pid
        const deleteProd= await newProduct.deleteProduct(pid)
        res.status(200).send(deleteProd)
    }
  catch(error){
    res.status(400).send(error)
  }
})



export default productRouter
