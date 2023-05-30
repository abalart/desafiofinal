import userModel from "./models/user.model.js";

export default class User {
    constructor() { }

    getAll = async () => {
        try {
             return await userModel.find().lean().exec();
        } catch (error) {
            console.log('Error to have users: ' + error);
        }
    }

    getOne = async (id) => {
        try {
            const user = await userModel.findById(id).lean().exec();
            return user;
        } catch (error) {
            console.log('Error to have user: User not found');
        }
    }

     getBy = async (params) => {
        try {
            const user = await userModel.findOne(params).lean().exec();
            return user;
        } catch (error) {
            console.log(error);
        }
    }

    create = async (newUser) => {
        try {
            const user = await userModel.findOne({ name: newUser.email });
            if (user) return user;
            const result = await userModel.create(newUser);
            return result;
        } catch (error) {
            console.log('Error to create user: ' + error);
        }
    }

    update = async (id, updUser) => {
        try {
            const result = await userModel.findOneAndUpdate(
                { _id: id }, // Busca el usuario con este email
                updUser, // Actualiza el campo "contraseña"  
                { new: true } // Devuelve el documento actualizado en lugar del original
            )
                .then(updatedUser => {
                    return updatedUser;

                })
                .catch(error => {
                    console.error('Error al actualizar usuario:', error);
                });
            return result;
        } catch (error) {
            console.log('Error in update mongo: ' + error);
        }
    }
    addDoc = async (id, docName, path) =>{
        try {
            const user = await userModel.findById(id);
            user.documents.push({name: docName, reference: path});
            user.save();
        } catch (error) {
            console.log(error);
        }
    }

    updateDoc = async (id, index, docName, path) =>{
        try {
            const user = await userModel.findById(id);
            user.documents[index] = {name: docName, reference: path};
            user.save();
        } catch (error) {
            console.log(error);
        }
    }
}
