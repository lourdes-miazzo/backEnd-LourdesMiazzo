import chai from "chai"
import supertest from 'supertest'
import initServer from "./index.js"
import {faker} from "@faker-js/faker"
const expect= chai.expect
let jwt = ""


describe("Testeando Auth endpoints", ()=>{
    before(async function (){
        const { app, db} = await initServer()
        const application = app.callback()
        this.requester = supertest.agent(application)
        this.app = app
        this.db = db
        this.payload= {}
    })
    after(function(){
        this.db.close()
        this.requester.app.close(() => {
            console.log('Conexión cerrada');
        })
    })
    it("Creacion de cuenta /api/sessions/signup", function(){
        this.payload = {
            firstName: faker.person.firstName(),
            lastName: faker.person.lastName(),
            email: faker.internet.email(),
            age: 2,

            password: "wetyio"
        }
        return this.requester
            .post("/api/sessions/signup")
            .send(this.payload)
            .then(result=>{
                const {_body, status} = result
                expect(status).to.be.equals(201)
                expect(_body.status).to.be.equals('success')
                expect(_body.payload).to.has.a.property("firstName").to.be.a("string")
                expect(_body.payload).to.has.a.property("email").to.be.a("string")
                expect(_body.payload).to.has.a.property("email").to.be.equals(this.payload.email)
            })
    })
    it("Testeo de login /api/sessions/login", function(){
        this.payload = {
            email: this.payload.email,
            password: this.payload.password
        }
        return this.requester
            .post("/api/sessions/login")
            .send(this.payload)
            .then(result=>{
                const {_body, status} = result
                expect(status).to.be.equals(200)
                expect(_body.message).to.be.equals("Login success!")
                jwt = result._body.accessToken
            }) 
            
    })
    it("Testeo de Current /api/sessions/current", function(){
        this.payload = {
            email: this.payload.email,
            password: this.payload.password
        }
        return this.requester
            .get("/api/sessions/current")
            .set(`authorization`, `bearer ${jwt}`)
            .then(result=>{
                const {_body, status} = result
                expect(status).to.be.equal(200)
                expect(_body.message).to.be.equal("success")
                expect(_body.payload.email).to.be.equal(this.payload.email)
            })
    })
})