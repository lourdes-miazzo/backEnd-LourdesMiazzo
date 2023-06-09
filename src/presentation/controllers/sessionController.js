import CartManager from "../../domain/manager/CartManager.js"
import SessionManager from "../../domain/manager/SessionManager.js"
import { generateToken } from "../../shared/index.js"

export const login= async (req,res, next)=>{
    try{
        const email = req.body.email
        const password = req.body.password 

        const manager = new SessionManager()
        const user = await manager.getOneByEmail(email)

        if(!user){
            return res.status(401).send({ message: 'Login failed, user dont exist.'})
        }
        //siempre va primero el password que se recibe por body y luego el que se obtiene
        // al obtener el objeto usuario!!!
        const isHashedPassword = await manager.collate(password, user)
        if (!isHashedPassword)
        {
            return res.status(401).send({ message: 'Login failed, invalid password.'})
        }
        //una vez que se comprueba la coincidencia de la contraseña ingresada con la guardada  
        //se genera un token con la info del usuario,  que se guarda del lado del cliente para 
        //que al navegar por las distintas secciones envie los token en c/req y al ser recibidos 
        //por el servidor son interpretados y se da acceso al recurso  
        const accessToken = await generateToken(user)
        res.cookie("accessToken", accessToken, {
            maxAge: 60*60*100,
            httpOnly: true
        }).status(200).send({message: 'Login success!', accessToken})
        }
        catch(e){
            next(e)
        }
}

export const current = async(req, res, next)=>{
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
export const signup= async (req,res, next)=>{
    try{
        const body= req.body
        const cart = new CartManager()
        const cartAssociated = await cart.newCart()

        const manager = new SessionManager()
        const user = await manager.create(body, cartAssociated)
      
        res.status(201).send({ 
            status: 'success', 
            message: 'User created.',
            payload: user }) 
    
    }
    catch(e){
        next(e)
    }
}
export const logout= async (req,res, next)=>{
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
        next(e)
    }
}