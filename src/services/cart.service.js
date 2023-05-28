import CartDTO from "../DTO/cart.dto.js";
import Cart from "../mongo/cart.mongo.js"; 

export default class CartService{
    constructor(){
        this.mongoCart = new Cart();
    }

    getAll = async()=>{
        try {
            return await this.mongoCart.getAll();
        } catch (error) {
            console.log('Error in getting service: '+ error);
        }
    }

    getOne = async(id)=>{
        try {
            return await this.mongoCart.getOne(id);
        } catch (error) {
            console.log('cart not found');
        }
    }

    create = async () =>{
        try {
            const cartToInsert = new CartDTO();
            const result = await this.mongoCart.create(cartToInsert);
            return result;
        } catch (error) {
            console.log('Error to create cart service: '+ error);
        }
    }

    addProduct = async (id, pid, quantity)=>{
        try {
            const result = await this.mongoCart.addProduct(id,pid, quantity);
            return result;
        } catch (error) {
            console.log('Error to add product service' + error);
        }
    }

    update = async (id, products)=>{
        try {
            const result = await this.mongoCart.update(id, products);
            return result;
        } catch (error) {
            console.log('Error in update service: ' + error);
        }
    }

    updateProduct = (id, pid, quantity)=>{
        try {
            return this.mongoCart.updateProduct(id, pid, quantity);
        } catch (error) {
            console.log('Error to update product service: ' + error);
        }
    }

    delete = async (id) =>{
        try {
            return await this.mongoCart.delete(id);
        } catch (error) {
            console.log('Error to delete service: ' + error);
        }
    }

    clearCart = async (id)=>{
        try {
            return await this.mongoCart.clearCart(id);
        } catch (error) {
            console.log('Error to clear cart service: ' + error);
        }
    }

    deleteOneProduct  = async (id, pid) =>{
        try {
            return await this.mongoCart.deleteOneProduct(id,pid);
        } catch (error) {
            console.log('Error to delete one product service: ' + error);
        }
    }
}