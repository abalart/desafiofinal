import { CartService, TicketService } from "../../repository/index.js";
import EErrors from "../../services/errors/enumErrors.js";
import { generateGetCartsErrorInfo } from "../../services/errors/info.js";

export const getAll = async (req, res) =>{
    try {
        const carts = await CartService.getAll();
        if(!carts){
            req.logger.error(
                CustomError.createError({
                    name: "Get carts error",
                    cause: generateGetCartsErrorInfo(),
                    message: 'Error trying to get Cart',
                    code: EErrors.CART_NOT_FOUND_ERROR
                })
            );
        }
        res.render('carts',
        { 
            titlePage: 'Carts',
            style: 'cart.css',
            carts
        });
    } catch (error) {
        req.logger.error('Error: ', error);
    }
}

export const getOne = async (req, res) =>{
    try {
        const cid =  req.params.cid;
        const cart = await CartService.getOne(cid);
        console.log("cid:"+cid)
        console.log("cart:"+cart)

        if(!cart){
            req.logger.error(
                CustomError.createError({
                    name: "Get carts error",
                    cause: generateGetCartsErrorInfo(),
                    message: 'Error trying to get Cart',
                    code: EErrors.CART_NOT_FOUND_ERROR
                })
            );
        }
        return res.render('carts', {
            titlePage: 'Cart',
            style: 'cart.css',
            cart
        });
    } catch (error) {
        req.logger.error('Error: ', error);
    }
}

export const create = async (req, res) =>{
    try {
        const createCart = await CartService.create();
        if(!createCart){
            req.logger.error(
                CustomError.createError({
                    name: "create carts error",
                    cause: generateGetCartsErrorInfo(),
                    message: 'Error trying to create cart',
                    code: EErrors.CREATE_CART_ERROR
                })
            );
        }
        res.send({status: 'successful', createCart});
    } catch (error) {
        req.logger.error('Error: ', error);
    }
}

export const addProduct = async (req, res) =>{
    try {
        const cid = req.params.cid;
        const pid = req.params.pid;
        const quantity = req.body?.quantity || 1;
        
        const result = await CartService.addProduct(cid, pid, quantity);
    
        if(!result){
            req.logger.error(
                CustomError.createError({
                    name: "create carts error",
                    cause: generateAddProductInCartErrorInfo({cid, pid, quantity}),
                    message: 'Error trying to create cart',
                    code: EErrors.ADD_PRODUCT_IN_CART_ERROR
                })
            );
        }
    
        res.redirect(`/api/carts/${cid}`);
    } catch (error) {
        req.logger.error('Error: ', error);
    }

}
export const update = async (req, res) =>{
    try {
        const newProducts= req.body;
        const cid = req.params.cid;
        const cart = await CartService.update(cid, newProducts);
        if(!cart){
            req.logger.error(
                CustomError.createError({
                    name: "Get carts error",
                    cause: generateGetCartsErrorInfo(),
                    message: 'Error trying to get Cart',
                    code: EErrors.CART_NOT_FOUND_ERROR
                })
            );
        }        
        res.json({status: 'successful', cart})
    } catch (error) {
        req.logger.error('Error: ', error);
    }
}
export const updateProduct = async (req, res) =>{
    try {
        const cid = req.params.cid;
        const pid = req.params.pid;
        const quantity = req.body?.quantity || 1;
    
        const cart = await CartService.updateProduct(cid, pid, quantity);
        if(!cart){
            req.logger.error(
                CustomError.createError({
                    name: "Get carts error",
                    cause: generateGetCartsErrorInfo(),
                    message: 'Error trying to get Cart',
                    code: EErrors.CART_NOT_FOUND_ERROR
                })
            );
        }
        res.json({status: 'successful', cart})
    } catch (error) {
        req.logger.error('Error: ', error);
    }

}
export const deleteCart = async (req, res) =>{
    try {
        const cid = req.params.cid;
        const result = await CartService.deleteCart(cid);
        if(!result){
            req.logger.error(
                CustomError.createError({
                    name: "create carts error",
                    cause: generateAddProductInCartErrorInfo({cid}),
                    message: 'Error trying to create cart',
                    code: EErrors.ADD_PRODUCT_IN_CART_ERROR
                })
            );
        }
        res.json({status: 'delete successful', result});
    } catch (error) {
        req.logger.error('Error: ', error);
    }
}
export const clearCart = async (req, res) =>{
    try {
        const cid = req.params.cid;
        const cart = await CartService.clearCart(cid);
        if(!cart){
            req.logger.error(
                CustomError.createError({
                    name: "Get carts error",
                    cause: generateGetCartsErrorInfo(),
                    message: 'Error trying to get Cart',
                    code: EErrors.CART_NOT_FOUND_ERROR
                })
            );
        }
        res.json({status: 'successful', cart})
    } catch (error) {
        req.logger.error('Error: ', error);
    }

}
export const deleteOneProduct = async (req, res) =>{
    try {
        const cid = req.params.cid;
        const pid = req.params.pid;
        const cart = await CartService.deleteOneProduct(cid, pid);
        if(!cart){
            req.logger.error(
                CustomError.createError({
                    name: "Get carts error",
                    cause: generateGetCartsErrorInfo(),
                    message: 'Error trying to get Cart',
                    code: EErrors.CART_NOT_FOUND_ERROR
                })
            );
        }
        res.json({status: 'successful', cart})
    } catch (error) {
        req.logger.error('Error: ', error);
    }
}

export const purchase = async (req, res) =>{
    try {
        const cid = req.params.cid;
        const user = req.user.user;
        console.log(user);
        const status = await CartService.purchase(cid);
        if(!status){
            req.logger.error(
                CustomError.createError({
                    name: "error ticket",
                    cause: generateGetCartsErrorInfo(),
                    message: 'Error trying to get Cart',
                    code: EErrors.CART_NOT_FOUND_ERROR
                })
            );
        }
        await CartService.update(cid, status.noStock);
        if(status.totalPrice>0){
            const resulttoken = await TicketService.create(user.email, status.totalPrice);
            status.token = resulttoken;
        }
        res.json({status: 'successful', status});
    } catch (error) {
        req.logger.error('Error: ', error);
    }
}