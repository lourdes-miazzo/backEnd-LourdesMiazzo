import { productModel } from '../models/productModels.js';
import Product from '../../domain/entities/product.js';

class ProductMongooseRepository
{
    async findList(category, limit, sort, page)
    {
        const prodDoc = await productModel.paginate(category, { limit, page, sort: { price: sort } });
        const { docs, ...pagination } = prodDoc;
        const products =  docs.map(doc => new Product({
            id: doc._id,
            title: doc.title,
            description: doc.description,
            price: doc.price,
            thumbnail: doc.thumbnail,
            code: doc.code,
            stock: doc.stock,
            category: doc.category,
            status: doc.status,
            owner: doc.owner
        }));
        return {
            products,
            pagination
        };
    }
    async getOne(pid)
    {
        const document = await productModel.findById(pid);
        return new Product({
            id: document._id,
            title: document.title,
            description: document.description,
            price: document.price,
            thumbnail: document.thumbnail,
            code: document.code,
            stock: document.stock,
            category: document.category,
            status: document.status,
            owner: document.owner
        });
    }
    async createNew(body)
    {
        const document = await productModel.create(body);
        return new Product({
            id: document._id,
            title: document.title,
            description: document.description,
            price: document.price,
            thumbnail: document.thumbnail,
            code: document.code,
            stock: document.stock,
            category: document.category,
            status: document.status,
            owner: document.owner
        });
    }
    async updateProd(pid, body)
    {
        await productModel.updateOne({ _id: pid }, body, { new: true });
        const docUpdated = await productModel.findById(pid);
        return new Product({
            id: docUpdated._id,
            title: docUpdated.title,
            description: docUpdated.description,
            price: docUpdated.price,
            thumbnail: docUpdated.thumbnail,
            code: docUpdated.code,
            stock: docUpdated.stock,
            category: docUpdated.category,
            status: docUpdated.status,
            owner: docUpdated.owner
        });
    }
    async deleteProd(pid)
    {
        const document = await productModel.updateOne({ _id: pid },  { status: false });
    }
}

export default ProductMongooseRepository;
