import ProductMongooseDao from "../../dao/product--MongooseDao.js"


class ProductManager{

    constructor(){
        this.dao = new ProductMongooseDao()
    }
    
    async findList(category, limit, sort, page){
        try{
            return this.dao.findList(category, limit, sort, page)
        }
        catch(e){
            throw e
        }
    }
    async getOne(id){
        try{
            return this.dao.getOne(id)
        }
        catch(e){
            throw e
        }
    }
    async createNew(body){
        try{
            return this.dao.createNew(body)
        }
        catch(e){
            throw e
        }
    }
    async updateProd(pid, body){
        try{
            return this.dao.updateProd(pid, body)
        }
        catch(e){
            throw e
        }
    }
    async deleteProd(pid){
        try{
            return this.dao.deleteProd(pid)
        }
        catch(e){
            throw e
        }
    }
    
}

export default ProductManager