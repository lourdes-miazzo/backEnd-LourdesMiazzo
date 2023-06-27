export const authorizationOnlyUser= (permission)=>{
    return async(req,res,next)=>{
        const user= req.user
        console.log(user)
        if(!user.role || !user.role.includes(permission)){
            return res.status(401).send({message: "You lack authorization to continue"})
        }
        next()
    }
}