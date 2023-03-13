class ProductManager{
    
    products= []
    static id = 0
    getProducts(){
        return this.products
    }
    addProduct(title, description, price, thumbnail, code, stock){
        debugger
        const repeatedCode= this.products.find(repCod=> repCod.code === code)
        if(repeatedCode){
           /*  console.error(`El código ${code} está repetido`)  */
            return `El código ${code} está repetido` 
        } else{
            const newProduct={
                title, 
                description, 
                price, 
                thumbnail, 
                code, 
                stock,
            }
            if(!Object.values(newProduct).includes(undefined)){
                ProductManager.id ++
                this.products.push({
                    ...newProduct,
                    id: ProductManager.id
                })
                return `Producto agregado correctamente` 
            }else{
                /* console.error("Todos los campos son obligatorios") */ 
                return "Todos los campos son obligatorios" 
            }
        }
    }
   getProductById(prodId){
        const product = this.products.find(prod=> prod.id === prodId)
        if(!product){
            throw Error (`Product with ID:${prodId} not found`)
        }else{
            return product
        }
    } 
}

const productosNuevos = new ProductManager()

console.log(productosNuevos.addProduct("Manzana", "colorada, de Rio Negro", 500, "images/frutas/manzana.jpg","jkl122", 890))
console.log(productosNuevos.addProduct("Pan Integral", "al horno con semillas", 790,"images/panificadps/panSemillas", "jkl122", 950))
console.log(productosNuevos.addProduct("Pera", "salteña", 640,"images/pera", "jkl123"))
console.log(productosNuevos.addProduct("Pan blanco", "al horno con agregado de vitaminas", 1260,"images/panificados/panBlanco", "jkl124", 950))
console.log(productosNuevos.getProducts())
console.log(productosNuevos.getProductById(6))