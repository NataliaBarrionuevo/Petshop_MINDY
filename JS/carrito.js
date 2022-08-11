let tablaProductos = document.getElementById("tabla-productos");
let tablaFooter = document.getElementById("tabla-footer");
let precioTotal = 0

const f = new Intl.NumberFormat("en-US", {
	style: "currency",
	currency: "USD",
	minimumFractionDigits:2
});

const alertPlaceholder = document.getElementById('liveAlertPlaceholder')

const alert = (message, type) => {
	const wrapper = document.createElement('div')
	wrapper.innerHTML = [
    `<div class="alert alert-${type} alert-dismissible" role="alert">`,
    `   <div>${message}</div>`,
    '   <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>',
    '</div>'
	].join('')

alertPlaceholder.append(wrapper)
}
function MostrarTablaProductos(){
	let ProductosAlmacenados = JSON.parse(localStorage.getItem("Productos"))
	if(ProductosAlmacenados && ProductosAlmacenados.length > 0){
		ProductosAlmacenados.forEach(producto => {
			precioTotal += producto.precio * producto.carrito;
			tablaProductos.innerHTML += `<tr>
											<th scope="row">${producto.nombre}</th>
											<td>${producto.tipo}</td>
											<td>${f.format(producto.precio)}</td>
											<td>${producto.carrito}</td>
										</tr>`
		})
		tablaFooter.innerHTML = `<tr class="table-light">
					<th scope="row" colspan="2">El precio total es </th>
					<td>${f.format(precioTotal)}</td>
					<td><button onclick="realizarCompra()" type="button" class="btn btn-success boton-comprar">Comprar</button></td>
		</tr>`
	}else{
		alert('actualmente no tienes ningun producto en el carrito', 'info')
	}
}
MostrarTablaProductos();
function realizarCompra(){
	localStorage.clear();
	swal("Compra realizada con exito", "Muchas gracias por confiar en nuestros productos", "success")
	.then(function () {
        location.reload()
    })
}