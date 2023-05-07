import CartMongooseDao from "../../dao/cartMongooseDao.js"


class CartManager{
    constructor(){
        this.dao= new CartMongooseDao()
    }
    async getCarts(){
        try{
            return this.dao.getCarts()
        }
        catch(e){
            throw e
        }
    }
    async getOneCart(cid){
        try{
            return this.dao.getOneCart(cid)
        }
        catch(e){
            throw e
        }
    }
    async newCart(){
        try{
            return this.dao.newCart()
        }
        catch(e){
            throw e
        }
    }
    async addProd(cid, pid){
        try{
            return this.dao.addProd(cid, pid)
        }
        catch(e){
            throw e
        }
    }
    async deleteProd(cid, pid){
        try{
            return this.dao.deleteProd(cid, pid)
        }
        catch(e){
            throw e
        }
    }
    async deleteAllInsideCart(cid){
        try{
            return this.dao.deleteAllInsideCart(cid)
        }
        catch(e){
            throw e
        }
    }
    async productsUpdated(cid, body){
        try{
            return this.dao.productsUpdated(cid, body)
        }
        catch(e){
            throw e
        }
    }
    async oneProdUpdated(cid, pid, body){
        try{
            return this.dao.oneProdUpdated(cid, pid, body)
        }
        catch(e){
            throw e
        }
    }
}

export default CartManager