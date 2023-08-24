import container from '../../container.js';
import idValidation from '../validations/idValidation.js';
import pidValidation from '../validations/product/pidValidation.js';
import productUpdatedIncartValidation from '../validations/cart/prodUpdatedInCartValidation.js';
import updateCartValidation from '../validations/cart/updateCartValidation.js';

class CartManager
{
    constructor()
    {
        this.repository = container.resolve('CartRepository');
    }
    async getCarts(limit, page)
    {
        return this.repository.getCarts(limit, page);
    }
    async getOneCart(id)
    {
        await idValidation.parseAsync(id);
        return this.repository.getOneCart(id);
    }
    async newCart()
    {
        return this.repository.newCart();
    }
    async addProd(id, pid)
    {
        await idValidation.parseAsync(id);
        await pidValidation.parseAsync(pid);
        return this.repository.addProd(id, pid);
    }
    async purchaseProd(id)
    {
        return this.repository.purchaseProd(id);
    }
    async deleteProd(id, pid)
    {
        await idValidation.parseAsync(id);
        await pidValidation.parseAsync(pid);
        return this.repository.deleteProd(id, pid);
    }
    async deleteAllInsideCart(id, body)
    {
        await idValidation.parseAsync(id);
        return this.repository.deleteAllInsideCart(id, body);
    }
    async productsUpdated(id, body)
    {
        await updateCartValidation.parseAsync(id, { ...body });
        return this.repository.productsUpdated(id, body);
    }
    async oneProdUpdated(id, pid, body)
    {
        await productUpdatedIncartValidation.parseAsync(id, pid, { ...body });
        return this.repository.oneProdUpdated(id, pid, body);
    }
}

export default CartManager;
