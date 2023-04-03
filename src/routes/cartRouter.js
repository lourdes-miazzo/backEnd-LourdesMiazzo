import { Router } from "express";
import CartManager from "../cartManager.js";

const cartRouter = Router()

const carrito = new CartManager()


cartRouter.get("/", async(req,res)=>{
    try{
        const verCarritos= await carrito.getCarts()
        res.status(200).send(verCarritos)
    }
    catch(e){
        res.status(400).send(e)
    }
})

cartRouter.post("/", async(req,res)=>{
    try{
    const nuevoCarrito = await carrito.addCart()
    res.status(200).send(nuevoCarrito)
    }
    catch(e){
        res.status(400).send(e)
    }
})
 

cartRouter.get("/:cid", async (req,res)=>{
    try{
        const cid = req.params.cid
        const cartId = await carrito.getCartId(cid)
        res.status(200).send(cartId)
    }
    catch(e){
        res.status(400).send(e)
    }
})

cartRouter.post("/:cid/products/:pid", async(req,res)=>{
    try{
        const cid= req.params.cid
        const pid = req.params.pid
        const addProdInCart = await carrito.addProductInCart(cid, pid)
        res.status(200).send(addProdInCart)
    }
    catch(e){
        res.status(400).send(e)
    }
})


export default cartRouter
