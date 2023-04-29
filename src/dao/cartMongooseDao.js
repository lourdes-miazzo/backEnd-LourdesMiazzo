import { cartsModel } from "../models/carts.model.js"

class CartMongooseDao{
    async getCarts(){
        try{
            const document= await cartsModel.find()
            return document.map(doc=>({
                id : doc._id,
                products: doc.products.map(item=>{
                    return {
                        product: item.product,
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
            const document= await cartsModel.findById(cid)
            return {
                id : document._id,
                products: document.products.map(item=>{
                    return {
                        product: item.product,
                        quantity: item.quantity
                    }
                })
            }
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
                { _id: cid, 'products.product': pid },
                { $inc: { 'products.$.quantity': 1 } },
                //new true sirve para que me muestre el cart actualizado y no su versión previa
                { new: true }
            )

            if (!updateProducts) {
                //si no hay productos dentro del carrito se pushea dentro del array products un producto con 
                //el pid y de cantidad 1
                await cartsModel.updateOne(
                    { _id: cid },
                    { $push: { products: { product: pid, quantity: 1 } } }
                )
            }

            const document = await cartsModel.findById(cid);
            return {
                id: document._id,
                products: document.products.map(item => {
                    return {
                        product: item.product,
                        quantity: item.quantity
                    }
                })
            }
    }
    catch(e){
        throw e
    }
}
}

export default CartMongooseDao