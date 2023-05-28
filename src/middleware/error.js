import EErros from "../services/errors/enumErrors.js";

export default (error, req, res, next) => {
    console.log(error.cause);

    switch (error.code) {
        case EErros.INVALID_TYPES_ERROR:
            res.status(400).send({ status: 'error', error: error.name, cause: error.cause })
            break;
        case EErros.ADD_PRODUCT_IN_CART_ERROR:
            res.status(400).send({ status: 'error', error: error.name, cause: error.cause })
            break;
        case EErros.CART_NOT_FOUND_ERROR:
            res.status(404).send({ status: 'error', error: error.name, cause: error.cause })
            break;
        case EErros.CREATE_PRODUCT_ERROR:
            res.status(400).send({ status: 'error', error: error.name, cause: error.cause })
            break;
        case EErros.CREATE_USER_ERROR:
            res.status(400).send({ status: 'error', error: error.name, cause: error.cause })
            break;
        case EErros.DATABASES_ERROR:
            res.status(500).send({ status: 'error', error: error.name, cause: error.cause })
            break;
        case EErros.PRODUCT_NOT_FOUND_ERROR:
            res.status(404).send({ status: 'error', error: error.name, cause: error.cause })
            break;
        case EErros.ROUTING_ERROR:
            res.status(400).send({ status: 'error', error: error.name, cause: error.cause })
            break;
        case EErros.USER_NOT_FOUND_ERROR:
            res.status(404).send({ status: 'error', error: error.name, cause: error.cause })
            break;
            case EErros.CREATE_CART_ERROR:
                res.status(404).send({ status: 'error', error: error.name, cause: error.cause })
                break;
        default:
            res.send({ status: 'error', error: 'Unhandled error' }) // salta error si tengo carpeta utils
            break;
    }
}
