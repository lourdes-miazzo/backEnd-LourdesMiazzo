import container from '../../container.js';
import pidValidation from '../validations/product/pidValidation.js';
import createProductValidation from '../validations/product/createProductValidation.js';
import updateProductValidation from '../validations/product/updateproductValidation.js';

class ProductManager
{
    constructor()
    {
        this.repository = container.resolve('ProductRepository');
    }

    async findList(category, limit, sort, page)
    {
        return this.repository.findList(category, limit, sort, page);
    }
    async getOne(pid)
    {
        await pidValidation.parseAsync(pid);
        return this.repository.getOne(pid);
    }
    async createNew(body)
    {
        await createProductValidation.parseAsync(body);
        return this.repository.createNew(body);
    }
    async updateProd(pid, body)
    {
        await updateProductValidation.parseAsync(pid, { ...body });
        return this.repository.updateProd(pid, body);
    }
    async deleteProd(pid)
    {
        await pidValidation.parseAsync(pid);
        return this.repository.deleteProd(pid);
    }
}

export default ProductManager;
