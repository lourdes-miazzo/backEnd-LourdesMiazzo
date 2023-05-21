import CartMongooseDao from "../../dao/CartMongooseDao.js"


class CartManager{
    constructor(){
        this.dao= new CartMongooseDao()
    }
    async getCarts(){
            return this.dao.getCarts()
    }
    async getOneCart(id){
            return this.dao.getOneCart(id)
    }
    async newCart(){
            return this.dao.newCart()
    }
    async addProd(id, pid){
            return this.dao.addProd(id, pid)
    }
    async deleteProd(id, pid){
            return this.dao.deleteProd(id, pid)
    }
    async deleteAllInsideCart(id){
            return this.dao.deleteAllInsideCart(id)
    }
    async productsUpdated(id, body){
            return this.dao.productsUpdated(id, body)
    }
    async oneProdUpdated(id, pid, body){
            return this.dao.oneProdUpdated(id, pid, body)
    }
}

export default CartManager