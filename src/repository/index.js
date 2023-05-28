import { User, Product, Cart, Message, Ticket } from "../dao/factory.js";

import ProductRepository from "./prod.repository.js";
import CartRepository from './cart.repository.js';
import UserRepository from "./user.repository.js";
import MessageRepository from "./msg.repository.js";
import TicketRepository from "./ticket.repository.js";
import Mocking from '../dao/mocking/products.mock.js';

export const TicketService = new TicketRepository(new Ticket());
export const UserService = new UserRepository(new User());
export const CartService = new CartRepository(new Cart());
export const ProductService = new ProductRepository(new Product());
export const MessageService = new MessageRepository(new Message());
export const MockService = new Mocking(100);