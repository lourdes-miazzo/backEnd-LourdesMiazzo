import { cartModel } from '../models/cartModel.js';
import Cart from '../../domain/entities/cart.js';

class CartMongooseRepository
{
    async getCarts(limit, page)
    {
        const cartsDoc = await cartModel.paginate({}, { limit, page });
        const { docs, ...pagination } = cartsDoc;

        const carts = docs.map(document => new Cart({
            id: document._id,
            products: document.products
        }));

        return {
            carts,
            pagination
        };
    }
    async getOneCart(id)
    {
        const document = await cartModel.findById(id);
        return new Cart({
            id : document._id,
            products: document.products.map(item =>
            {
                return {
                    id: item.id,
                    quantity: item.quantity
                };
            })
        });
    }
    async newCart()
    {
        const document = await cartModel.create({ products: [] });
        return new Cart({
            id : document._id,
            products: document.products
            });
    }
    async addProd(id, pid)
    {
        const updateProducts = await cartModel.findOneAndUpdate(
            // primero busca si existe un elemento cart que coincida tando su _id con cid,
            // como su product dentro del array products con el pid. Si hay coincidencia aumenta en uno
            // la cantidad dentro de products
            { '_id': id, 'products._id': pid },
            { $inc: { 'products.$.quantity': 1 } },
            // new true sirve para que me muestre el cart actualizado y no su versión previa
            { new: true }
        );

        if (!updateProducts)
        {
            // si no hay productos dentro del carrito se pushea dentro del array products un producto con
            // el pid y de cantidad 1
            await cartModel.updateOne(
                { _id: id },
                { $push: { products: { _id: pid, quantity: 1 } } }
            );
        }

        const document = await cartModel.findById(id);
        return new Cart({
            id: document._id,
            products: document.products.map(item =>
        {
                return {
                    id: item._id,
                    quantity: item.quantity
                };
            })
        });
    }
    async purchaseProd(id)
    {
        const document = await cartModel.findById(id);
        return new Cart({
            id: document._id,
            products: document.products
        });
    }
    async deleteProd(id, pid)
    {
        const document = await cartModel.findByIdAndUpdate(
            { _id: id },
            { $pull: { products: { _id: pid } } },
            { new:true });
        return document;
    }
    async deleteAllInsideCart(id, body)
    {
        const document = await cartModel.findByIdAndUpdate(
            { _id:id },
            body,
            { new: true });
            return new Cart({
                id: document._id,
                products: document.products
            });
    }
    async productsUpdated(id, body)
    {
        const document = await cartModel.findOneAndUpdate(
            { _id: id },
            { $set: { products: body } },
            { new: true });
            return new Cart({
                id: document._id,
                products: document.products.map(item =>
                {
                    return {
                        id: item._id,
                        quantity: item.quantity
                    };
                })
            });
    }
    async oneProdUpdated(id, pid, body)
    {
        const document = await cartModel.findOneAndUpdate(
            { '_id': id, 'products._id': pid },
            { $set: { 'products.$.quantity': body.quantity } },
            { new: true });
            return new Cart({
                id: document._id,
                products: document.products
            });
    }
}

export default CartMongooseRepository;
