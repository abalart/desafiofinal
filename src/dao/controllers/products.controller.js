import { ProductService } from "../../repository/index.js";
import CustomError from "../../services/errors/custom_error.js";
import EErrors from "../../services/errors/enumErrors.js";
import { generateGetProductsErrorInfo, generateProductErrorInfo } from "../../services/errors/info.js";

export const getAll = async (req, res) => {
    try {
        let limit = req.query?.limit ?? 10;
        let page = req.query?.page ?? 1;
        let filter = req.query?.filter ?? '';
        let sortQuery = req.query?.sort ?? '';
        let sortQueryOrder = req.query?.sortOrder ?? 'desc';

        const products = await ProductService.getAll(limit, page, filter, sortQuery, sortQueryOrder);
        if (!products) {
            req.logger.error(
                CustomError.createError({
                    name: "Get Products error",
                    cause: generateGetProductsErrorInfo(),
                    message: 'Error trying to get all products',
                    code: EErrors.PRODUCT_NOT_FOUND_ERROR
                })
            );
        }

        const user = req.user.user || {};
        console.log(user);
        return res.render('home', {
            user,
            role: (user?.role == 'admin'),
            style: 'home.css',
            data: products.docs
        });
    } catch (error) {
        req.logger.error('Error: ', error);
    }
}

export const getOne = async(req, res)=>{
    try {
        const pid = req.params.pid;
        const prod = await ProductService.getOne(pid);
        if (!prod) {
            req.logger.error(
                CustomError.createError({
                    name: `Get product (id:${pid}) error`,
                    cause: generateGetProductsErrorInfo(),
                    message: 'Error trying to get product',
                    code: EErrors.PRODUCT_NOT_FOUND_ERROR
                })
            );
        }
        res.send({ status: 'successful', payload: prod })
    } catch (error) {
        req.logger.error('Error: ', error);
    }
}

export const create = async(req, res)=>{
    try {
        const product = req.body;
        const user = req.user.user;
        product.owner = {
            role: user.role,
            id: user._id
        }
        const productAdded = await ProductService.create(product);

        if (!productAdded) {
            req.logger.error(
                CustomError.createError({
                    name: `create product error`,
                    cause: generateProductErrorInfo(product),
                    message: 'Error trying to create product',
                    code: EErrors.CREATE_PRODUCT_ERROR
                })
            )
        }
        res.json({
            status: "Success",
            productAdded
        })
    } catch (error) {
        req.logger.error('Error: ', error);
        res.json({
            error
        })
    }
}

export const update = async(req, res)=>{
    try {
        const pid = req.params.pid;
        const update = req.body;
        const result = await ProductService.update(pid, update);
        if (!result) {
            req.logger.error(
                CustomError.createError({
                    name: `Update product (id:${pid}) error`,
                    cause: generateGetProductsErrorInfo(),
                    message: 'Error trying to update product',
                    code: EErrors.PRODUCT_NOT_FOUND_ERROR
                })
            );
        }
        res.send({ status: 'successful', payload: result });
    } catch (error) {
        req.logger.error('Error: ', error);
    }
}

export const deleteProd = async(req, res)=>{
    try {
        const pid = req.params.pid;
        const user = req.user.user;

        const result = await ProductService.deleteByOwner(pid, user);
        if (!result) {
            req.logger.error(
                CustomError.createError({
                    name: `Delete product (id:${pid}) error`,
                    cause: generateGetProductsErrorInfo(),
                    message: 'Error trying to delete product',
                    code: EErrors.PRODUCT_NOT_FOUND_ERROR
                })
            );
        }
        res.send({ status: 'successful', payload: result });
    } catch (error) {
        req.logger.error('Error: ', error);
    }
}