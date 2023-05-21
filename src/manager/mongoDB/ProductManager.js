import ProductMongooseDao from "../../dao/ProductMongooseDao.js"


class ProductManager{

    constructor(){
        this.dao = new ProductMongooseDao()
    }
    
    async findList(category, limit, sort, page){
            return this.dao.findList(category, limit, sort, page)
    }
    async getOne(id){
            return this.dao.getOne(id)
    }
    async createNew(body){
            return this.dao.createNew(body)
    }
    async updateProd(pid, body){
            return this.dao.updateProd(pid, body)
    }
    async deleteProd(pid){
            return this.dao.deleteProd(pid)
    }
    
}

export default ProductManager