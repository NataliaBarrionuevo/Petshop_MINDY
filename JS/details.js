var data = localStorage.getItem('data')
data = JSON.parse(data);


function mostrarProducto() {
    var id = location.search.split("?id=")
    var selecionid = id[1]
    var datos = articulo.find((e) => {return e._id == selecionid})
	cards.innerHTML +=
    ` 
	<div class="card mb-4" style="width: 30rem;">
	
	<img src="${datos.imagen}" class="card-img-top" alt="...">
	<div class="card-body text-black">
		<h5 class="card-title">${datos.nombre}</h5>
		<p class="card-text">Stock ${datos.stock}</p>
		<p class="card-text">$${datos.precio}</p>
        <div"><a href="detalles.html?id=${datos._id}" class="btn btn-primary">Ver mas!!</a></div>
		<div class="carrito">
			<button onclick="añadirProducto('${datos._id}')" class="see-more btn btn-primary">Añadir al carrito</button>
				<span>en el carrito: ${datos.carrito}</span>
				<button onclick="quitarProducto('${datos._id}')" class="see-more btn btn-dark">quitar del carrito</button>
				<div class="card-footer mt-2 bg-warning text-muted ${datos.stock > 5 ? 'oculto' : ''}">
				<p class="footer-card-text">Ultimas unidades!!!</p>

			</div>
	</div>
</div>
`
document.querySelector("#cardDetalles").innerHTML= cards.innerHTML
} 
mostrarProducto()

