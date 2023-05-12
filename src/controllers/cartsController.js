import CartManager from "../manager/mongoDB/cartManager.js"


export const gelList = async(req,res)=>{
    try{
        const manager = new CartManager()
        const verCarritos= await manager.getCarts()

        res.status(200).send({
            result: "success", 
            message: `Carts found`, 
            payload: verCarritos})
    }
    catch(e){
        res.status(400).send(e)
    }
}

export const getOne = async (req,res)=>{
    try{
        const cid = req.params.cid
        const manager = new CartManager()
        const cartId = await manager.getOneCart(cid)

        res.status(200).send({
            result: "success", 
            message: `Cart with Id: ${cid} found`,
            payload: cartId})
    }
    catch(e){
        res.status(400).send(e)
    }
}

export const saveNew = async(req,res)=>{
    try{
        const manager = new CartManager()
        const nuevoCarrito = await manager.newCart()

        res.status(201).send({
            result: "success", 
            message: `New cart created`,
            payload: nuevoCarrito})
        }
    catch(e){
        res.status(400).send(e)
    }
}
 

export const saveProdInCart = async (req, res) => {
        try {
            const {cid, pid} = req.params
            const manager= new CartManager()
            const prodInCart= await manager.addProd(cid, pid)

            res.status(200).send({
                result: "success", 
                message: `Product ${pid} added in cart ${cid}`,
                payload:prodInCart})
        
        } catch (e) {
            res.status(400).send(e);
        }
}

export const deleteProdInCart = async (req,res)=>{
    try{
        const {cid, pid} = req.params
        const manager= new CartManager()
        const prodInCart= await manager.deleteProd(cid, pid)

            res.status(200).send({
                result: "success", 
                message: `Product ${pid} deleted from cart ${cid}`,
                payload:prodInCart})
    }catch (e) {
            res.status(400).send(e);
        }
}

export const deleteAllProdInCart= async(req,res)=>{
    try{
        const {cid} = req.params
        const manager= new CartManager()
        const deleteAllInCart= await manager.deleteAllInsideCart(cid)
    
        res.status(200).send({
            result: "success", 
            message: `Cart ${cid} empty`,
            payload:deleteAllInCart})
    }catch (e) {
            res.status(400).send(e);
        }
}

export const updateCart= async (req,res)=>{
    try{
        const {cid} = req.params
        const body= req.body
        const manager= new CartManager()
        const updateProds= await manager.productsUpdated(cid, body)

        res.status(200).send({
            result: "success", 
            message: `Cart ${cid} updated`,
            payload: updateProds})
    }catch (e) {
            res.status(400).send(e);
        }
}

export const updateProdInCart = async (req,res)=>{
    try{
        const {cid, pid} = req.params
        const body = req.body
        const manager= new CartManager()
        const updateOneProd=  await manager.oneProdUpdated(cid, pid, body)
        if(!updateOneProd){
            res.status(200).send({
                message: "you don't have the product you want to update"})
        }else{
            res.status(200).send({
                result: "success", 
                message: `Product ${pid} updated in cart ${cid}`,
                payload: updateOneProd})
        }
    }catch (e) {
            res.status(400).send(e);
        }
 
}

