// express
import express from "express";
// DB
import mongoose from "mongoose";
// socket
import { Server } from "socket.io";
//vista
import handlebars from "express-handlebars"
import swaggerJSDoc from 'swagger-jsdoc';

// cookie
import cookieParser from "cookie-parser";
//sessions
import session from 'express-session';
import MongoStore from 'connect-mongo';
import passport from "passport";
import initializePassport from "./config/passport.config.js";
//email

//utils
import config from "./config/config.js";
import __dirname from './utils.js';
import run from "./run.js";



const app = express();

const swaggerOptions = {
    definition: {
        openapi: '3.0.1',
        info: {
            title: "Documentation de Eccommerce",
            description: "Proyecto eccommerce"
        }
    },
    apis: [`${__dirname}/docs/**/*.yaml`]
}

const specs = swaggerJSDoc(swaggerOptions);

app.engine('handlebars', handlebars.engine());
// seteamos la carpeta donde va a capturar los recursos el motor
app.set('views', __dirname + '/views');
// terminamos de definir la vista
app.set('view engine', 'handlebars');

// especificamos la carpeta public para la pagina
app.use(express.static(__dirname + '/public'));

// transforma la informacion recibida en json por 
// medio de un middleware
app.use(express.json());
// permite recibir indormacion desde la url por medio del body como json
app.use(express.urlencoded({ extended: true }));

app.use(cookieParser('EccommercecookieToken'))


app.use(session({
    store: MongoStore.create({
        mongoUrl: config.mongo_uri,
        dbName: config.mongo_db_name,
        mongoOptions: {
            useNewUrlParser: true,
            useUnifiedTopology: true
        },
        ttl: 15
    }),
    secret: '12345', //Tomar de variable de entorno
    resave: true, 
    saveUninitialized: true 
}));
initializePassport()
app.use(passport.initialize());
app.use(passport.session());


mongoose.set('strictQuery', false);


const env = () => {
   
    const httpServer = app.listen(config.port);
    // capturamos cualquier error
    httpServer.on('error', () =>  req.logger.error('Error: ', error));
    // iniciamos server web socket.io
    const io = new Server(httpServer);

    // funcion importada con todos los routes
    run(io, app, specs);
    
}

env();
