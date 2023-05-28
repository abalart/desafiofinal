// USER ERRORS
export const generateUserErrorInfo = user => {
    return `
    Uno o mas properties estan incompletos o son invalidos.
    Lista de properties obligatgories:
        - first_name: Must be a string. (${user.first_name})
        - last_name: Must be a string. (${user.last_name})
        - email: Must be a string. (${user.email})
    
    `
}

export const generateGetUsersErrorInfo = () => {
    return `
    Problems to get users of data base
    
    `
}

// PRODUCTS ERRORS
export const generateProductErrorInfo = product =>{
    return `
    Uno o mas properties estan incompletos o son invalidos.
    Lista de properties obligatorias:
        - title: Must be a string. (${product.title})
        - price: Must be a number. (${product.price})
        - description: Must be a string. (${product.description})
        - category: Must be a string. (${product.category})
        - stock: Must be a number. (${product.stock})
        - thumbnails: Must be a array. (${product.thumbnails})
    `
}

export const generateGetProductsErrorInfo = () =>{
    return `
    Problem at get products of data base
    `
}

export const generateGetCartsErrorInfo = () =>{
    return `
    Problem at get carts of data base
    `
}

export const generateAddProductInCartErrorInfo = req => {
    return `
    Uno o mas properties estan incompletos o son invalidos.
    Lista de properties obligatgories:
        - CART ID: Must be a string. (${req.cid})
        - PRODUCT ID: Must be a string. (${req.pid})
        - QUANTITY : Must be a string. (${req.quantity})
    `
}
export const generateDeleteCartErrorInfo = req => {
    return `
    Uno o mas properties estan incompletos o son invalidos.
    Lista de properties obligatgories:
        - CART ID: Must be a string. (${req.cid})
    `
}

//TICKET ERRORS
export const generateTicketErrorInfo = ticket =>{
    return `
    Uno o mas properties estan incompletos o son invalidos.
    Lista de properties obligatorias:
        - code: Must be a string. (${ticket.code})
        - purchase_datetime: Must be a Date. (${ticket.purchase_datetime})
        - amount: Must be a Number. (${ticket.amount})
        - purchaser: Must be a String (${ticket.purchaser})
    `
}

//CART ERRORS

//MESAGE ERRORS