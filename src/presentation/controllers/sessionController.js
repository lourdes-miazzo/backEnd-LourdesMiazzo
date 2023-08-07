import jwt from "jsonwebtoken"

import CartManager from "../../domain/manager/CartManager.js"
import SessionManager from "../../domain/manager/SessionManager.js"
import EmailManager from "../../domain/manager/EmailManager.js"
import { generateToken, generateTokenNewPassword } from "../../shared/index.js"
import { createHash } from "../../shared/index.js"



export const login= async (req,res, next)=>{
    try{

        req.logger.debug("session controller: login")
        const email = req.body.email
        const password = req.body.password 
    
        const manager = new SessionManager()
        const user = await manager.getOneByEmail(email)

        if(user.id === undefined){
            const error = new Error('Login failed, user dont exist.');
            error.statusCode = 401;
            throw error;
        }
        //siempre va primero el password que se recibe por body y luego el que se obtiene
        // al obtener el objeto usuario!!!
        const isHashedPassword = await manager.collate(password, user)

        if (!isHashedPassword){
            const error = new Error('invalid password.');
            error.statusCode = 401;
            throw error;
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
        req.logger.debug("session controller: current")
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
        req.logger.debug("session controller: signup")
        const body= req.body
        
        const cart = new CartManager()
        const cartAssociated = await cart.newCart()

        const manager = new SessionManager()
        const userExist = await manager.getOneByEmail(body.email)
     
        if(userExist.id === undefined){
            const user = await manager.create(body, cartAssociated)
            return res.status(201).send({ 
            status: 'success', 
            message: 'User created.',
            payload: user })  
        } 
        res.status(400).send({  status: 'error', message: 'Mail already in use'})
    }
    catch(e){
        next(e)
    }
}
export const logout= async (req,res, next)=>{
    try{
        req.logger.debug("session controller: logout")
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

export const forgetPassword = async(req, res, next)=>{
    try{
        req.logger.debug("session controller: forget password")
        const email = req.body.email

        const manager = new SessionManager()
        const userEmail = await manager.getOneByEmail(email)
        if(userEmail.id === undefined){
            return res.status(401).send({ message: 'This email dont have an account associated'})
        }
        const tokenPassword = await generateTokenNewPassword(userEmail)

        const emailManager= new EmailManager()
        await emailManager.emailPassword(tokenPassword, email)
        
        res.status(200).send({message: "mail send"}) 
    }
    catch(e){
        next(e)
    }
}


export const newPassword = async(req,res, next)=>{
        try {
            req.logger.debug("session controller: new password")
            const token = req.params.token
            const email = req.params.email
            const newPassword = req.body.password
            
            //controlar si el token expiró
            jwt.verify(token, process.env.PRIVATE_KEY_2, async(error, credentials)=>{
                if(error){
                    //si expiró se envía un nuevo mail
                    const tokenPassword = await generateTokenNewPassword(email)

                    const emailManager= new EmailManager()
                    await emailManager.emailPassword(tokenPassword, email)
                    
                    res.status(403).send({message: "Expired token, new mail sended"})
                }else{
                    //si no expiró se toma la informacion de la nueva contraseña, se la hashea y se la 
                    //incluye actualizando la info del usuario en la db
                    const manager = new SessionManager();
                    const dto = {
                        email,
                        password: await createHash(newPassword),
                    };
                    await manager.forgetPass(dto);
                    res.status(200).send({ message: "Password changed correctly" });
                }
            }) 
        } catch (e) {
            next(e)
        }
} 



