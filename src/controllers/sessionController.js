import SessionManager from "../manager/mongoDB/session--Manager.js"
import { generateToken } from "../shared/index.js"


export const login= async (req,res)=>{
    try{
        const email = req.body.email
        const password = req.body.password 

        if (!email && !password){
            throw new Error('Email and Password invalid format.')
        } //agregar zod acá para validar

        const manager = new SessionManager()
        const user = await manager.getOneByEmail(email)

        if(!user){
            return res.status(401).send({ message: 'Login failed, user dont exist.'})
        }
        //siempre va primero el password que se recibe por body y luego el que se obtiene
        // al buscar el usuario!!!
        const isHashedPassword = await manager.collate(password, user)
        console.log(isHashedPassword)
        if (!isHashedPassword)
        {
            return res.status(401).send({ message: 'Login failed, invalid password.'})
        }
        //una vez que se comprueba la coincidencia de la contraseña ingresada con la guardada  
        //se genera un token con la info del usuario,  que se guarda del lado del cliente para 
        //que al navegar por las distintas secciones envie los token en c/req y al ser recibidos 
        //por el servidor son interpretados y se da acceso al recurso  
        const accesToken = await generateToken(user)
        res.status(200).send({accesToken ,message: 'Login success!'})
        }
        catch(e){
            throw e
        }
}

export const current = async(req, res)=>{
    try{
        //como se setean las credenciales en el usuario ahora vamos a poder acceder al user y 
        //tener acceso a la info del login
        res.status(200).send({
            message: "success", 
            payload: req.user})
    }
    catch(e){
        next(e)
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
                return res.status(200).send({message: "logout ok!"})
            }
            res.status(400).send({ 
                message: 'Logout error!',
                body: err })
        })
    }
    catch(e){
        throw e
    }
}