import { Router } from "express";
import CartManager from "../cartManager.js";

const cartRouter = Router()

const carrito = new CartManager

cartRouter.post("/", async(req,res)=>{
    try{

    }
    catch(error){
        res.send(error)
    }
})

cartRouter.get("/:cid", async (req,res)=>{
    try{
        
    }
    catch(error){
        res.send(error)
    }
})

cartRouter.post("/:cid/products/:pid", async(req,res)=>{
    try{

    }
    catch(error){
        res.send(error)
    }
})


export default cartRouter