let fs=require("fs")

class ProductManager{
    //el hashtag lo vuelve privado e inaccesible 
    #products= []
    //para llamar a lo que se encuentra dentro de static llamo a la clase, en este caso ProductManager.id
    static id = 0
    path= ``
    constructor(){
        this.#products = []
        this.path= "./productos.json"
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


    async addProduct(title, description, price, thumbnail, code, stock){
        try{
            //primero se determina si el código está repetido
            const repeatedCode= this.#products.find(repCod=> repCod.code === code)
            if(repeatedCode){
                return `El código ${code} está repetido` 
            } else{
                //guardo los parametros recibidos en newProduct
                const newProduct={
                    title, 
                    description, 
                    price, 
                    thumbnail, 
                    code, 
                    stock 
                }
                //si no se repite el código entonces se evalua que los valores en newProduct NO retornen
                //undefined y entonces se puedan agregar al array #products, junto a un id autoincrementable
                if(!Object.values(newProduct).includes(undefined)){
                    ProductManager.id ++
                    this.#products.push({
                        ...newProduct,
                        id: ProductManager.id
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

let main= async()=>{
    try{
        const productosNuevos = new ProductManager()
        console.log(await  productosNuevos.getProducts())
        console.log(await productosNuevos.addProduct("Manzana", "colorada, de Rio Negro", 500, "images/frutas/manzana.jpg","jkl122", 890))
        console.log(await productosNuevos.addProduct("Pan Integral", "al horno con semillas", 790,"images/panificadps/panSemillas", "jkl122", 950))
        console.log(await productosNuevos.addProduct("Pera", "salteña", 640,"images/pera", "jkl123")) 
        console.log( await productosNuevos.addProduct("Pan blanco", "al horno con agregado de vitaminas", 1260,"images/panificados/panBlanco", "jkl124", 950))
        console.log(await productosNuevos.addProduct("Galletas avena", "con chocolatw", 360,"images/galletas/galletaAv", "jkl230", 2440))
        console.log(await productosNuevos.getProducts())
        console.log(await productosNuevos.getProductById(6))
        console.log(await productosNuevos.getProductById(2)) 
        console.log(await productosNuevos.deleteProduct(1))
        console.log(await productosNuevos.updateProduct({
                                                    title: 'Pan negro',
                                                    description: 'de centeno',
                                                    price: 1500,
                                                    thumbnail: 'images/panificados/panBlanco',
                                                    code: 'jkl124',
                                                    stock: 12000,
                                                    id: 2
                                                    })
        ) 
    }
    catch(e){
    console.log(e)
    }
}
main()