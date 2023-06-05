import CartMongooseDao from "../../dao/CartMongooseDao.js"
import idValidation from "../../validations/idValidation.js"
import pidValidation from "../../validations/product/pidValidation.js"
import productUpdatedIncartValidation from "../../validations/cart/prodUpdatedInCartValidation.js"
import updateCartValidation from "../../validations/cart/updateCartValidation.js"

class CartManager{
    constructor(){
        this.dao= new CartMongooseDao()
    }
    async getCarts(){
        return this.dao.getCarts()
    }
    async getOneCart(id){
        await idValidation.parseAsync(id)
        return this.dao.getOneCart(id)
    }
    async newCart(){
        return this.dao.newCart()
    }
    async addProd(id, pid){
        await idValidation.parseAsync(id)
        await pidValidation.parseAsync(pid)
        return this.dao.addProd(id, pid)
    }
    async deleteProd(id, pid){
        await idValidation.parseAsync(id)
        await pidValidation.parseAsync(pid)
        return this.dao.deleteProd(id, pid)
    }
    async deleteAllInsideCart(id){
        await idValidation.parseAsync(id)
        return this.dao.deleteAllInsideCart(id)
    }
    async productsUpdated(id, body){
        await updateCartValidation.parseAsync(id, {...body})
        return this.dao.productsUpdated(id, body)
    }
    async oneProdUpdated(id, pid, body){
        await productUpdatedIncartValidation.parseAsync(id, pid, {...body})
        return this.dao.oneProdUpdated(id, pid, body)
    }

}

export default CartManager