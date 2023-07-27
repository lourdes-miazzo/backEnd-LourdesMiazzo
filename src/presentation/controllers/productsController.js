import ProductManager from "../../domain/manager/ProductManager.js"
import { v4 as uuidv4 } from 'uuid'

export const getList = async(req,res,next)=>{
    try{
        let cat = req.query.cat 
        let limit = req.query.limit ? +req.query.limit : 10 
        let sort = req.query.sort ? +req.query.sort : undefined
        let page = req.query.page ? +req.query.page : 1
        
        let category = {status: true};
        if (cat !== undefined) {
        category = {category: cat};
        }

        const manager = new ProductManager()
        let result= await manager.findList(category, limit, sort, page)

        res.status(200).send({
            status: 'success',
            message: 'All products found',
            products: result.docs, ...result,
            docs: undefined });
    }
    catch(e){
            next(e)
    }
}


export const getOne =async(req,res,next)=>{
    try{
        const pid = req.params.pid
        const manager = new ProductManager()
        let findOneProd=  await manager.getOne(pid)

        res.status(200).send({
            result: "success", 
            message: `Product with Id: ${pid} found`, 
            payload: findOneProd})
    }
    catch(e){
        next(e)
    }
}

export const saveNew=async (req,res,next)=>{
    try {
        const body = req.body
        body.code = uuidv4()
        body.owner = req.user.email

        const manager = new ProductManager()
        const result = await manager.createNew(body)

        res.status(201).send({
            result: "success", 
            message: `New product created`, 
            payload: result}) 
    }
    catch (e) {
        next(e)
    }
}

export const update = async (req, res,next)=>{
    try{
        const {pid} = req.params
        const body=req.body

        const manager = new ProductManager()
        let updateProd = await manager.updateProd(pid, body)

        res.status(200).send({
            result: "success", 
            message: `Product updated`, 
            payload: updateProd}) 
    }
    catch(e){
        next(e)
    }  
}


export const deleteOne = async(req,res,next)=>{
    try{
        const pid= req.params.pid

        const manager = new ProductManager()
        const deleteProd= await manager.deleteProd(pid)
    
        res.status(200).send({
            result: "success", 
            message: `Product deleted`}) 
    }
    catch(e){
        next(e)
    }
}