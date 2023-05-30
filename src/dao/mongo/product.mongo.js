import prodModel from "./models/products.model.js";

export default class Product{
    constructor(){}

    getAll = async (search, options) => {
        try {
            const products = await prodModel.paginate(search, options);
            return products;
        } catch (error) {
            console.log('Error to get products: ' + error);
        }
    }

    getOne = async (id) => {
        try {
            const prod = await prodModel.findById(id).lean().exec();
            return prod;
        } catch (error) {
            console.log('product not found');
        }
    }

       getBy = async (params) =>{
        try {
            return await prodModel.find({'owner.role': params.role, 'owner.id': params.id}).lean().exec();
        } catch (error) {
            console.log(error);
        }
                                }
    create = async (newProd) => {
        try {
            const result = await prodModel.create(newProd);
            return result;
        } catch (error) {
            console.log('Error to create product: ' + error);
        }
    }

    update = async (id, newProd) => {
        try {
            const result = await prodModel.findByIdAndUpdate(id);
            return result 
        } catch (error) {
            console.log('Error product not found');
        }
    }

    delete = async (id) => {
        try {
            const result = await prodModel.findByIdAndDelete(id);
            return result;
        } catch (error) {
            console.log('ERROR: ', error);
        }
    }
}