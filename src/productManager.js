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

/* let main= async()=>{
    try{ 

        const productosNuevos = new ProductManager()
        console.log(await  productosNuevos.getProducts())

        console.log(await productosNuevos.addProduct("Hexagonal transicional 0.1", "20 por 20 cms, enmarcadas", 35000, "https://firebasestorage.googleapis.com/v0/b/ecommerceart-fb0d5.appspot.com/o/2021-4.jpg?alt=media&token=c5570257-81f9-4f03-bcc6-c8b75f4e5ee4","jkl122", 4, "s"))
        console.log( await productosNuevos.addProduct("Warm magical tropical oceans", "100 por 140 cms",200000 ,"https://firebasestorage.googleapis.com/v0/b/ecommerceart-fb0d5.appspot.com/o/2017-4.jpg?alt=media&token=83af4b88-ad01-4a09-8f19-f8c82be9e2d1", "jkl123", 1, "l"))
        console.log( await productosNuevos.addProduct("S/t", "120 por 80 cms",165000 ,"https://firebasestorage.googleapis.com/v0/b/ecommerceart-fb0d5.appspot.com/o/2020-1.jpg?alt=media&token=97a6bba7-ef61-4c87-98ab-1430979cf2f5", "jkl124", 2, "l"))
        console.log( await productosNuevos.addProduct("Complementario", "120 por 80 cms",165000 ,"https://firebasestorage.googleapis.com/v0/b/ecommerceart-fb0d5.appspot.com/o/GF-2628copia.jpg?alt=media&token=d275a8f6-3466-4414-be83-6e01840727c4","jkl125",4, "l" ))
        console.log( await productosNuevos.addProduct("Neobarroco", "140 por 100 cms",200000 ,"https://firebasestorage.googleapis.com/v0/b/ecommerceart-fb0d5.appspot.com/o/2019-2.jpg?alt=media&token=ffe5c232-a20b-4976-a5a8-9618e04c295c", "jkl126", 3, "l"))
        console.log( await productosNuevos.addProduct("S/T", "70 por 70 cms", 84000,"https://firebasestorage.googleapis.com/v0/b/ecommerceart-fb0d5.appspot.com/o/2018-1.jpg?alt=media&token=5f10af30-4f9a-43d3-b396-0d8406781f4e", "jkl127", 2, "m"))
        console.log( await productosNuevos.addProduct("Generativo fractal", "100  por 100 cms", 171800,"https://firebasestorage.googleapis.com/v0/b/ecommerceart-fb0d5.appspot.com/o/2022-1.jpg?alt=media&token=0052f005-41ba-4f95-9649-025206272012", "jkl128", 3, "l"))
        console.log( await productosNuevos.addProduct("Metamorfosis Hexagonal 0.1, 0.2 y 0.3", "20 por 20 cms cada una, enmarcadas", 35000,"https://firebasestorage.googleapis.com/v0/b/ecommerceart-fb0d5.appspot.com/o/2021-3.jpg?alt=media&token=df21dfa5-db48-4987-9605-ae4761fb06a6", "jkl129", 8, "s"))
        console.log( await productosNuevos.addProduct("S/T", "50 por 50 cms", 45000,"https://firebasestorage.googleapis.com/v0/b/ecommerceart-fb0d5.appspot.com/o/2016-1.jpg?alt=media&token=68e3ca1c-1b8e-4817-a7c1-3bd0bb0edd83", "jkl130", 1, "s"))
        console.log( await productosNuevos.addProduct("Generativo Hexagonal Magenta", "100 por 100 cms", 171800,"https://firebasestorage.googleapis.com/v0/b/ecommerceart-fb0d5.appspot.com/o/GF-2623-copia.jpg?alt=media&token=8730f87d-4233-4729-9aaf-fca4a9368617", "jkl131", 3, "m"))
        console.log( await productosNuevos.addProduct("Generativo Hegagonal", "120 por 80 cms",165000 ,"https://firebasestorage.googleapis.com/v0/b/ecommerceart-fb0d5.appspot.com/o/2021-2.jpg?alt=media&token=a46429c6-28b6-4ca3-ad37-281a3da3d28b", "jkl132", 2, "l"))

       console.log(await productosNuevos.getProducts())
        console.log(await productosNuevos.getProductById(6))
        console.log(await productosNuevos.getProductById(2)) 
        console.log(await productosNuevos.deleteProduct(1))
        console.log(await productosNuevos.updateProduct({
                                                        title:"Hexagonal transicional 3", 
                                                        description:"30 por 30 cms, enmarcadas",
                                                        price:35000, 
                                                        thumbnail: "https://firebasestorage.googleapis.com/v0/b/ecommerceart-fb0d5.appspot.com/o/2021-4.jpg?alt=media&token=c5570257-81f9-4f03-bcc6-c8b75f4e5ee4",
                                                        code:"jkl122",
                                                        stock: 4,
                                                        id:1
                                                        })
                    )     
    }
    catch(e){
    console.log(e)
    }
}
main()     */
