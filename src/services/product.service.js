import ProductDTO from "../DTO/products.dto.js";
import Product from "../mongo/product.mongo.js";

export default class ProductService {
    constructor() {
        this.mongoProduct = new Product();
    }

    getAll = async (limit, page, filter, sortQuery, sortQueryOrder) => {
        try {
            const search = {}
            if (filter) {
                search.title = filter
            }

            const sort = {}
            if (sortQuery) {
                sort.sortQuery = sortQueryOrder;
            }

            const options = {
                limit,
                page,
                sort,
                lean: true
            }
            return await this.mongoProduct.getAll(search, options);
        } catch (error) {
            console.log('Error in getting service: ' + error);
        }
    }

    getOne = async (id) => {
        try {
            return await this.mongoProduct.getOne(id);
        } catch (error) {
            console.log('Product not found');
        }
    }

    create = async (prod) => {
        try {
            const prodToInsert = new ProductDTO(prod);
            const result = await this.mongoProduct.create(prodToInsert);
            return result;
        } catch (error) {
            console.log('Error to create service: ' + error);
        }
    }

    update = async (id, newProd) => {
        try {
            const userToInsert = new ProductDTO(newProd);
            const result = await this.mongoProduct.update(id, userToInsert);
            return result;
        } catch (error) {
            console.log('Error in update service: ' + error);
        }
    }

    delete = async(pid)=>{
        try {
            return await this.mongoProduct.delete(pid);
        } catch (error) {
            console.log('Error to delete service: ' + error);
        }
    }
}