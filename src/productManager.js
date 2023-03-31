import fs from 'fs';

class ProductManager{
    //el hashtag lo vuelve privado e inaccesible 
    #products= []
    //para llamar a lo que se encuentra dentro de static llamo a la clase, en este caso ProductManager.id
    #id = 0
    path= ``
    status=``
    constructor(){
        this.#products = []
        this.path= "./src/products.json"
        this.status= true
    }
    //agregando este método me evito tener que escribir constantemente estas lineas.
    //no podría hacer lo mismo con writeFiles porque la informacion que se escribe es diferente
    //segun el método donde se lo utilice por ej: en getProducts()se escribe/guarda un array vacío, pero en
    //deleteProduct() se guarda un nuevo array que dejó afuera al objeto cuyo id pasamos como párametro 
    async readFiles(){
        let read = await fs.promises.readFile(this.path, "utf-8")
        //uso JSON.parse para convertir string en objeto y poder mostrarlo/leeerlo más facilmente
        return JSON.parse(read)
    }


    //getProducts busca leer el archivo Json desp de parsearlo y luego mostrarlo,
    //si no lo encuentra crea el archivo(usando writeFile) con un array vacio donde se guardaran 
    //los productos
    async getProducts(){
        try{
            //llamo al metodo readFiles() y me evito escribir lo siguiente:
            //const getProd = await fs.promises.readFile(this.path, "utf-8")
            //return JSON.parse(getProd) 
            let getPr = await this.readFiles()
            return getPr
        }
        catch(e){
            await fs.promises.writeFile(this.path, "[]")
            return `El archivo no existe, pero ahora hemos creado uno`
        }
    }


    async addProduct(objectProd, status=true){
        try{
            this.#products= await this.readFiles()

            this.#id = this.#products[this.#products.length -1].id
            
            const repeatedCode= this.#products.find(repCod=> repCod.code === objectProd )
            if(repeatedCode){
                return `El código ${code} está repetido` 
            } else{
                const newProduct= {
                    objectProd
                }
                console.log(newProduct)
                //si no se repite el código entonces se evalua que los valores en newProduct NO retornen
                //undefined y entonces se puedan agregar al array #products, junto a un id autoincrementable
                if(!Object.values(newProduct).includes(undefined)){
                    this.#id ++
                    this.#products.push({
                        ...newProduct,
                        status,
                        id:this.#id
                    })
                    //finalmente escribimos la informacion del array actualizado en el archivo .json
                    //usamos JSON.stringify para convertir un objeto en cadena de texto JSON, el null y 2
                    //sirven para darle mayor facilidad de lectura al archivo .json
                    await fs.promises.writeFile(this.path, JSON.stringify(this.#products, null, 2))
                    return `Producto agregado correctamente` 
                }else{
                    return "Todos los campos son obligatorios" 
                } 
            }
        }
        catch(e){
            throw new Error(e)
        }
    }


    async getProductById(prodId){
        try{
            //uso de readFiles para ahorrar lineas
            const idProd = await this.readFiles()
            //se busca en array idProd si algun objeto tiene un id que coincida
            const product = idProd.find(prod=> prod.id === prodId)
            if(!product){
                //si no coincide se avisa
                return `Product with ID:${prodId} not found`
            }else{
                //si coincide se muestra el producto
                return product
            }
        }
        catch(e){
            throw new Error(e)
        }
    } 

     //se recibe por parámetro el id y los parámetros que forman el objeto, donde se encontrarán 
     //los nuevos valores a ser modificados
    async updateProduct(product){ 
        try{
            //se individualiza el id del objeto completo pasado
            const idProd= product.id
            //se utiliza método deleteProduct()para borrar primero el objeto q coincida con el id ingresado
            await this.deleteProduct(idProd)
            //con el método readFiles() se lee lo que aún queda en el archivo, es decir los otros objetos 
            //que no se borraron y los guarda en variable oldProd
            const oldProd = await this.readFiles()
            //en el array modifiedProd se guardan el objeto con sus valores modificados y además
            //se hace un spread de los objetos que están en el array oldProd 
            const modifiedProd= [
                {
                ...product,
                //mantengo el id que se guardó en idProd antes de eliminar el objeto completo y lo uso ahora
                idProd
                }, 
                ...oldProd
                ]
            const modif = await fs.promises.writeFile(this.path, JSON.stringify(modifiedProd, null, 2))
            return `Producto modificado correctamente`
        }
        catch(e){
            return e
        }
    
    }

    async deleteProduct(id){
        try{
            //se accede a leer el archivo
            const prod = await this.readFiles()
            //se busca el producto que coincide con el id ingresado
            const prodFind = prod.find(p=> p.id===id)
            //si existe un producto cuyo id coincide se pasa a filtrar el array para guardar ahora 
            //en un nuevo array(prodDeleted) todos los productos que no tienen ese id, por lo tanto al 
            //quedar fuera del nuevo array, queda eliminado
            if(prodFind){
                const prodDeleted= prod.filter(p=> p.id!==id)
                await fs.promises.writeFile(this.path, JSON.stringify(prodDeleted, null, 2))
                return "Producto eliminado correctamente"
            }
            else{
                return "El producto que quieres borrar no existe"
            }
        }
        catch(e){
            throw new Error(e)
        }
    }
}


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


export default ProductManager;