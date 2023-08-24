import chai from 'chai';
import supertest from 'supertest';
import initServer from './index.js';
import { faker } from '@faker-js/faker';

const expect = chai.expect;
let jwt = '';

describe('Testing de endpoint Product', () =>
{
    before(async function()
    {
        const { app, db } = await initServer();
        const application = app.callback();
        this.requester = supertest.agent(application);
        this.app = app;
        this.db = db;
        this.payload = {};
    });
    it('hacer login para obtener credenciales', function()
    {
        this, this.timeout(5000);
        const user = {
            email: 'admin@admin.com',
            password: '12345678' };
        return this.requester
            .post('/api/sessions/login')
            .send(user)
            .then(result =>
            {
                jwt = result._body.accessToken;
            });
    });
    it('Testeo de creacion de producto /api/products', function()
    {
        this.timeout(5000);
        const payload = {
            title: faker.lorem.lines(1),
            description: faker.lorem.lines(2),
            price: faker.number.int({ min:150000, max:300000 }),
            thumbnail: faker.image.url(),
            code: faker.string.uuid(),
            stock: faker.number.int({ min:2, max:15 }),
            category: 'l'
        };

        return this.requester
            .post('/api/products')
            .set('Authorization', `Bearer ${jwt}`)
            .send(payload)
            .then(response =>
            {
                const { status, _body } = response;
                expect(status).to.be.equals(201);
                expect(_body).to.be.an('object');
                expect(_body.result).to.be.equals('success');
                expect(_body.message).to.be.equals('New product created');
                expect(_body.payload).to.has.a.property('price').to.be.a('number');
            });
    });
    it('ver un producto especifico /api/products/:pid', function()
    {
        // primero creo el usuario para dinamicamente obtener su id y usarlo en segunda etapa
        // que en este caso es obtener el usuario individual
        this.timeout(5000);
        const payload = {
            title: faker.lorem.lines(1),
            description: faker.lorem.lines(2),
            price: faker.number.int({ min:150000, max:300000 }),
            thumbnail: faker.image.url(),
            code: faker.string.uuid(),
            stock: faker.number.int({ min:2, max:15 }),
            category: 'l'
        };

        return this.requester
            .post('/api/products')
            .set('Authorization', `Bearer ${jwt}`)
            .send(payload)
            .then(response =>
            {
            const idProd = response._body.payload.id;
            this.requester
            .get(`/api/products/${idProd}`)
            .send(idProd)
            .then(result =>
            {
                const { status, _body } = result;
                expect(status).to.be.equal(200);
                expect(_body).to.has.a.property('message').to.be.a('string');
                expect(_body.message).to.includes('Product with Id:');
                expect(_body.payload).to.has.a.property('title').to.be.a('string');
                expect(_body.payload).to.has.a.property('price').to.be.a('number');
            });
        });
    });
    it('Testeo de actualizacion de producto /api/products/:pid', function()
    {
        // primero creo el usuario para dinamicamente obtener su id y usarlo en segunda etapa
        // que en este caso es actualizar la info del usuario
        this.timeout(5000);
        const payload = {
            title: faker.lorem.lines(1),
            description: faker.lorem.lines(2),
            price: faker.number.int({ min:150000, max:300000 }),
            thumbnail: faker.image.url(),
            code: faker.string.uuid(),
            stock: faker.number.int({ min:2, max:15 }),
            category: 'l'
        };

        return this.requester
            .post('/api/products')
            .set('Authorization', `Bearer ${jwt}`)
            .send(payload)
            .then(response =>
            {
                const dtoUpdate = {
                    title: faker.lorem.lines(1),
                    description: faker.lorem.lines(2),
                    price: faker.number.int({ min:150000, max:300000 }),
                    thumbnail: faker.image.url(),
                    code: faker.string.uuid(),
                    stock: faker.number.int({ min:2, max:15 }),
                    category: 'l'
                };
            const idProd = response._body.payload.id;
            this.requester
                .put(`/api/products/${idProd}`)
                .set('Authorization', `Bearer ${jwt}`)
                .send(dtoUpdate)
                .then(res =>
                {
                    const { status, _body } = res;
                    expect(status).to.be.equals(200);
                    expect(_body).to.be.an('object');
                    expect(_body.result).to.be.equals('success');
                    expect(_body.message).to.be.equals('Product updated');
                    expect(_body.payload).to.has.a.property('price').to.be.a('number');
                });
        });
    });
    it('Testeo delete de producto /api/products/:pid', function()
    {
        this.timeout(5000);
        // primero creo el producto para luego poderlo borrar
        const payload = {
            title: faker.lorem.lines(1),
            description: faker.lorem.lines(2),
            price: faker.number.int({ min:150000, max:300000 }),
            thumbnail: faker.image.url(),
            code: faker.string.uuid(),
            stock: faker.number.int({ min:2, max:15 }),
            category: 'l'
        };

        return this.requester
            .post('/api/products')
            .set('Authorization', `Bearer ${jwt}`)
            .send(payload)
            .then(response =>
            {
                const idProd = response._body.payload.id;
                this.requester
                .delete(`/api/products/${idProd}`)
                .set('Authorization', `Bearer ${jwt}`)
                .then(res =>
                {
                    expect(res.statusCode).to.be.equal(204);
                });
            });
    });
    it('ver una lista de productos /api/products', function()
    {
        this.timeout(10000);
        return this.requester
            .get('/api/products')
            .then(result =>
            {
                expect(result.status).to.be.equal(200);
                expect(result._body.message).to.be.equals('All products found');
                expect(result._body.products).to.be.an('array');
            });
    });
});


