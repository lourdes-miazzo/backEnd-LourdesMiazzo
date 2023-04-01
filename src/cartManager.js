import fs from "fs"

class CartManager{
    #products= []
    path=""
    #id = 0
    constructor(){
        this.path= "./src/cart.json"
        this.#products=[]
    }

    async readFiles(){
        try{
            let read = await fs.promises.readFile(this.path, "utf-8")
            return JSON.parse(read)
        }
        catch(e){
            throw new Error(e)
        }
    }

    async getCart(){
        try{
            let cartData = await this.readFiles()
            return cartData
        }
        catch(e){
            this.#id++
            const cart= {
                products : this.#products,
                id: this.#id
            }
            await fs.promises.writeFile(this.path, cart)
            return `No tenias carrito, ahora hemos creado uno`
        }
    }

    async getProductInCartId(id){
        try{
            const cart = await this.readFiles()
            const cartId = cart.find(idCart=> idCart === id)
            if(!cartId){
                return "El carrito de compras no existe"
            }
            return cartId.products
        }
        catch(e){
            throw new Error(e)
        }
    }


    async addProductInCart(id ,products){
        try{

        }
        catch(e){
            throw new Error(e)
        }
    }
}



export default CartManager