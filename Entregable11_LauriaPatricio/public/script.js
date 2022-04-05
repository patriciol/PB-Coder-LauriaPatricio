const socket = io.connect()


socket.on('productos', data => {
    let html = `<tr class="text-warning">
<th class="font-wight-bold">Producto</th>
<th class="font-wight-bold">Precio</th>
<th class="font-wight-bold">Imagen</th>
</tr>`
    if (data.length > 0) {
        data.forEach(e => { 
            html += `<tr>
            <td>
                ${e.producto}
            </td>
            <td>
                ${e.precio}
            </td>
            <td>
                <img src="${e.url}" width="40" heith="40">
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
        author: {
            id: document.getElementById('id').value,
            nombre: document.getElementById('nombre').value,
            apellido: document.getElementById('apellido').value,
            edad: document.getElementById('edad').value,
            alias: document.getElementById('alias').value,
            avatar: document.getElementById('avatar').value
        },
        text: document.getElementById('text').value,
    };
    socket.emit('new-msg', mensajeNuevo);
    document.getElementById('texto').value = ""
    return false
}



socket.on('mensajes', data => {

    let html = `<tr class="text-warning">
    <th class="font-wight-bold">Alias</th>
    <th class="font-wight-bold">Hora</th>
    <th class="font-wight-bold">Mensaje</th>
    <th class="font-wight-bold">Avatar</th>
    </tr>`

    if (data.length > 0) {

        data.forEach(e => {

            html += `<tr">
        <td  style="color:blue;font-weight:bold">
            ${e.author.alias}
        </td>
        <td style="color:brown;">
            ${e.fecha}
        </td>
        <td style="color:green;font-style:italic">
        ${e.text}
        </td>
        <td style="color:green;font-style:italic">
        <img src="${e.author.avatar}" width="40" heith="40">
        </td>
    </tr>`
        });
    }
    else {
        html = `<div class=" contariner bg-light"><p style="font-size:150%;" class="font-weight-bold text-center text-info">No hay mensajes</p></div>`
    }
    document.getElementById('historialMensajes').innerHTML = html
})