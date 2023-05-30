export default class ProductDTO{
    constructor(prod){
        this.title = prod.title;
        this.description = prod.description;
        this.price = prod.price;
        this.status = true;
        this.stock = prod.stock
        this.category = prod.category;
        this.thumbnails = prod.thumbnails.split(',');
        this.owner = prod.owner;
    }
}