import UserManager from "../manager/mongoDB/userManager.js"
import bcrypt from "bcrypt"

export const login= async (req,res)=>{
    try{
        const email = req.body.userName
        const password = req.body.password 

        if (!email && !password){
            throw new Error('Email and Password invalid format.')
        }

        const manager = new UserManager()
        const user = await manager.getOneByEmail(email)
        const isHashedPassword = await bcrypt.compare(password, user.password)
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
        
        const manager = new UserManager();
        const payload = {
            ...req.body,
            password: await bcrypt.hash(req.body.password, 10)
        }
    
        const user = await manager.create(payload);
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