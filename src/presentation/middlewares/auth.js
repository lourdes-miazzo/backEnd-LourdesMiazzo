import jwt from 'jsonwebtoken';

// acá se verifica que el token sea válido
const auth = (req, res, next) =>
{
    const authHeader = req.headers.authorization;

    if (!authHeader)
    {
        return res.status(401).send({ message: 'Authorization header empty' });
    }
    const token = authHeader.split(' ')[1];
    // acá se pasa la private key para ver si el token se hizo con la misma clave
    jwt.verify(token, process.env.PRIVATE_KEY, (error, credentials) =>
    {
        if (error)
        {
            return res.status(403).send({ message: 'Authentication error' });
        }
        // en este middleware se setean las credenciales
        req.user = credentials.user;
        // si todo sale bien este next me permite ir hacia current, o hacia los authorization especificos
        next();
    });
};

export default auth;
