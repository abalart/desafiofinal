export default class TicketDTO{ //Procesamiento de la compra
    constructor(ticket){
        this.code = ticket.code;
        this.purchase_datetime = ticket.date;
        this.amount = ticket.amount;
        this.purchaser = ticket.email;
    }
}