describe('Testing de endpoint Product Fail', () =>
{
    before(async function()
    {
        const { app, db } = await initServer();
        const application = app.callback();
        this.requester = supertest.agent(application);
        this.app = app;
        this.db = db;
        this.payload = {};
    });
    it('hacer login para obtener credenciales fail', function()
    {
        this.timeout(5000);
        const user = {
            email: 'lourdesvaudagna3@gmail.com',
            password: 'passworde' };
        return this.requester
            .post('/api/sessions/login')
            .send(user)
            .then(result =>
{
                jwt = result._body.accessToken;
            });
    });
    it('buscar un producto con id incorrecto /api/products/:pid fail', function()
    {
        this.timeout(5000);
        const pid = '64499062a53bc7a2cb4ca6ccrt678';
        return this.requester
            .get(`/api/products/${pid}`)
            .send(pid)
            .then(result =>
            {
                expect(result.status).to.be.equal(400);
            });
    });
    it('Testeo de creacion de producto sin credenciales /api/products', function()
    {
        this.timeout(5000);
        const payload = {
            title: faker.lorem.lines(1),
            description: faker.lorem.lines(2),
            price: faker.number.int({ min:150000, max:300000 }),
            thumbnail: faker.image.url(),
            code: faker.string.uuid(),
            stock: faker.number.int({ min:2, max:15 }),
            category: 'l'
        };

        return this.requester
            .post('/api/products')
            .set('Authorization', `Bearer ${jwt}`)
            .send(payload)
            .then(response =>
            {
                expect(response.status).to.be.equals(403);
            });
    });
    it('Testeo de actualizacion de producto sin credenciales /api/products/:pid', function()
    {
        this.timeout(5000);
        const pid = '64a86d832c2ac6b8eba9b13e';
        const payload = {
            title: faker.lorem.lines(1),
            description: faker.lorem.lines(2),
            price: faker.number.int({ min:150000, max:300000 }),
            thumbnail: faker.image.url(),
            code: faker.string.uuid(),
            stock: faker.number.int({ min:2, max:15 }),
            category: 'l'
        };

        return this.requester
            .put(`/api/products/${pid}`)
            .set('Authorization', `Bearer ${jwt}`)
            .send(payload)
            .then(response =>
            {
                expect(response.status).to.be.equal(403);
            });
    });
    it('Testeo delete de producto sin credenciales /api/products/:pid', function()
    {
        this.timeout(5000);
        const pid = '64499062a53bc7a2cb4ca6cc';

        return this.requester
            .delete(`/api/products/${pid}`)
            .set('Authorization', `Bearer ${jwt}`)
            .then(response =>
            {
                expect(response.status).to.be.equal(403);
            });
    });
});
