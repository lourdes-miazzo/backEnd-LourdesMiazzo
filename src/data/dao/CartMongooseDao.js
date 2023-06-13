
import { cartsModel } from "../models/carts.model.js"

class CartMongooseDao{
    async getCarts(){
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
    async getOneCart(id){
            const document= await cartsModel.findById(id).populate('products._id')
            return document
    }
    async newCart(){
            const document= await cartsModel.create({products: []})
            return {
                id : document._id,
                products: document.products
                }
    }
    async addProd(id, pid){
            const updateProducts = await cartsModel.findOneAndUpdate(
                //primero busca si existe un elemento cart que coincida tando su _id con cid,
                // como su product dentto del array products con el pid. Si hay coincidencia aumenta en uno 
                //la cantidad dentro de products
                { _id: id, 'products._id': pid },
                { $inc: { 'products.$.quantity': 1 } },
                //new true sirve para que me muestre el cart actualizado y no su versión previa
                { new: true }
            )

            if (!updateProducts) {
                //si no hay productos dentro del carrito se pushea dentro del array products un producto con 
                //el pid y de cantidad 1
                await cartsModel.updateOne(
                    { _id: id },
                    { $push: { products: { _id: pid, quantity: 1 } } }
                )
            }

            const document = await cartsModel.findById(id);
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
    async deleteProd(id, pid){
            const document= await cartsModel.findByIdAndUpdate(
                {_id: id}, 
                {$pull: {products: {_id: pid}}}, 
                {new:true})
            return document
    }
    async deleteAllInsideCart(cid){
            const document = await cartsModel.findByIdAndUpdate(
                {_id:id}, 
                {$set: {products : []}})
            return document
    } 

    async productsUpdated(id, body){
        const document= await cartsModel.findOneAndUpdate(
            {_id: id}, 
            {$set: {products: body}},
            {new: true})
            return document
    }
    async oneProdUpdated(id, pid, body){
            const document= await cartsModel.findOneAndUpdate(
                {_id: id, 'products._id': pid},
                {$set: {'products.$.quantity': body.quantity}}, 
                {new: true})
            return document
    }
}

export default CartMongooseDao