import ProductManager from "../../domain/manager/ProductManager.js"
export const authorizationOnlyUser= (permission)=>{
    return async(req,res,next)=>{
        const pid= req.params.pid
        const user= req.user
        const manager= new ProductManager()
        const getOwner= await manager.getOne(pid)
        if(user.role.includes(permission) || (user.role.includes("premium") && user.email !== getOwner.owner)){
            next()
        }else{
            res.status(401).send({message: "You lack authorization to continue"})
        }
        
    }
}