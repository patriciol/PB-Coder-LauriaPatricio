const socket = io.connect()


function addProduct(e) {

    const productoNuevo = {
        title: document.getElementById('title').value,
        price: document.getElementById('price').value,
        thumbnail: document.getElementById('thumbnail').value,
    };
    socket.emit('new-product', productoNuevo);
    document.getElementById('title').value = ""
    document.getElementById('price').value = ""
    document.getElementById('thumbnail').value = ""
    return false
}



socket.on('productos', data => {
    let html = `<tr class="text-warning">
    <th class="font-wight-bold">ID</th>
<th class="font-wight-bold">Producto</th>
<th class="font-wight-bold">Precio</th>
<th class="font-wight-bold">Imagen</th>
</tr>`
    if (data.length > 0) {

        data.forEach(e => {

            html += `<tr>
            <td>
                ${e.id}
            </td>
            <td>
                ${e.title}
            </td>
            <td>
                ${e.price}
            </td>
            <td>
                <img src="${e.thumbnail}" width="40" heith="40">
            </td>
        </tr>`
        });
    }
    else {
        html += `<p class="container">No hay productos</p>`
    }

    document.getElementById('tabla').innerHTML = html

})



function addMessage(e) {

    const mensajeNuevo = {
        fecha: "hola",
        usuario: document.getElementById('username').value,
        texto: document.getElementById('texto').value,

    };
    socket.emit('new-msg', mensajeNuevo);
    document.getElementById('texto').value = ""
    return false
}



socket.on('mensajes', data => {

    let html = `<tr class="text-warning">
    <th class="font-wight-bold">Mail</th>
<th class="font-wight-bold">Hora</th>
<th class="font-wight-bold">Mensaje</th>
</tr>`

    if (data.length > 0) {

        data.forEach(e => {

            html += `<tr">
        <td  style="color:blue;font-weight:bold">
            ${e.usuario}
        </td>
        <td style="color:brown;">
            ${e.fecha}
        </td>
        <td style="color:green;font-style:italic">
        ${e.texto}
        </td>
    </tr>`
        });
    }
    else {
        html = `<div class=" contariner bg-light"><p style="font-size:150%;" class="font-weight-bold text-center text-info">No hay mensajes</p></div>`
    }
    document.getElementById('historialMensajes').innerHTML = html
})