
/* const addcart = async (cart, id) => {
    console.log(id);
    const response = await fetch(`http://127.0.0.1:8080/api/carts/${cart}/products/${id}`, {
        method: "POST",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({})
    })
    const data = await response.json()
    if (data.status == 200) {
        alert("se agrego correctamente el producto")
    } else {
        alert("Error no se pudo agregar el producto")
    }
} */