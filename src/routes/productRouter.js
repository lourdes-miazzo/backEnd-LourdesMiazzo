import { Router } from "express";
import { productsModel } from "../dao/models/products.models.js";



const productRouter = Router()




productRouter.get("/", async(req,res)=>{
    try{
        let limit = +req.query.limit
        if(!limit){
            let encontrados= await productsModel.find({status: true})
            res.status(200).send({result: "succes", message: "Products found",payload: encontrados})
        }else{
            let all = await productsModel.find({status: true}).limit(limit)
            res.status(200).send({result: "succes", message: "Products found", payload: all}) 
        }
    }
    catch(error){
        res.status(404).send(error)
    }
})



productRouter.get("/:pid", async(req,res)=>{
    try{
    const pid= req.params.pid
    let findOneProd=  await productsModel.findById(pid)
    res.status(200).send({result: "succes", message: `Product with Id: ${pid} found`, payload: findOneProd})
    }
    catch(error){
        res.status(400).send(error)
    }
})

productRouter.post("/", async (req,res)=>{
    try {
        const body = req.body;
        const result = await productsModel.create(body);
        await result.save()
        res.status(201).send({result: "succes", message: `New product created`, payload: result});
    }
    catch (error) {
        res.status(404).send(error)
    }
})

productRouter.put("/:pid", async (req, res)=>{
    try{
        const pid= req.params.pid
        const body=req.body
        let update = await productsModel.updateOne({_id: pid}, body)
        res.status(200).send({result: "succes", message: `Product updated`, payload: update})
    }
    catch(error){
        res.status(404).send(error)
    }  
})


productRouter.delete("/:pid", async(req,res)=>{
    try{
        const pid= req.params.pid
        const deleteProd= await productsModel.updateOne({_id: pid}, {$set: {status: false}})
        res.status(200).send({result: "succes", message: `Product deleted`, payload: deleteProd})
    }
  catch(error){
    res.status(400).send(error)
  }
})





export default productRouter
