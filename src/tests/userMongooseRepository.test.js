import dotenv from "dotenv"
dotenv.config()

import { faker } from '@faker-js/faker';
import DbFactory from "../data/factories/DbFactory.js"
const db = DbFactory.create(process.env.DB)


import chai from "chai"
const expect = chai.expect

import UserMongooseRepository from "../data/repository/UserMongooseRepository.js"

describe("Testeando user mongoose repository", ()=>{
    before(async function(){
        await db.init(process.env.DB_URI)
        this.userRepository= new UserMongooseRepository()
    })
    after(async function(){
        await db.close()
    })
    it("El repository debe ser una instancia de userMongooseRepository",function(){
        expect(this.userRepository).to.be.instanceOf(UserMongooseRepository)
    })
    it("al obtener todos los usuarios con list() estos llegan en un array", function(){
        return this.userRepository
        .list(5, 1)
        .then(result=>{
            expect(Array.isArray(result.users)).to.be.true;
            expect(result.users.every(user=> typeof user === "object")).to.be.true
            expect(result.pagination).to.be.an("object")
            expect(result.pagination).to.has.a.property("totalDocs").to.be.a("number")
            expect(result.pagination).to.has.a.property("page").to.be.a("number")
        })
    })
    it("el repository debe poder devolver un solo usuario con el metodo getOne()", function(){
        const id = "647bd11c6d42d4a23f97a5f6"
        return this.userRepository
        .getOne(id)
        .then(result=>{
            expect(result).to.be.an("object")
            expect(result.email).to.be.a("string")
            expect(result.id.toString()).to.have.a.lengthOf(24)
        })
    })
    it("El repository debe poder crear un usuario", function(){
        const user={
            firstName: faker.person.firstName(),
            lastName: faker.person.lastName(),
            email: faker.internet.email(),
            age: 28,
            isAdmin: faker.datatype.boolean(),
            password: "kgldfkhñl"
        }
        return this.userRepository
        .create(user)
        .then(result=>{
            expect(result).to.be.an("object")
            expect(result).to.has.a.property("firstName").to.be.a("string")
            expect(result).to.has.a.property("lastName").to.be.a("string")
            expect(result).to.has.a.property("email").to.be.a("string")
            expect(result).to.has.a.property("age").to.be.a("number")
            expect(result).to.has.a.property("isAdmin").to.be.a("boolean") 
            expect(result.email).to.be.equals(user.email)
        })
    })
    it("El repository debe permitir actualizar los datos del usuario", function(){
        const id = "647bd11c6d42d4a23f97a5f6"
        const body={
            firstName: faker.person.firstName(),
            lastName: faker.person.lastName(),
            age: 28,
            isAdmin: faker.datatype.boolean(),
            password: "kgldfkhñl"
        }
        return this.userRepository
        .updateOne(id, body)
        .then(result=>{
            expect(result).to.be.an("object")
            expect(result).to.has.a.property("email").to.be.a("string")
        })
    }) 
    it("El repository debe poder eliminar un usuario", function(){
        const user={
            firstName: faker.person.firstName(),
            lastName: faker.person.lastName(),
            email: faker.internet.email(),
            age: 28,
            isAdmin: faker.datatype.boolean(),
            password: "kgldfkhñl"
        }
        return this.userRepository
        .create(user)
        .then(result=>{
            this.userRepository
            .deleteOne(result.id)
            .then(res=>{
                expect(res).to.not.throw()
                expect(res).to.be.null
            })
        })
    })
})
