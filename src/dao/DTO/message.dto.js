export default class MsgDTO{
    constructor(message){
        this.user = message.user,
        this.email = message.email;
        this.message = message.message;
        this.date = message.date;
    }
}