import SessionManager from "../manager/mongoDB/sessionManager.js"
import UserManager from "../manager/mongoDB/userManager.js"
import bcrypt from "bcrypt"

export const login= async (req,res)=>{
    try{
        const email = req.body.email
        const password = req.body.password 

        if (!email && !password){
            throw new Error('Email and Password invalid format.')
        }

        const manager = new SessionManager()
        const user = await manager.getOneByEmail(email)

        if(!user){
            return res.status(401).send({ message: 'Login failed, user dont exist.'})
        }

        const isHashedPassword = await manager.comparePassword(user, password)
        console.log(isHashedPassword)
        if (!isHashedPassword)
        {
            return res.status(401).send({ message: 'Login failed, invalid password.'})
        }

        req.session.user = { email }
        res.send({ message: 'Login success!' })
        }
        catch(e){
            throw e
        }
}
export const signup= async (req,res)=>{
    try{
        const manager = new SessionManager();
        
        const user = await manager.create(req.body);
        res.status(201).send({ 
            status: 'success', 
            message: 'User created.',
            payload: user })
        
    }
    catch(e){
        throw e
    }
}
export const logout= async (req,res)=>{
    try{
        req.session.destroy(err=>{
            if(!err){
                return res.send({message: "logout ok!"})
            }
            res.send({ message: 'Logout error!', body: err })
        })
    }
    catch(e){
        throw e
    }
}