import ProductManager from '../../domain/manager/ProductManager.js';
import { v4 as uuidv4 } from 'uuid';
import EmailManager from '../../domain/manager/EmailManager.js';

export const getList = async(req, res, next) =>
{
    try
    {
        req.logger.debug('product controller: get all');
        const cat = req.query.cat;
        const limit = req.query.limit ? +req.query.limit : 10;
        const sort = req.query.sort ? +req.query.sort : undefined;
        const page = req.query.page ? +req.query.page : 1;

        let category = { status: true };
        if (cat !== undefined)
            {
                category = { category: cat };
            }

        const manager = new ProductManager();
        const result = await manager.findList(category, limit, sort, page);

        res.status(200).send({
            status: 'success',
            message: 'All products found',
            products: result.docs, ...result,
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
        req.logger.debug('product controller: get one');
        const pid = req.params.pid;
        const manager = new ProductManager();
        const findOneProd =  await manager.getOne(pid);

        res.status(200).send({
            result: 'success',
            message: `Product with Id: ${pid} found`,
            payload: findOneProd });
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
        req.logger.debug('product controller: create new product');
        const body = req.body;
        body.code = uuidv4();
        body.owner = req.user.email;

        const manager = new ProductManager();
        const result = await manager.createNew(body);

        res.status(201).send({
            result: 'success',
            message: 'New product created',
            payload: result });
    }
    catch (e)
    {
        next(e);
    }
};

export const update = async(req, res, next) =>
{
    try
    {
        req.logger.debug('product controller: update one product');
        const { pid } = req.params;
        const body = req.body;

        const manager = new ProductManager();
        const updateProd = await manager.updateProd(pid, body);

        res.status(200).send({
            result: 'success',
            message: 'Product updated',
            payload: updateProd });
    }
    catch (e)
    {
        next(e);
    }
};


export const deleteOne = async(req, res, next) =>
{
    try
    {
        req.logger.debug('product controller: delete one');
        const email = req.user.email;
        const pid = req.params.pid;

        const manager = new ProductManager();
        const productFound = await manager.getOne(pid);
        await manager.deleteProd(pid);

        const productString = JSON.stringify(productFound, null, 2);
        const emailManager = new EmailManager();
        await emailManager.emailProductDeleted(email, productString);

        res.status(200).send({
            result: 'success',
            message: 'Product deleted and mail sent' }); 
    }
    catch (e)
    {
        next(e);
    }
};
