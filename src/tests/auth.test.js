import chai from 'chai';
import supertest from 'supertest';
import initServer from './index.js';
import { faker } from '@faker-js/faker';
const expect = chai.expect;
let jwt = '';


describe('Testeando Auth endpoints', () =>
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
    it('Creacion de cuenta /api/sessions/signup', function()
    {
        this.timeout(5000);
        this.payload = {
            firstName: faker.person.firstName(),
            lastName: faker.person.lastName(),
            email: faker.internet.email(),
            age: 27,
            password: 'wetyio'
        };
        return this.requester
            .post('/api/sessions/signup')
            .send(this.payload)
            .then(result =>
            {
                const { _body, status } = result;
                expect(status).to.be.equals(201);
                expect(_body.status).to.be.equals('success');
                expect(_body.payload).to.has.a.property('firstName').to.be.a('string');
                expect(_body.payload).to.has.a.property('email').to.be.a('string');
                expect(_body.payload).to.has.a.property('email').to.be.equals(this.payload.email);
            });
    });
    it('Testeo de login /api/sessions/login', function()
    {
        this.timeout(5000);
        this.payload = {
            email: this.payload.email,
            password: this.payload.password
        };
        return this.requester
            .post('/api/sessions/login')
            .send(this.payload)
            .then(result =>
            {
                const { _body, status } = result;
                expect(status).to.be.equals(200);
                expect(_body.message).to.be.equals('Login success!');
                jwt = result._body.accessToken;
            });
    });
    it('Testeo de Current /api/sessions/current', function()
    {
        this.timeout(5000);
        this.payload = {
            email: this.payload.email,
            password: this.payload.password
        };
        return this.requester
            .get('/api/sessions/current')
            .set('authorization', `bearer ${jwt}`)
            .then(result =>
            {
                const { _body, status } = result;
                expect(status).to.be.equal(200);
                expect(_body.message).to.be.equal('success');
                expect(_body.payload.email).to.be.equal(this.payload.email);
            });
    });
});


describe('Testeando Auth endpoints fails', () =>
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
    it('login fail incorrect email /api/sessions/login', function()
    {
        this.timeout(5000);
        this.payload = {
            email: 'no email',
            password: '12345678'
        };
        return this.requester
        .post('/api/sessions/login')
        .send(this.payload)
        .then(result =>
        {
            expect(result.status).to.be.equals(400);
            jwt = result._body.accessToken;
        });
    });
    it('testing Current fail /api/sessions/current', function()
    {
        this.timeout(5000);
        return this.requester
        .get('/api/sessions/current')
        .set('authorization', `bearer ${jwt}`)
        .then(result =>
        {
            expect(result.status).to.be.equals(403);
        });
    });
});
