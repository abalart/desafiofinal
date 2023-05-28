import { MockService } from "../../repository/index.js";
import EErrors from "../../services/errors/enumErrors.js";
import { generateGetProductsErrorInfo } from "../../services/errors/info.js";

export const getAll = async (req, res) => {
    try {
        const products = MockService.getAll();
        if (!products) {
            req.logger.error(
                CustomError.createError({
                    name: "User creation error",
                    cause: generateGetProductsErrorInfo(),
                    message: 'Error trying to create user',
                    code: EErrors.PRODUCT_NOT_FOUND_ERROR
                })
            );
        }
        const user = req.user?.user || {};

        return res.render('home', {
            user,
            role: (user?.role == 'admin'),
            style: 'home.css',
            data: products
        });
    } catch (error) {
        req.logger.error('Error: ', error);
    }
}

