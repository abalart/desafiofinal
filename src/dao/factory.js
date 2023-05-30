import config from "../config/config.js";
import mongoose from "mongoose";

export let User;
export let Product;
export let Cart;
export let Message;
export let Ticket;

//Patron de diseño para poder cambiar facilmente a forma en que se hace la persistencia de información
switch (config.persistence) {
    case 'MONGO':

        mongoose.connect(config.mongo_uri, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            dbName: config.mongo_db_name
        }, () => console.log('Mongo connected'));
        
        const { default: UserMongo } = await import('./mongo/user.mongo.js')
        const { default: ProductMongo } =await import('./mongo/product.mongo.js')
        const { default: CartMongo } =await import('./mongo/cart.mongo.js')
        const { default: MessageMongo } =await import('./mongo/message.mongo.js')
        const { default: TicketMongo } =await import('./mongo/ticket.mongo.js');

        User = UserMongo;
        Product = ProductMongo;
        Cart = CartMongo;
        Message = MessageMongo;
        Ticket = TicketMongo;

        break;
    case 'MEMORY':
        console.log('Persistence with Memory');
        const { default: UserFile } =await import('./memory/user.memory.js')
        const { default: ProductFile } =await import('./memory/products.memory.js')
        const { default: CartFile } =await import('./memory/cart.memory.js')
        const { default: MessageFile } =await import('./memory/message.memory.js')
        const { default: TicketFile } =await import('./memory/ticket.memory.js');
        
        Ticket = TicketFile;
        Product = ProductFile;
        Message = MessageFile;
        Cart = CartFile;
        User = UserFile;
        break;
    default:
        break;
}