import { productsModel } from "../models/products.models.js"

class ProductMongooseDao{
    async findList(category, limit, sort, page){
        const document = await productsModel.paginate(category, {limit, page, sort: {price: sort} })
        document.docs= document.docs.map(doc=>({
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
        return document
    }
    async getOne(pid){
        const document = await productsModel.findById(pid)
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
    async createNew(body){
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
    async updateProd(pid, body){
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
    async deleteProd(pid){
        const document = await productsModel.updateOne({_id: pid},  {status: false})
        
    }
}

export default ProductMongooseDao