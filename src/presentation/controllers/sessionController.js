import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();
import CartManager from '../../domain/manager/CartManager.js';
import SessionManager from '../../domain/manager/SessionManager.js';
import RoleManager from '../../domain/manager/RoleManager.js';
import EmailManager from '../../domain/manager/EmailManager.js';
import UserManager from '../../domain/manager/UserManager.js';
import { generateToken, generateTokenNewPassword } from '../../shared/index.js';
import { createHash } from '../../shared/index.js';


export const login = async(req, res, next) =>
{
    try
    {
        req.logger.debug('session controller: login');
        const email = req.body.email;
        const password = req.body.password;

        const manager = new SessionManager();
        const user = await manager.getOneByEmail(email);

        if (user.id === undefined)
{
            const error = new Error('Login failed, user not found.');
            error.statusCode = 400;
            throw error;
        }
        user.lastConnection = new Date();

        const userUpd = new UserManager();
        const userUpdated = await userUpd.updateConnection(user.id, user);

        // siempre va primero el password que se recibe por body y luego el que se obtiene
        // al obtener el objeto usuario!!!
        const isHashedPassword = await manager.collate(password, userUpdated);

        if (!isHashedPassword)
        {
            const error = new Error('invalid password.');
            error.statusCode = 401;
            throw error;
        }
        // una vez que se comprueba la coincidencia de la contraseña ingresada con la guardada
        // se genera un token con la info del usuario,  que se guarda del lado del cliente para
        // que al navegar por las distintas secciones envie los token en c/req y al ser recibidos
        // por el servidor son interpretados y se da acceso al recurso
        const accessToken = await generateToken(userUpdated);
        res.cookie('accessToken', accessToken, {
            maxAge: 60 * 60 * 100,
            httpOnly: true
        }).status(200).send({ message: 'Login success!', accessToken });
        }
    catch (e)
    {
        next(e);
    }
};

export const current = async(req, res, next) =>
{
    try
    {
        req.logger.debug('session controller: current');
        // como se setean las credenciales en el usuario ahora vamos a poder acceder al user y
        // tener acceso a la info del login
        res.status(200).send({
            message: 'success',
            payload: req.user });
    }
    catch (e)
    {
        next(e);
    }
};
export const signup = async(req, res, next) =>
{
    try
    {
        req.logger.debug('session controller: signup');
        const body = req.body;

        const cart = new CartManager();
        const cartAssociated = await cart.newCart();
        body.cart = cartAssociated.id;
        if (body.role !== undefined)
        {
            const role = new RoleManager();
            const newRole = await role.createRoleByName(body.role);
            body.role = newRole.id;
        }
        const manager = new SessionManager();
        const userExist = await manager.getOneByEmail(body.email);

        if (userExist.id === undefined)
        {
            const user = await manager.create(body);
            return res.status(201).send({
            status: 'success',
            message: 'User created.',
            payload: user });
        }
        res.status(400).send({ status: 'error', message: 'Mail already in use' });
    }
    catch (e)
    {
        next(e);
    }
};
export const logout = async(req, res, next) =>
{
    try
    {
        req.logger.debug('session controller: logout');
        const token = req.headers.cookie;

        const tokenAccess = token.split('=')[1];

        jwt.verify(tokenAccess, process.env.PRIVATE_KEY, async(error, credentials) =>
        {
            if (error)
            {
                return res.status(403).send({ message: 'Authentication error' });
            }

        const infoUser = credentials.user;
        const id = infoUser.id;
        const newLastConnection = new Date();

        infoUser.lastConnection = newLastConnection;
        const userManager = new UserManager();
        await userManager.updateOne(id, infoUser);
        });

        res.clearCookie('accessToken');
        res.status(200).send({ message: 'logout ok!' });
    }
    catch (e)
    {
        next(e);
    }
};

export const forgotPassword = async(req, res, next) =>
{
    try
    {
        req.logger.debug('session controller: forget password');
        const email = req.body.email;

        const manager = new SessionManager();
        const userEmail = await manager.getOneByEmail(email);
        if (userEmail.id === undefined)
        {
            return res.status(401).send({ message: 'This email dont have an account associated' });
        }
        const tokenPassword = await generateTokenNewPassword(userEmail);

        const emailManager = new EmailManager();
        await emailManager.emailPassword(tokenPassword, email);

        res.status(200).send({ message: 'mail send' });
    }
    catch (e)
    {
        next(e);
    }
};

export const forgotPasswordView = async(req, res) =>
{
    const token = req.params.token;
    const email = req.params.email;
    res.render('forgotPassword', { title: 'Forgot Password', token, email });
};

export const newPassword = async(req, res, next) =>
{
    try
    {
        req.logger.debug('session controller: new password');
        const token = req.body.token;
        const email = req.body.email;
        const newPassword = req.body.password;
        const passConfirmation = req.body.passwordConfirmation;

        if (newPassword !== passConfirmation)
        {
            return res.status(400).send({ message: 'Passwords do not match each other' });
        }
        // controlar si el token expiró
        jwt.verify(token, process.env.PRIVATE_KEY_2, async(error, credentials) =>
        {
            if (error)
            {
                    // si expiró se envía un nuevo mail
                    const tokenPassword = await generateTokenNewPassword(email);

                    const emailManager = new EmailManager();
                    await emailManager.emailPassword(tokenPassword, email);

                    res.status(403).send({ message: 'Expired token, new mail sended' });
            }
            else
            {
                // si no expiró se toma la informacion de la nueva contraseña, se la hashea y se la
                // incluye actualizando la info del usuario en la db
                const manager = new SessionManager();
                const dto = {
                    email,
                    password: await createHash(newPassword)
                };
                await manager.forgetPass(dto);
                res.status(200).send({ message: 'Password changed correctly' });
            }
            });
        }
    catch (e)
    {
        next(e);
    }
};

export const changePassword = async(req, res, next) =>
{
    try
    {
        const email = req.body.email;
        const newPassword = req.body.newPassword;
        const newPasswordConfirmation = req.body.newPasswordConfirmation;

        if (email !== req.user.email)
        {
            return res.status(400).send({ message: 'The email you entered does not match the one you logged in' });
        }
        if (newPassword !== newPasswordConfirmation)
        {
            return res.status(400).send({ message: 'Passwords do not match each other' });
        }

        const dto = {
            email,
            password: newPassword
        };
        const manager = new SessionManager();
        await manager.changePass(dto);
        res.status(200).send({ message: 'Password change correctly' });
    }
    catch (e)
    {
        next(e);
    }
};

