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
}

export default CartManager