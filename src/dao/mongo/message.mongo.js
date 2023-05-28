import msgModel from "./models/messages.model.js";

export default class Message{
    constructor(){}

    getAll = async()=>{
        try {
            const messages = await msgModel.find().lean().exec();
            return messages;
        } catch (error) {
            console.log('Error to have messages: ' + error);
        }
    }

    create = async(data)=>{
        try {
            const result = await msgModel.create(data);
            return result;
        } catch (error) {
            console.log('Error to create message: ' + error);
        }
    }
}