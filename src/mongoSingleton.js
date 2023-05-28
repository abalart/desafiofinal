import mongoose from "mongoose";
import config from "./config/config.js";
import { Server } from "socket.io";
import run from './run.js';

export default class MongoSingleton {

    static #instance

    constructor(app) {
        mongoose.connect(config.mongo_uri,
            { dbName: config.mongo_db_name },
            (error) => {
                if (error) {
                    console.log('No se pudo conectar a la DB');
                    return
                }
                // corremos el servidor con estas lineas
                console.log('DB connected');
                // se ejecuta en el puerto 8080
                // 127.0.0.1:8080
                const httpServer = app.listen(8080, () => console.log('listening...'));
                // capturamos cualquier error
                httpServer.on('error', () => console.log('Error'));
                // iniciamos server web socket.io
                const io = new Server(httpServer);
    
                // funcion importada con todos los routes
                run(io, app);
            })
    }

    static getInstance(app) {
        if(this.#instance) {
            console.log('Already connected!');
            return this.#instance
        }

        this.#instance = new MongoSingleton(app);
        console.log('Connected!');

        return this.#instance
    }
}