import UserDTO from "../dao/DTO/user.dto.js"

export default class UserRepository {
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
            console.log('User not found');
        }
    }

        getBy = async(email)=>{
        try {
            return await this.dao.getBy({email: email});
        } catch (error) {
            console.log('User not found');
        }
    }

    create = async (user) =>{
        try {
            const userToInsert = new UserDTO(user);
            const result = await this.dao.create(userToInsert);
            return result;
        } catch (error) {
            console.log('Error to create service: '+ error);
        }
    }

    update = async (id, newUser)=>{
        try {
            const userToInsert = new UserDTO(newUser);
            const result = await this.dao.update(id, userToInsert);
            return result;
        } catch (error) {
            console.log('Error in update service: ' + error);
        }
    }
}