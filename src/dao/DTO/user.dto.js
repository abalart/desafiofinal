
export default class UserDTO{
    constructor(user){
        this.first_name = user.first_name;
        this.last_name = user.last_name;
        this.email = user.email;
        this.age = user.age;
        this.password = user.password;
        this.cart = user.cart;
        this.role = user.role;
        this.documents = user.documents;
        this.last_conection = Date.now();
    }

    getCurrent = ()=>{
        return {
            first_name: this.first_name,
            last_name: this.last_name,
            email: this.email,
            age: this.age,
            cart: this.cart,
            role: this.role
        }
    }
}