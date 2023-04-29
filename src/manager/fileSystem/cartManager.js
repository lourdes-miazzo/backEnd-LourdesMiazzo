import fs from "fs"
import { nanoid } from "nanoid"
import ProductManager from "./productManager.js"


const newProduct = new ProductManager()

class CartManager{
    constructor(){
        this.path= "./src/cart.json"
    }

    async writeFiles(element){
        try{
            await fs.promises.writeFile(this.path, JSON.stringify(element, null, 2))
        }
        catch(e){
            throw new Error(e) 
        }
    }


    async readFiles(){
        try{
            const read = await fs.promises.readFile(this.path, "utf-8")
            //uso JSON.parse para convertir string en objeto y poder mostrarlo/leeerlo más facilmente
            return JSON.parse(read)
        }
        catch(e){
            throw new Error(e)
        }
    }

    async getCarts(){
        try{ 
            return await this.readFiles()
        }
        catch(e){
            throw new Error(e)
        }
    }

    async isExist(id){
        try{
            const exist = await this.getCarts()
            return exist.find(cart => cart.id === id)
        }
        catch(e){
            throw new Error(e)
        }
        
    }

    async addCart(){
        try{
            const cartDataOld = await this.getCarts()
            const id = nanoid(7)
            const arrayCart = [
                ...cartDataOld, 
                {
                    products:[], 
                    id: id
                }
            ]
            await this.writeFiles(arrayCart)
            return "Carrito agregado"
        }
        catch(e){
            throw new Error(e)
        }
    }

    async getCartId(id){
        try{
            const cartId = await this.isExist(id)
            if(!cartId){
                return `Carrito de compras con ID: ${id} no encontrado`
            }
            return cartId
        }
        catch(e){
            throw new Error(e)
        }
    }


    async addProductInCart(cid, pid){
        try{
            const cartExist = await this.isExist(cid)
            if(!cartExist) return `El carrito con ID: ${cid} no existe`

            const prodExist = await newProduct.isExist(pid)
            if(!prodExist) return `El producto con ID: ${pid} no existe`

            const completeCarts = await this.getCarts()
            const filterCart = completeCarts.filter(cart=> cart.id !== cid)

            if(cartExist.products.some(prod=> prod.id === pid)){
                const addSameInCart = cartExist.products.find(prod => prod.id=== pid)
                addSameInCart.quantity ++
                const cartProdAdded = [cartExist, ...filterCart]
                await this.writeFiles(cartProdAdded)
                return "Producto extra agregado al carrito"
            }else{
                cartExist.products.push({quantity: 1, id: pid})
                const cartNewProdAdded= [cartExist, ...filterCart]
                await this.writeFiles(cartNewProdAdded)
                return "Producto agregado al carrito correctamente"
            }
        }
        catch(e){
            throw new Error(e)
        }
    }

 
    }
    


export default CartManager
