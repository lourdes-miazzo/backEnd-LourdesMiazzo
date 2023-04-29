import { productsModel } from "../models/products.models.js"

class ProductMongooseDao{
    async findList(limit){
        try{
            const document = await productsModel.find({status: true}).limit(limit)
            return document.map(doc=>({
                id: doc._id,
                title: doc.title,
                description: doc.description,
                price: doc.price,
                thumbnail: doc.thumbnail,
                code: doc.code,
                stock: doc.stock,
                category: doc.category,
                status: doc.status,
            }))
        }
        catch (error) {
            throw error
        }
    }
    async getOne(id){
        try{
            const document = await productsModel.findById(id)
            return {
                id: document._id,
                title: document.title,
                description: document.description,
                price: document.price,
                thumbnail: document.thumbnail,
                code: document.code,
                stock: document.stock,
                category: document.category,
                status: document.status,
            }
        }
        catch (error) {
            throw error
        }
        
    }
    async createNew(body){
        try{
            const document = await productsModel.create(body)
            return {
                id: document._id,
                title: document.title,
                description: document.description,
                price: document.price,
                thumbnail: document.thumbnail,
                code: document.code,
                stock: document.stock,
                category: document.category,
                status: document.status,
            }
        }
        catch (error) {
            throw error
        }
        
    }
    async updateProd(pid, body){
        try{
            const document = await productsModel.updateOne({_id: pid}, body)
            const docUpdated = await productsModel.findById({_id: pid})
            return {
                id: docUpdated._id,
                title: docUpdated.title,
                description: docUpdated.description,
                price: docUpdated.price,
                thumbnail: docUpdated.thumbnail,
                code: docUpdated.code,
                stock: docUpdated.stock,
                category: docUpdated.category,
                status: docUpdated.status,
            }
        }
        catch (error) {
            throw error
        }
        
    }
    async deleteProd(pid){
        try{
            const document = await productsModel.updateOne({_id: pid},  {status: false})
        }
        catch (error) {
            throw error
        }
        
    }
}

export default ProductMongooseDao