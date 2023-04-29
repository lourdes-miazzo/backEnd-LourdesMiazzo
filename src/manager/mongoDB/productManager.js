import ProductMongooseDao from "../../dao/productMongooseDao.js"


class ProductManager{

    constructor(){
        this.dao = new ProductMongooseDao()
    }
    
    async findList(limit){
        try{
            return this.dao.findList(limit)
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