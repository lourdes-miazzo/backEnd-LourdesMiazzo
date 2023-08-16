import UserManager from "../../domain/manager/UserManager.js"

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
        const {id} = req.params

        const manager = new UserManager()
        const user = await manager.getOne(id)
    
        res.status(200).send({ status: 'success', user })
    }
    catch(e){
        next(e)
    }
}
export const saveNewUser = async (req,res, next)=>{
    try{
        const body = req.body

        const manager = new UserManager()
        const user = await manager.create(body)

        res.status(201).send({ 
            status: 'success',
            message: 'User created.', 
            payload: user})
    }
    catch(e){
        next(e)
    }
}
export const saveCartInUser= async (req,res, next)=>{
    try{
        const id = req.params.id
    
        const managerCart = new CartManager()
        const createCart = await managerCart.newCart()
    
        const manager = new UserManager()
        const cartInUser = await manager.saveCartInUser(id, createCart)

        res.status(201).send({
            message: "Cart created",
            payload: cartInUser
        })
    }
    catch(e){
        next(e)
    }
}
export const updateUser = async (req,res, next)=>{
    try{
        const {id} = req.params

        const manager = new UserManager()
        const result = await manager.updateOne(id, req.body)

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
        const {id} = req.params

        const manager = new UserManager()
        await manager.deleteOne(id)

        res.status(200).send({
            status: 'success', 
            message: 'User deleted.'})
    }
    catch(e){
        next(e)
    }
}
export const modifyUser= async (req,res, next)=>{
    const id= req.params.id
    const files= req.files
    const requiredFiles= ["identification", "adressProof", "countStateProof"]
    
    for(const fieldname of requiredFiles){
        if(!req.files.find(file=> file.fieldname === fieldname)){
            return res.status(400).send({message: `File ${fieldname} has not been uploaded yet`})
        }
    } 
    const documentsInfo= files.map(f=>({name: f.originalname, link: f.path})) 

    const manager = new UserManager()
    const user = await manager.getOne(id)

    const findPremiumIndex = user.role.findIndex((role) => role === "premium")
    if (findPremiumIndex !== -1) {
      //si "premium" está presente, se elimina
        user.role.splice(findPremiumIndex, 1)
    } else {
      //sino se agrega
        user.role.push("premium")
        //y se agrega la info de los archivos a documents
        user.documents = documentsInfo
    } 

    const modifyRole= await manager.updateOne(id, user)
    
    res.status(200).send({
        status: "success", 
        message: "User modified correctly",
        payload: modifyRole})   
}

export const postDocuments= async(req,res,next)=>{
    try{
        if (!req.files){
            return  res.status(400).send({message: "Your file has not been uploaded successfully"})
        }
        res.status(200).send({message: "File uploaded successfully"})
    }
    catch(e){
        next(e)
    }
}