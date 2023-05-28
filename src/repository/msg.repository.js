import MessageDTO from "../dao/DTO/message.dto.js"

export default class MessageRepository {
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

    create = async (message) =>{
        try {
            const messageToInsert = new MessageDTO(message);
            const result = await this.dao.create(messageToInsert);
            return result;
        } catch (error) {
            console.log('Error to create service: '+ error);
        }
    }
}