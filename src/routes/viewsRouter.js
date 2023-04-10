import { Router } from "express";
import ProductManager from "../productManager.js";


const newProduct= new ProductManager()


const viewsRouter= Router()

viewsRouter.get("/", async(req,res)=>{
    try{
        const productos= await newProduct.getProducts()
        res.render('index', {title: "productos disponibles", productos})
    }
    catch(error){
        res.status(404).send(error)
    }
  
})

viewsRouter.get("/realtimeproducts",  async (req,res)=>{
    try{
        res.render('realTimeProducts', {title: "Real Time Products"});
        }
    catch(error){
        res.status(404).send(error)
    }
})
export default viewsRouter