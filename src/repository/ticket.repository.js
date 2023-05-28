import TicketDTO from "../dao/DTO/ticket.dto.js"
import { v4 as uuidv4 } from 'uuid';

export default class TicketRepository {
    constructor(dao) {
        this.dao = dao
    }

    getAll = async()=>{
        try {
            return await this.dao.getAll();
        } catch (error) {
            console.log('Error in getting service: '+ error);
        }
    }

    getOne = async(id)=>{
        try {
            return await this.dao.getOne(id);
        } catch (error) {
            console.log('ticket not found');
        }
    }

    create = async (email, amount)=>{
        try {            
            const ticketToInsert = new TicketDTO({email: email,
                                                    amount: amount,
                                                    code: uuidv4(),
                                                    date: new Date(Date.now())
                                                });
            return await this.dao.create(ticketToInsert);
        } catch (error) {
            console.log('Error to create ticket repository');
        }
    }
}