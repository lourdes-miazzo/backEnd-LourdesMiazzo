import fs from 'fs';
import { nanoid } from 'nanoid';

class ProductManager{
    constructor(){
        this.path= "./src/products.json"
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
            let read = await fs.promises.readFile(this.path, "utf-8")
            //uso JSON.parse para convertir string en objeto y poder mostrarlo/leeerlo más facilmente
            return JSON.parse(read)
        }
        catch(e){
            throw new Error(e)
        }
    }


    async isExist(id){
        try{
            const idExist= await this.getProducts()
            return idExist.find(prod=> prod.id === id)
        }
        catch(e){
            throw new Error(e)
        }
    }


    async getProducts(){
        try{ 
            return await this.readFiles()
        }
        catch(e){
            throw new Error(e)
        }
    }


    async addProduct(element){
        try{
            const data = await this.getProducts()
            const repeatedCode= data.find(repCode=> repCode.code === element.code)
            if(repeatedCode){
                return `El código ${element.code} está repetido`
            }else{
                const valorVacio = Object.values(element).includes(undefined)
                if(!valorVacio){
                    element.status = true
                    element.id= nanoid(7)
                    const addingProd = [...data, element]
                    await this.writeFiles(addingProd)
                    return "Producto agregado correctamente"
                }else{
                    return "Todos los campos son obligatorios"
                }
            }
        }
        catch(e){
            throw new Error(e)
        }
    }




    async getProductById(id){
        try{
            const product = await this.isExist(id)
            if(!product){
                return `Producto con ID: ${id} no encontrado`
            }else{
                return product
            }
        }
        catch(e){
            throw new Error(e)
        }
    } 


    async updateProduct(product,id){ 
        try{
        const prodExistent = await this.isExist(id)
        if(!prodExistent){
            "Producto a ser modificado no encontrado"
        }else{
            await this.deleteProduct(id)
            const oldProd= await this.getProducts()
            const updated= [{...product, id : id}, ...oldProd]
            await this.writeFiles(updated)
            return `Producto modificado correctamente` 
        }
        }
        catch(e){
            throw new Error(e)
        }
    
    }

    async deleteProduct(id){
        try{
            const prodExistent = await this.isExist(id)
            if(prodExistent){
                const data = await this.getProducts()
                const prodDeleted= data.filter(p=> p.id !== id)
                await this.writeFiles(prodDeleted)
                return "Producto eliminado correctamente"
            }
            else{
                return "El producto que quieres eliminar no existe"
            }
        }
        catch(e){
            throw new Error(e)
        }
    }
}

export default ProductManager;

