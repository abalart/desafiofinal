import UserDTO from "../DTO/user.dto.js";
import User from "../mongo/user.mongo.js"; 

export default class UserService{
    constructor(){
        this.mongoUser = new User();
    }

    getAll = async()=>{
        try {
            return await this.mongoUser.getAll();
        } catch (error) {
            console.log('Error in getting service: '+ error);
        }
    }

    getOne = async(id)=>{
        try {
            return await this.mongoUser.getOne(id);
        } catch (error) {
            console.log('User not found');
        }
    }

    create = async (user) =>{
        try {
            const userToInsert = new UserDTO(user);
            const result = await this.mongoUser.create(userToInsert);
            return result;
        } catch (error) {
            console.log('Error to create service: '+ error);
        }
    }

    update = async (id, user)=>{
        try {
            const userToInsert = new UserDTO(user);
            const result = await this.mongoUser.update(id, userToInsert);
            return result;
        } catch (error) {
            console.log('Error in update service: ' + error);
        }
    }
}