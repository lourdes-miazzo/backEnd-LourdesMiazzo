import ProductManager from "../manager/mongoDB/productManager.js"

export const getList = async(req,res)=>{
    try{
        const manager = new ProductManager
        let limit = +req.query.limit
        if(!limit){
            let all= await manager.findList()
            res.status(200).send({
                result: "success", 
                message: "Products found",
                payload: all})
        }else{
            let limitProd = await manager.findList(limit)
            res.status(200).send({
                result: "success",
                message: "Products found", 
                payload: limitProd}) 
        }
    }
    catch(error){
        res.status(404).send(error)
    }
}



export const getOne =async(req,res)=>{
    try{
    const pid= req.params.pid
    const manager = new ProductManager
    let findOneProd=  await manager.getOne(pid)

    res.status(200).send({
        result: "success", 
        message: `Product with Id: ${pid} found`, 
        payload: findOneProd})
    }
    catch(error){
        res.status(400).send(error)
    }
}

export const saveNew=async (req,res)=>{
    try {
        const body = req.body;
        const manager = new ProductManager
        const result = await manager.createNew(body)

        res.status(201).send({
            result: "success", 
            message: `New product created`, 
            payload: result});
    }
    catch (error) {
        res.status(404).send(error)
    }
}

export const update = async (req, res)=>{
    try{
        const pid= req.params.pid
        const body=req.body
        const manager = new ProductManager
        let updateProd = await manager.updateProd(pid, body)

        res.status(200).send({
            result: "success", 
            message: `Product updated`, 
            payload: updateProd})
    }
    catch(error){
        res.status(404).send(error)
    }  
}


export const deleteOne = async(req,res)=>{
    try{
        const pid= req.params.pid
        const manager = new ProductManager
        const deleteProd= await manager.deleteProd(pid)

        res.status(204).send({
            result: "succes", 
            message: `Product deleted`, 
            payload: deleteProd})
    }
  catch(error){
    res.status(400).send(error)
  }
}