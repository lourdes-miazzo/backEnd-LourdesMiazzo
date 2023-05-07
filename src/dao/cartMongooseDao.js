
import { cartsModel } from "../models/carts.model.js"

class CartMongooseDao{
    async getCarts(){
        try{
            const document= await cartsModel.find().populate('products._id')
            return document.map(doc=>({
                id : doc._id,
                products: doc.products.map(item=>{
                    return {
                        id: item._id,
                        quantity: item.quantity
                    }
                })
            }))
        }
        catch(e){
            throw e
        }
    }
    async getOneCart(cid){
        try{
            const document= await cartsModel.findById(cid).populate('products._id')
            return document
        }
        catch(e){
            throw e
        }
    }
    async newCart(){
        try{
            const document= await cartsModel.create({products: []})
            return {
                id : document._id,
                products: document.products
                }
        }
        catch(e){
            throw e
        }
    }
    async addProd(cid, pid){
        try {
            const updateProducts = await cartsModel.findOneAndUpdate(
                //primero busca si existe un elemento cart que coincida tando su _id con cid,
                // como su product dentto del array products con el pid. Si hay coincidencia aumenta en uno 
                //la cantidad dentro de products
                { _id: cid, 'products._id': pid },
                { $inc: { 'products.$.quantity': 1 } },
                //new true sirve para que me muestre el cart actualizado y no su versión previa
                { new: true }
            )

            if (!updateProducts) {
                //si no hay productos dentro del carrito se pushea dentro del array products un producto con 
                //el pid y de cantidad 1
                await cartsModel.updateOne(
                    { _id: cid },
                    { $push: { products: { _id: pid, quantity: 1 } } }
                )
            }

            const document = await cartsModel.findById(cid);
            return {
                id: document._id,
                products: document.products.map(item => {
                    return {
                        _id: item._id,
                        quantity: item.quantity
                    }
                })
            }
        }
        catch(e){
            throw e
        }
    }
    async deleteProd(cid, pid){
        try{
            const document= await cartsModel.findByIdAndUpdate(
                {_id: cid}, 
                {$pull: {products: {_id: pid}}}, 
                {new:true})
            return document
        }
        catch(e){
            throw e
        }
    }
    async deleteAllInsideCart(cid){
        try{
            const document = await cartsModel.findByIdAndUpdate(
                {_id:cid}, 
                {$set: {products : []}})
           return document
        } catch(e){
            throw e
        }
    } 

    async productsUpdated(cid, body){
        try{
        const document= await cartsModel.findOneAndUpdate(
            {_id: cid}, 
            {$set: {products: body}},
            {new: true})
            return document
        }
        catch(e){
            throw e
        }
    }
    async oneProdUpdated(cid, pid, body){
        try{
            const document= await cartsModel.findOneAndUpdate(
                {_id: cid, 'products._id': pid},
                {$set: {'products.$.quantity': body.quantity}}, 
                {new: true})
            return document
        }
        catch(e){
            throw e
        }
    }
}

export default CartMongooseDao