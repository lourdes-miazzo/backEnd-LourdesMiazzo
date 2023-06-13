import ProductMongooseDao from "../../data/dao/ProductMongooseDao.js"
import pidValidation from "../validations/product/pidValidation.js"
import createProductValidation from "../validations/product/createProductValidation.js"
import updateProductValidation from "../validations/product/updateproductValidation.js"

class ProductManager{

    constructor(){
        this.dao = new ProductMongooseDao()
    }

    async findList(category, limit, sort, page){
        return this.dao.findList(category, limit, sort, page)
    }
    async getOne(pid){
        await pidValidation.parseAsync(pid)
        return this.dao.getOne(pid)
    }
    async createNew(body){
        await createProductValidation.parseAsync(body)
        return this.dao.createNew(body)
    }
    async updateProd(pid, body){
        await updateProductValidation.parseAsync(pid, {...body})
        return this.dao.updateProd(pid, body)
    }
    async deleteProd(pid){
        await pidValidation.parseAsync(pid)
        return this.dao.deleteProd(pid)
    }
}

export default ProductManager