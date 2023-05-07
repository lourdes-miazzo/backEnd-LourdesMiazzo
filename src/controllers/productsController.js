import ProductManager from "../manager/mongoDB/productManager.js"

export const getList = async(req,res)=>{
    try{
        const manager = new ProductManager
        let cat = req.query.cat 
        let limit = req.query.limit ? +req.query.limit : 10 
        let sort = req.query.sort ? +req.query.sort : undefined
        let page = req.query.page ? +req.query.page : 1
        
        let category = {status: true};
        if (cat !== undefined) {
        category = {category: cat};
        }

        let result= await manager.findList(category, limit, sort, page)
        res.status(200).send({
            result: "success", 
            message: `Products found`, 
            payload: result   
        })
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