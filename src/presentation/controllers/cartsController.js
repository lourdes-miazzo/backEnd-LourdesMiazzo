import CartManager from "../../domain/manager/CartManager.js"


export const gelList = async(req,res,next)=>{
    try{
        const manager = new CartManager()
        const verCarritos= await manager.getCarts()

        res.status(200).send({
            result: "success", 
            message: `Carts found`, 
            payload: verCarritos})
    }
    catch(e){
        next(e)
    }
}

export const getOne = async (req,res,next)=>{
    try{
        const {id} = req.params

        const manager = new CartManager()
        const cartId = await manager.getOneCart(id)

        res.status(200).send({
            result: "success", 
            message: `Cart with Id: ${id} found`,
            payload: cartId})
    }
    catch(e){
        next(e)
    }
}

export const saveNew = async(req,res,next)=>{
    try{
        const manager = new CartManager()
        const nuevoCarrito = await manager.newCart()

        res.status(201).send({
            result: "success", 
            message: `New cart created`,
            payload: nuevoCarrito})
        }
    catch(e){
        next(e)
    }
}

export const saveProdInCart = async (req, res,next) => {
        try {
            const id = req.params.id
            const pid= req.params.pid
            
            const manager= new CartManager()
            const prodInCart= await manager.addProd(id, pid)

            res.status(200).send({
                result: "success", 
                message: `Product ${pid} added in cart ${id}`,
                payload:prodInCart})
        
        } catch (e) {
            next(e)
        }
}

export const deleteProdInCart = async (req,res,next)=>{
    try{
        const id = req.params.id
        const pid= req.params.pid

        const manager= new CartManager()
        const prodInCart= await manager.deleteProd(id, pid)

            res.status(200).send({
                result: "success", 
                message: `Product ${pid} deleted from cart ${id}`,
                payload:prodInCart})
    }catch (e) {
        next(e)
        }
}

export const deleteAllProdInCart= async(req,res,next)=>{
    try{
        const id = req.params.id

        const manager= new CartManager()
        const deleteAllInCart= await manager.deleteAllInsideCart(id)
    
        res.status(200).send({
            result: "success", 
            message: `Cart ${id} empty`,
            payload:deleteAllInCart})
    }catch (e) {
        next(e)
        }
}

export const updateCart= async (req,res,next)=>{
    try{
        const {id} = req.params
        const body= req.body

        const manager= new CartManager()
        const updateProds= await manager.productsUpdated(id, body)

        res.status(200).send({
            result: "success", 
            message: `Cart ${id} updated`,
            payload: updateProds})
    }catch (e) {
        next(e)
        }
}

export const updateProdInCart = async (req,res,next)=>{
    try{
        const {id, pid} = req.params
        const body = req.body

        const manager= new CartManager()
        const updateOneProd=  await manager.oneProdUpdated(id, pid, body)
        
        if(!updateOneProd){
            res.status(200).send({
                message: "you don't have the product you want to update"})
        }else{
            res.status(200).send({
                result: "success", 
                message: `Product ${pid} updated in cart ${id}`,
                payload: updateOneProd})
        }
    }catch (e) {
        next(e)
        }
}

