import UserManager from "../manager/mongoDB/user--Manager.js"
import idValidation from "../validations/idValidation.js"
import updateUserValidation from "../validations/updateUserValidation.js"

export const allUsers = async (req,res, next)=>{
    try{
        let limit = req.query.limit ? +req.query.limit : 10 
        let page = req.query.page ? +req.query.page : 1

        const manager = new UserManager()
    
        const users = await manager.list(limit, page)
    
        res.status(200).send({ status: 'success', users: users.docs, ...users, docs: undefined })
    }
    catch(e){
        next(e)
    }
}
export const oneUser = async (req,res, next)=>{
    try{
        await idValidation.parseAsync(req.params)
        console.log(idValidation)
        const {uid} = req.params

        const manager = new UserManager()
        const user = await manager.getOne(uid)
    
        res.status(200).send({ status: 'success', user })
    }
    catch(e){
        next(e)
    }
}
export const saveNewUser = async (req,res, next)=>{
    try{
        const manager = new UserManager()
        const user = await manager.create(req.body)

        res.status(201).send({ 
            status: 'success',
            message: 'User created.', 
            payload: user})
    }
    catch(e){
        next(e)
    }
}
export const updateUser = async (req,res, next)=>{
    try{
        await updateUserValidation.parseAsync({...req.params, ...req.body})
        const {uid} = req.params

        const manager = new UserManager()
        const result = await manager.updateOne(uid, req.body)

        res.status(200).send({
            status: 'success',
            message: 'User updated.', 
            payload: result })
    }
    catch(e){
        next(e)
    }
}
export const deleteUser = async (req,res, next)=>{
    try{
        const {uid} = req.params

        const manager = new UserManager()
        await manager.deleteOne(uid)

        res.status(200).send({
            status: 'success', 
            message: 'User deleted.'})
    }
    catch(e){
        next(e)
    }
}
