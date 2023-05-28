import CartDTO from "../dao/DTO/cart.dto.js"

export default class CartRepository {
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
            console.log('cart not found repository:' + error);
        }
    }

    create = async () =>{
        try {
            const cartToInsert = new CartDTO();
            const result = await this.dao.create(cartToInsert);
            return result;
        } catch (error) {
            console.log('Error to create cart service: '+ error);
        }
    }

    addProduct = async (id, pid, quantity)=>{
        try {
            const result = await this.dao.addProduct(id,pid, quantity);
            return result;
        } catch (error) {
            console.log('Error to add product service' + error);
        }
    }

    update = async (id, products)=>{
        try {
            const result = await this.dao.update(id, products);
            return result;
        } catch (error) {
            console.log('Error in update service: ' + error);
        }
    }

    updateProduct = (id, pid, quantity)=>{
        try {
            return this.dao.updateProduct(id, pid, quantity);
        } catch (error) {
            console.log('Error to update product service: ' + error);
        }
    }

    delete = async (id) =>{
        try {
            return await this.dao.delete(id);
        } catch (error) {
            console.log('Error to delete service: ' + error);
        }
    }

    clearCart = async (id)=>{
        try {
            return await this.dao.clearCart(id);
        } catch (error) {
            console.log('Error to clear cart service: ' + error);
        }
    }

    deleteOneProduct  = async (id, pid) =>{
        try {
            return await this.dao.deleteOneProduct(id,pid);
        } catch (error) {
            console.log('Error to delete one product service: ' + error);
        }
    }

    purchase = async (cid)=>{
        try {
            return await this.dao.purchase(cid);
        } catch (error) {
            console.log('Error repository to purchase service: ' + error);
        }
    }
}