import { v4 as uuidv4 } from 'uuid';

import CartManager from '../../domain/manager/CartManager.js';
import ProductManager from '../../domain/manager/ProductManager.js';
import TicketManager from '../../domain/manager/TicketManager.js';
import EmailManager from '../../domain/manager/EmailManager.js';

export const gelList = async(req, res, next) =>
{
    try
    {
        req.logger.debug('cart controller: all carts');
        const limit = req.query.limit ? +req.query.limit : 10;
        const page = req.query.page ? +req.query.page : 1;

        const manager = new CartManager();
        const carts = await manager.getCarts(limit, page);

        res.status(200).send({
            status: 'success',
            message: 'All carts found',
            carts: carts.docs, ...carts,
            docs: undefined });
    }
    catch (e)
    {
        next(e);
    }
};

export const getOne = async(req, res, next) =>
{
    try
    {
        req.logger.debug('cart controller: one cart');
        const { id } = req.params;

        const manager = new CartManager();
        const cartId = await manager.getOneCart(id);

        res.status(200).send({
            result: 'success',
            message: `Cart with Id: ${id} found`,
            payload: cartId });
    }
    catch (e)
    {
        next(e);
    }
};

export const saveNew = async(req, res, next) =>
{
    try
    {
        req.logger.debug('cart controller: new cart');
        const manager = new CartManager();
        const nuevoCarrito = await manager.newCart();

        res.status(201).send({
            result: 'success',
            message: 'New cart created',
            payload: nuevoCarrito });
    }
    catch (e)
    {
        next(e);
    }
};

export const saveProdInCart = async(req, res, next) =>
{
    try
    {
        req.logger.debug('cart controller: add products in cart');
        const id = req.params.id;
        const pid = req.params.pid;

        const manager = new CartManager();
        const cart = await manager.getOneCart(id);

        const product = new ProductManager();
        const prod = await product.getOne(pid);

        const existingProduct = cart.products.find(item => item.id === pid);

        if (existingProduct && existingProduct.quantity >= prod.stock)
        {
            return res.status(400).send({
                    result: 'failure',
                    message: `Product ${pid} cannot be added in cart ${id} for stock lacking`,
                    payload: cart });
        }
        const prodQuantityUpdated = await manager.addProd(id, pid);
        res.status(201).send({
            result: 'success',
            message: `Product ${pid} added in cart ${id}`,
            payload:prodQuantityUpdated });
    }
    catch (e)
    {
            next(e);
        }
};
export const purchaseProductsInCart = async(req, res, next) =>
{
    try
    {
            req.logger.debug('cart controller: buy products in cart');
            const id = req.params.id;

            const product = new ProductManager();
            const manager = new CartManager();
            // ver que prod están en cart
            const getProdInCart = await manager.purchaseProd(id);
            const prodInCartInfo = getProdInCart.products;

            let amount = 0;
            // obtener info completa de cada prod para obtener el precio y poder multiplicarlo por la cantidad,
            // así recupero el valor final total,
            for (let index = 0; index < prodInCartInfo.length; index++)
            {
                const idProd = prodInCartInfo[index]._id.toString();
                const quantityProd = prodInCartInfo[index].quantity;
                const completeProductInfo = await product.getOne(idProd);

                const stockControl = completeProductInfo.stock - quantityProd;

                // si un prod no tiene stock suficiente no se suma y arranca un nuevo ciclo for
                if (stockControl < 0)
                {
                    continue;
                }

                // si en cambio hay suficiente stock se guarda en el producto el stock modificado
                const dto = {
                    ...completeProductInfo,
                    stock: stockControl
                };
                const prodModific = await product.updateProd(idProd, dto);

                const subTotal = completeProductInfo.price * quantityProd;
                amount += subTotal;
            }

            // se arma la info del ticket para enviar y crear ticket en db
            const dtoTicket = {
                purchaseDateTime: new Date().toLocaleString('es-AR', { timeZone: 'America/Argentina/Buenos_Aires' }),
                amount,
                purchaser: req.user.email
            };
            dtoTicket.code = uuidv4();

            const ticket = new TicketManager();
            const newTicket = await ticket.createNewTicket(dtoTicket);

            // se envia al mail del comprador la info del ticket
            const ticketString = JSON.stringify(newTicket, null, 2);

            const userEmail = req.user.email;
            const emailManager = new EmailManager();
            await emailManager.emailTicket(ticketString, userEmail);
            // se borra todo dentro de carts
            await manager.deleteAllInsideCart(id);

            res.status(201).send({
                message: 'Products purchased successfully',
                Ticket: newTicket
            });
    }
    catch (e)
{
        next(e);
    }
};

export const deleteProdInCart = async(req, res, next) =>
{
    try
    {
        req.logger.debug('cart controller: delete especific product in cart');
        const id = req.params.id;
        const pid = req.params.pid;

        const manager = new CartManager();
        const prodInCart = await manager.deleteProd(id, pid);

            res.status(200).send({
                result: 'success',
                message: `Product ${pid} deleted from cart ${id}`,
                payload:prodInCart });
    }
    catch (e)
    {
        next(e);
    }
};

export const deleteAllProdInCart = async(req, res, next) =>
{
    try
    {
        req.logger.debug('cart controller: delete all products in cart');
        const id = req.params.id;

        const manager = new CartManager();
        const cartInfo = await manager.getOneCart(id)
        cartInfo.products = []
        const deleteAllInCart = await manager.deleteAllInsideCart(id, cartInfo);

        res.status(200).send({
            result: 'success',
            message: `Cart ${id} empty`,
            payload:deleteAllInCart }); 
    }
    catch (e)
    {
        next(e);
    }
};

export const updateCart = async(req, res, next) =>
{
    try
    {
        req.logger.debug('cart controller: update cart');
        const id = req.params.id;
        const body = req.body;

        const product = new ProductManager();

        const arrayProd = [];
        // acá se controla que en el carrito que se hace el update no se agreguen
        // prod q no tienen el stock suficiente
        for (let index = 0; index < body.length; index++)
        {
            const quantity = body[index].quantity;
            const idProd = body[index].id;
            const prodInfo = await product.getOne(idProd);

            if (prodInfo.stock >= quantity)
            {
                arrayProd.push({ _id: idProd, quantity });
            }
        }

        const manager = new CartManager();
        const updateProds = await manager.productsUpdated(id, arrayProd);

        res.status(200).send({
            result: 'success',
            message: `Cart ${id} updated`,
            payload: updateProds });
    }
    catch (e)
    {
        next(e);
    }
};

export const updateProdInCart = async(req, res, next) =>
{
    try
    {
        req.logger.debug('cart controller: especific product updated in cart');
        const { id, pid } = req.params;
        const body = req.body;

        const manager = new CartManager();
        const product = new ProductManager();
        const prodInfo = await product.getOne(pid);

        if (prodInfo.stock >= body.quantity)
        {
        const updateOneProd =  await manager.oneProdUpdated(id, pid, body);
        return res.status(200).send({
                    result: 'success',
                    message: `Product ${pid} updated in cart ${id}`,
                    payload: updateOneProd });
        }
        const cart = await manager.getOneCart(id);
        res.status(400).send({
            result: 'failure',
            message: `Product ${pid} cannot be updated in cart ${id} for stock lacking`,
            payload: cart });
    }
    catch (e)
    {
        next(e);
    }
};

