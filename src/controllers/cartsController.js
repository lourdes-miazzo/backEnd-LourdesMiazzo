import CartManager from "../manager/mongoDB/cartManager.js"
import { cartsModel } from "../models/carts.model.js"

export const gelList = async(req,res)=>{
    try{
        const manager = new CartManager
        const verCarritos= await manager.getCarts()

        res.status(200).send({
            result: "success", 
            message: `Carts found`, 
            payload: verCarritos})
    }
    catch(e){
        res.status(400).send(e)
    }
}

export const getOne = async (req,res)=>{
    try{
        const cid = req.params.cid
        const manager = new CartManager
        const cartId = await manager.getOneCart(cid)

        res.status(200).send({
            result: "success", 
            message: `Cart with Id: ${cid} found`,
            payload: cartId})
    }
    catch(e){
        res.status(400).send(e)
    }
}

export const saveNew = async(req,res)=>{
    try{
        const manager = new CartManager
        const nuevoCarrito = await manager.newCart()

        res.status(201).send({
            result: "success", 
            message: `New cart created`,
            payload: nuevoCarrito})
        }
    catch(e){
        res.status(400).send(e)
    }
}
 

export const saveProdInCart = async (req, res) => {
        try {
            const {cid, pid} = req.params
            const manager= new CartManager
            const prodInCart= await manager.addProd(cid, pid)

            res.status(200).send({
                result: "success", 
                message: `Product ${pid} added in cart ${cid}`,
                payload:prodInCart})
        
        } catch (e) {
            res.status(400).send(e);
        }
}



