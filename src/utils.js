import { fileURLToPath } from 'url';
import { dirname } from 'path';
import bcrypt, { hashSync } from 'bcrypt';
import jwt from 'jsonwebtoken';
import passport from 'passport';
import config from './config/config.js';
import { faker } from '@faker-js/faker'
import nodemailer from 'nodemailer'

faker.locale = 'es'
const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

export default __dirname

//transport email
export const transport = nodemailer.createTransport({
    service: 'gmail',
    port: 587,
    auth: {
        user: config.email,
        pass: config.pass
    }
})

//genera el jwt Token
export const generateToken = user => {
    const token = jwt.sign({ user }, config.private_key, { expiresIn: '30m' });
    return token;
}

// recoje el token de la cookie y ve si existe y si esta autorizado
export const authToken = (req, res, next) => {
    const token = req.cookies[config.jwt_cookie_name];

    if (!token) return res.status(401).render('errors/base', { error: "Not Auth" });

    jwt.verify(token, config.private_key, (error, credentials) => {
        if (error) return res.status(403).render('errors/base', { error: "Not authorizad" })

        req.user = credentials.user;
        next();
    })
}

export const validateTokenAndGetID = (req, res, next) => {
    const token = req.params.jwt;
    jwt.verify(token, config.private_key, (error, credentials) => {
        if (error) return res.render('session/restore', { message: "token expired" })
        req.id = credentials.user;
        next();
    })
}

//extrae la cookie
export const extractCookie = req => {
    return (req && req.cookies) ? req.cookies[config.jwt_cookie_name] : null;
}

// Crea una password
export const createHash = password => {
    return bcrypt, hashSync(password, bcrypt.genSaltSync(10));
}

export const isValidPassword = (user, password) => {
    return bcrypt.compareSync(password, user.password);
}

export const passwordFormatIsValid = (password)=>{
    const message = {};
    if(password.length < 8) message.large = "Debe tener como minimo 8 caracteres.";
    if(!(/[A-Z]/.test(password))) message.mayus = "Debe contener al menos una mayuscula.";
    if(!(/[0-9]/.test(password))) message.number = "Debe contener algun numero.";

    return message;

}

// PASSPORT CALL
export const passportCall = (strategy) => {
    return async (req, res, next) => {
        passport.authenticate(strategy, function (err, user, info) {
            if (err) return next(err);
            if (!user) {
                return res.status(401).render('errors/base', { error: info.messages ? info.messages : info.toString() })
            };
            req.user = user;
            next();
        })(req, res, next)
    }
}

// VALIDATE AUTHORIZATION
export const authorization = (aRole) => {
    return async (req, res, next) => {
        const user = req.user.user;
        if (!user) return res.status(401).send({ error: "No autenticado" });
            if (!aRole.includes(user.role)) return res.status(403).send({ error: 'No Permission' })
        next();
    }
}

export const productsMock = (cant) =>{
    const products = [];
    for (let i = 0; i < cant; i++) {
        products.push(generateProduct());
    }
    return products;
}

export const generateProduct = () => {
    return {
        id: faker.database.mongodbObjectId(),
        title: faker.commerce.productName(),
        description: faker.commerce.productDescription(),
        price: faker.commerce.price(),
        status: true,
        stock: faker.random.numeric(1),
        category: faker.commerce.productMaterial(),
        thumbnails: [faker.image.imageUrl()],
    }
}