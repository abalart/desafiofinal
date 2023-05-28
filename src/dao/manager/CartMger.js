import fs from 'fs';

class CartManager {
    constructor(path) {
        this.path = path;
        this.format = 'utf-8';
    }

    read = () => {
        if (fs.existsSync(this.path)) {
            return fs.promises.readFile(this.path, this.format).then(r => JSON.parse(r));
        }
        return [];
    }

    write = async carts => {
        fs.promises.writeFile(this.path, JSON.stringify(carts));
    }

    getNewID = carts =>{
        const count = carts.length;
        return (count > 0) ? carts[count - 1].id + 1 : 1;
    } 

    get = async () => {
        const carts = await this.read();
        return carts;
    }

    getbyId = async (id) => {
        const carts = await this.get();
        return carts.find((cart) => cart.id == id);
    }

    create = async () => {
        const carts = await this.get();
        const newID = this.getNewID(carts);
        const newcart = {
            id: newID,
            products: []
        };
        carts.push(newcart);

        await this.write(carts);

        return newcart;
    }

    addProduct = async (cartID, productID) =>{
        const cart = await this.getbyId(cartID);
        if(!cart)return;

        let found = false;
        for (let i=0; i<cart.products.length; i++) {
            if(cart.products[i].id === productID){
                cart.products[i].quantity++;
                found = true;
                break;
            }
        }
        if(!found){
            cart.products.push({
                id: productID,
                quantity: 1
            });
        }
        await this.update(cartID, cart);
        return cart;
    }

    update = async (id, obj) => {
        obj.id = id;
        const carts = await this.read();

        for (let i=0; i<carts.length; i++) {
            if (carts[i].id == id) {
                carts[i] = obj;
                break;
            }
        }

        await this.write(carts);
    }

    delete = async (id) => {
        const carts = await this.get();
        const idx = carts.findIndex((e) => e.id == id);
        if (idx < 0) return;
        carts.splice(idx, 1);
        await this.write(carts);
        return carts;
    }

    deleteProduct = async (cartID, productID) =>{
        const cart = await this.getbyId(cartID);
        if(!cart)return;
        let prodVoid = false;
        let idx;
        for (let i=0; i<cart.products.length; i++) {
            if(cart.products[i].id === productID){
                cart.products[i].quantity--;
                if (cart.products[i].quantity == 0) {
                    prodVoid = true;
                    idx = i;
                }
                break;
            }
        }
        if(prodVoid){
            cart.products.splice(idx, 1);
        }
        await this.update(cartID, cart);
        return cart;
    }
}

export default CartManager;