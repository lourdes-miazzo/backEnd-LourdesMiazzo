import dotenv from "dotenv"
dotenv.config()

import { faker } from '@faker-js/faker';
import DbFactory from "../data/factories/DbFactory.js"
const db = DbFactory.create(process.env.DB)


import chai from "chai"
const expect = chai.expect

import RoleMongooseRepository from "../data/repository/RoleMongooseRepository.js";

describe("Testeando role mongoose repository", ()=>{
    before(async function(){
        await db.init(process.env.DB_URI)
        this.roleRepository = new RoleMongooseRepository()
    })
    after(async function(){
        await db.close()
    }) 
    it("roleRepository es una instancia de RoleMongooseRepository", function(){
        expect(this.roleRepository).to.be.instanceOf(RoleMongooseRepository)
    })
    it("al acceder a todos los roles guardados estos llegan en un array", function(){
        return this.roleRepository
        .findList()
        .then(result=>{
            expect(result).to.be.an("array")
            expect(result.every(role=> typeof role==="object")).to.be.true
        })
    })
    it("al brindar un id este devuelve el role que coincide con ese parametro", function(){
        const id= "6478b1b3e1a70aab981c5b08"
        return this.roleRepository
        .oneRole(id)
        .then(result=>{
            expect(result).to.has.a.property("name").to.be.a("string")
            expect(result).to.has.a.property("permissions").to.be.an("array")
            expect(result.permissions.every(role=> typeof role === "string")).to.be.true
        })
    })
    it("es posible crear un role usando el método createRole y pasando por parametro un body con la info necesarioa", function(){
        const role={
            name: faker.person.fullName(),
            permissions: ["postCart", "postProdCart", "purchase", "deleteProdCart"]
        }
        return this.roleRepository
        .createRole(role)
        .then(result=>{
            expect(result).to.have.a.property("name").to.be.a("string")
            expect(result).to.has.a.property("permissions").to.be.an("array")
            expect(result).to.be.an("object")
        })
    })
    it("es posible realizar un update de un role ya existente", function(){
        const id="64a47dc829cfc1211fe38735"
        const role={
            name: faker.person.fullName(),
            permissions: ["postProduct", "deleteAllProdCart", "purchase", "deleteProdCart"]
        }
        return this.roleRepository
        .roleUpdated(id, role)
        .then(result=>{
            expect(result).has.a.property("name").to.be.a("string")
            expect(result).has.a.property("permissions").to.be.an("array")
            expect(result.id.toString()).to.have.a.lengthOf(24)
        }) 
    })
    it("es posible eliminar un role pasando un id por parametro", function(){
        const role={
            name: faker.person.fullName(),
            permissions: ["postProduct", "deleteAllProdCart", "purchase", "deleteProdCart"]
        }
        //primero creo uno para de ese mismo obtener el id a borrar y evitar que no sea dinamico
        return this.roleRepository
        .createRole(role)
        .then(result=>{
            this.roleRepository
            .eraseRole(result.id)
            .then(res=>{
                expect(res).to.not.throw()
                expect(res).to.be.null
            })
        })
    }) 
})
