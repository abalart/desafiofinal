import FileManager from "./fileManager.js";

export default class Ticket {

    constructor() {
        this.fileManager = new FileManager("db_file/tickets.json")
    }

    get = async() => {
        return await this.fileManager.get()
    }

    getOneByID = async(id) => {
        return await this.fileManager.getOneByParam("id", id)
    }

    getOneByEmail = async(email) => {
        return await this.fileManager.getOneByParam("email", email)
    }

    create = async(data) => {
        return await this.fileManager.add(data)
    }

}