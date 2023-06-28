import { v4 as uuidv4 } from 'uuid'
import {resolve} from "path"
const resolverPath = resolve('IMG')

import CartManager from "../../domain/manager/CartManager.js"
import ProductManager from "../../domain/manager/ProductManager.js"
import TicketManager from "../../domain/manager/TicketManager.js"
import { transport } from "../../shared/index.js"
import mailTicketTemplate from "../templates/mailTicketTemplate.js"

export const gelList = async(req,res,next)=>{
    try{
        let limit = req.query.limit ? +req.query.limit : 10 
        let page = req.query.page ? +req.query.page : 1

        const manager = new CartManager();
        const carts = await manager.getCarts( limit, page );
    
        res.status(200).send({
            status: 'success',
            message: 'All carts found',
            carts: carts.docs, ...carts,
            docs: undefined });
    }
    catch(e){
        next(e)
    }
}

export const getOne = async (req,res,next)=>{
    try{
        const {id} = req.params

        const manager = new CartManager()
        const cartId = await manager.getOneCart(id)

        res.status(200).send({
            result: "success", 
            message: `Cart with Id: ${id} found`,
            payload: cartId})
    }
    catch(e){
        next(e)
    }
}

export const saveNew = async(req,res,next)=>{
    try{
        const manager = new CartManager()
        const nuevoCarrito = await manager.newCart()

        res.status(201).send({
            result: "success", 
            message: `New cart created`,
            payload: nuevoCarrito})
        }
    catch(e){
        next(e)
    }
}

export const saveProdInCart = async (req, res,next) => {
        try {
            const id = req.params.id
            const pid= req.params.pid

            const manager= new CartManager()
            const prodInCart= await manager.addProd(id, pid)

            res.status(200).send({
                result: "success", 
                message: `Product ${pid} added in cart ${id}`,
                payload:prodInCart})
        
        } catch (e) {
            next(e)
        }
}
export const purchaseProductsInCart= async(req,res,next)=>{
    try{
            const id = req.params.id
        
            const product = new ProductManager()
            const manager= new CartManager()
            //ver que prod están en cart
            const getProdInCart= await manager.purchaseProd(id)
            const prodInCartInfo = getProdInCart.products

            let amount = 0
            let noStockArray = []
            //obtener info completa de cada prod para obtener el precio y poder multiplicarlo por la cantidad,
            //así recupero el valor final total, 
            for (let index = 0; index < prodInCartInfo.length; index++) {
                let idProd = prodInCartInfo[index].id
                let quantityProd = prodInCartInfo[index].quantity
                let completeProductInfo = await product.getOne(idProd)

                const stockControl = completeProductInfo.stock - quantityProd

                //si un prod no tiene stock suficiente no se suma y su id se guarda en un array
                if(stockControl < 0){
                    noStockArray.push({id: idProd, quantity: quantityProd})
                    continue
                } 

                //si en cambio hay suficiente stock se guarda en el producto el stock modificado
                let dto= {
                    ...completeProductInfo, 
                    stock: stockControl
                }
                const prodModific = await product.updateProd(idProd, dto)

                let subTotal = completeProductInfo.price * prodInCartInfo[index].quantity
                amount += subTotal 
            } 

            //se arma la info del ticket para enviar y crear ticket en db
            const dtoTicket = {
                purchaseDateTime: new Date().toLocaleString('es-AR', {timeZone: 'America/Argentina/Buenos_Aires'}),
                amount: amount,
                purchaser: req.user.email
            }
            dtoTicket.code = uuidv4()
            
            const ticket = new TicketManager()
            const newTicket = await ticket.createNewTicket(dtoTicket)

            //se envia al mail del comprador la info del ticket
            const ticketString = JSON.stringify(newTicket, null, 2)
            const mailContent= mailTicketTemplate(ticketString)
            const mail= {
                from : "lourdesmiazzo@gmail.com",
                to: req.user.email,
                subject: "Ticket de compra",
                html: mailContent,
                attachments: [{
                    filename: 'iconoLourdes.png',
                    path: resolverPath + "/iconoLourdes.png",
                    cid: '1'
                }]        
            }
            await transport.sendMail(mail)

            
            await manager.deleteAllInsideCart(id)
            //si hay productos que no se pudieron comprar por falta de stock se envia esta respuesta
            if(noStockArray.length > 0){
                return res.status(201).send({
                    message: "Not all product were purchased",
                    Ticket: newTicket,
                    productsWithNoStockEnough: noStockArray
                })
            }

            //si todos los prod se pudieron comprar se envía esta
            res.status(201).send({
                message: "Products purchased successfully",
                Ticket: newTicket
            }) 
    }
    catch(e){
        next(e)
    }
}

export const deleteProdInCart = async (req,res,next)=>{
    try{
        const id = req.params.id
        const pid= req.params.pid

        const manager= new CartManager()
        const prodInCart= await manager.deleteProd(id, pid)

            res.status(200).send({
                result: "success", 
                message: `Product ${pid} deleted from cart ${id}`,
                payload:prodInCart})
    }catch (e) {
        next(e)
        }
}

export const deleteAllProdInCart= async(req,res,next)=>{
    try{
        const id = req.params.id

        const manager= new CartManager()
        const deleteAllInCart= await manager.deleteAllInsideCart(id)
    
        res.status(200).send({
            result: "success", 
            message: `Cart ${id} empty`,
            payload:deleteAllInCart})
    }catch (e) {
        next(e)
        }
}

export const updateCart= async (req,res,next)=>{
    try{
        const {id} = req.params
        const body= req.body

        const manager= new CartManager()
        const updateProds= await manager.productsUpdated(id, body)

        res.status(200).send({
            result: "success", 
            message: `Cart ${id} updated`,
            payload: updateProds})
    }catch (e) {
        next(e)
        }
}

export const updateProdInCart = async (req,res,next)=>{
    try{
        const {id, pid} = req.params
        const body = req.body

        const manager= new CartManager()
        const updateOneProd=  await manager.oneProdUpdated(id, pid, body)
        
        if(!updateOneProd){
            res.status(400).send({
                message: "you don't have the product you want to update"})
        }else{
            res.status(200).send({
                result: "success", 
                message: `Product ${pid} updated in cart ${id}`,
                payload: updateOneProd})
        }
    }catch (e) {
        next(e)
        }

}

