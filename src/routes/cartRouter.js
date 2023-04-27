import { Router } from "express";
import { cartsModel } from "../dao/models/carts.model.js";
import { productsModel } from "../dao/models/products.models.js";


const cartRouter = Router()



cartRouter.get("/", async(req,res)=>{
    try{
        const verCarritos= await cartsModel.find()
        res.status(200).send({result: "succes", message: `Carts found`, payload: verCarritos})
    }
    catch(e){
        res.status(400).send(e)
    }
})

cartRouter.get("/:cid", async (req,res)=>{
    try{
        const cid = req.params.cid
        const cartId = await cartsModel.findById(cid)
        res.status(200).send({result: "succes", message: `Cart with Id: ${cid} found`, payload: cartId})
    }
    catch(e){
        res.status(400).send(e)
    }
})

cartRouter.post("/", async(req,res)=>{
    try{
    const nuevoCarrito = await cartsModel.create({products: []})
    nuevoCarrito.save()
    res.status(200).send({result: "succes", message: `New cart created`, payload: nuevoCarrito})
    }
    catch(e){
        res.status(400).send(e)
    }
})
 

cartRouter.post("/:cid/products/:pid", async(req,res)=>{
    try{
        const cid= req.params.cid
        const pid = req.params.pid
        const prodExist = await productsModel.findById(pid)
        console.log(prodExist)
        if(!prodExist){
            res.status(404).send({ message: "Product not found" });
        }
        const cart = await cartsModel.findById(cid)
        console.log(cart)
        if(!cart){
            res.status(404).send({ message: "Cart not found" });
    
        } 
        const prodIncart= await cartsModel.find({_id: cid, "products.product": pid})
        console.log(prodIncart)
        if(!prodIncart){
            const addProd = await cartsModel.updateOne({_id: cid},{$push: {products: {product: pid, quantity: 1}}})
            res.status(200).send({result: "succes", message: `Product added successfully`, payload: addProd})
        }else{
            const oneMoreProd =await cartsModel.updateOne({_id: cid, "products.product": pid},{$inc: {"products.$.quantity": 1}})
            res.status(200).send({result: "succes", message: `One more product added successfully`, payload: oneMoreProd})
        }
    }
    catch(e){
        res.status(400).send(e)
    }
})



export default cartRouter
