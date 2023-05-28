const socket = io()
let title
let description
let price
let thumbnails
let stock
let category
const addform = document.getElementById('addFormRealTime');
const delForm = document.getElementById('delFormRealTime');

addform.addEventListener('submit', (e) => {
    e.preventDefault();
    title = document.getElementById('title').value;
    description = document.getElementById('description').value
    price = document.getElementById('price').value
    thumbnails = document.getElementById('thumbnail').value
    stock = document.getElementById('stock').value
    category = document.getElementById('category').value

    socket.emit('updateProducts', {
        title,
        description,
        price,
        thumbnails,
        stock,
        category
    })
});

delForm.addEventListener('submit', (e) => {
    e.preventDefault();
});

socket.on('realtimeProducts', data => {
    const productsTable = document.getElementById('productsTable');
    let products = `<tr>
                    <td><strong>Producto</strong></td>
                    <td><strong>Descripción</strong></td>
                    <td><strong>Precio</strong></td>
                    <td><strong>Stock</strong></td>
                    <td><strong>Categoría</strong></td>
                    </tr>`


    data.forEach(prod => {
        let images = ``
        prod.thumbnails.forEach(i => {
            if (i !== '') images += `<img src='${i}' alt=''>`
        })
        products += `
                    <tr>
                        <td>${prod.title}</td>
                        <td>${images}</td>
                        <td>${prod.description}</td>
                        <td>${prod.price}</td>
                        <td>${prod.stock}</td>
                        <td>${prod.category}</td>
                    </tr>
    `
    });

    productsTable.innerHTML = products
})
