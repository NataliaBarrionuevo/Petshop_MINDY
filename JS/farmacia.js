let cards = document.querySelector(".cards");
let productos = []
let ProductosAlmacenados = [];
let filtroPrecio = document.getElementById("precios");
var inputSearch = document.getElementById("search");
let valorfiltroPrecio = "precios";
let textSearch = "";
async function getData(){
	await fetch(`https://apipetshop.herokuapp.com/api/articulos`)
		.then(response => response.json())
		.then(json =>{
			productos = json.response;
			productos = productos.filter(producto => producto.tipo == "Medicamento")
			ProductosAlmacenados = JSON.parse(localStorage.getItem("Productos"))
			cargarProductos(productos);
			getPrecios();
		});
}
getData();

function mostrarProducto(articulo) {
	cards.innerHTML += `<div class="card" style="width: 35rem;">
	<img src="${articulo.imagen}" class="card-img-top card-img mt-2" alt="image">
	<div class="card-body d-flex justify-content-center  flex-column text-center">
		<h5 class="card-title">${articulo.nombre}</h5>
		
		<p class="card-text">Unidades disponibles ${articulo.stock}</p>
		<p class="card-text">$ ${articulo.precio}</p>
		<button onclick="añadirProducto('${articulo._id}')" class="see-more btn btn-dark">Agregar <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-cart-plus-fill" viewBox="0 0 16 16">
						<path d="M.5 1a.5.5 0 0 0 0 1h1.11l.401 1.607 1.498 7.985A.5.5 0 0 0 4 12h1a2 2 0 1 0 0 4 2 2 0 0 0 0-4h7a2 2 0 1 0 0 4 2 2 0 0 0 0-4h1a.5.5 0 0 0 .491-.408l1.5-8A.5.5 0 0 0 14.5 3H2.89l-.405-1.621A.5.5 0 0 0 2 1H.5zM6 14a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm7 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0zM9 5.5V7h1.5a.5.5 0 0 1 0 1H9v1.5a.5.5 0 0 1-1 0V8H6.5a.5.5 0 0 1 0-1H8V5.5a.5.5 0 0 1 1 0z"/>
						</svg></button>
							<span class="${articulo.carrito==0 ? "oculto": ""}">en el carrito: ${articulo.carrito}</span>
							<button onclick="quitarProducto('${articulo._id}')" class="see-more btn btn-dark ${articulo.carrito==0 ? "oculto": ""}">Quitar <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-cart-x" viewBox="0 0 16 16">
							<path d="M7.354 5.646a.5.5 0 1 0-.708.708L7.793 7.5 6.646 8.646a.5.5 0 1 0 .708.708L8.5 8.207l1.146 1.147a.5.5 0 0 0 .708-.708L9.207 7.5l1.147-1.146a.5.5 0 0 0-.708-.708L8.5 6.793 7.354 5.646z"/>
							<path d="M.5 1a.5.5 0 0 0 0 1h1.11l.401 1.607 1.498 7.985A.5.5 0 0 0 4 12h1a2 2 0 1 0 0 4 2 2 0 0 0 0-4h7a2 2 0 1 0 0 4 2 2 0 0 0 0-4h1a.5.5 0 0 0 .491-.408l1.5-8A.5.5 0 0 0 14.5 3H2.89l-.405-1.621A.5.5 0 0 0 2 1H.5zm3.915 10L3.102 4h10.796l-1.313 7h-8.17zM6 14a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm7 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0z"/>
						</svg></button>
						
						<div class="card-footer Stock  text-white text-muted">${articulo.stock < 5 ? `<p class="ultimas-unidades text-danger"><small><b>ULTIMAS UNIDADES</b><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-exclamation-lg" viewBox="0 0 16 16">
		<path d="M7.005 3.1a1 1 0 1 1 1.99 0l-.388 6.35a.61.61 0 0 1-1.214 0L7.005 3.1ZM7 12a1 1 0 1 1 2 0 1 1 0 0 1-2 0Z"/>
		</svg></small></p>` : `<p class="text-success"><b>En stock</b></p>`}
		
		</div>
		<p class="card-text mt-4">${articulo.descripcion}</p>
	</div>
	</div>`
}

function añadirProducto(idProducto){
	let producto = productos.find(elemento => elemento._id === idProducto);
	ProductosAlmacenados = JSON.parse(localStorage.getItem("Productos"))
	if(ProductosAlmacenados)
	{
		productoPresente = ProductosAlmacenados.find(elemento => elemento._id === idProducto);
		ProductosAlmacenados = ProductosAlmacenados.filter(elemento => elemento._id != producto._id);
		if(productoPresente){
			if(productoPresente.stock!=0){
				productoPresente.carrito++;
				productoPresente.stock--;
				ProductosAlmacenados.push(productoPresente)
			}else{
				ProductosAlmacenados.push(productoPresente)
				swal("Espera un momento", "No hay mas articulos en stock", "warning");
			}
			
		}else{
			producto.carrito++;
			ProductosAlmacenados.push(producto)
		}
	}else{	
		producto.carrito++;
		ProductosAlmacenados = [producto]
	}
    
    localStorage.setItem("Productos", JSON.stringify(ProductosAlmacenados))
	cargarProductos(productos);
	mostrarCantidadProductos();
}

function quitarProducto(idProducto){
	let producto = productos.find(elemento => elemento._id === idProducto);
	ProductosAlmacenados = JSON.parse(localStorage.getItem("Productos"))
	if(ProductosAlmacenados)
	{
		productoPresente = ProductosAlmacenados.find(elemento => elemento._id === idProducto);
		ProductosAlmacenados = ProductosAlmacenados.filter(elemento => elemento._id != producto._id);
		if(productoPresente){
			if(productoPresente.carrito==0){
				swal("ya quitaste todos los productos")
			}
			else{
				productoPresente.carrito--;
				productoPresente.stock++;
				if(productoPresente.carrito!=0){
					ProductosAlmacenados.push(productoPresente)
				}
				
			}
		}
	}else{	
		ProductosAlmacenados = [producto]
	}
    
    localStorage.setItem("Productos", JSON.stringify(ProductosAlmacenados))
	cargarProductos(productos);
	mostrarCantidadProductos();
}

function cargarProductos(productos){
	productos.map(producto =>{
		if(ProductosAlmacenados){
			productoPresente = ProductosAlmacenados.find(elemento => elemento._id == producto._id);
			if(productoPresente){
				producto.carrito = productoPresente.carrito;
				producto.stock = productoPresente.stock;
			}
			else{
				producto.carrito = 0 
			}
		}else{
			producto.carrito = 0
		}
	})
	cards.innerHTML = "";
	productos.forEach(articulo =>{
			mostrarProducto(articulo)
	})
}
//Juguete

function getPrecios(){
	precios = productos.map(producto =>producto.precio);
	precios = precios.filter((precio,index) => precios.indexOf(precio) === index);
	filtroPrecio.innerHTML= `<option selected value="precios">Precios</option>`
	precios.forEach(precio => filtroPrecio.innerHTML += `<option value="${precio}"> Precio: $ ${precio} </option>`)
}
filtroPrecio.addEventListener("change", event => {
	valorfiltroPrecio = event.target.value;
	filtrarCards();
})


inputSearch.addEventListener("keyup", (event) => {
	textSearch = event.target.value;
	filtrarCards();
});

function filtrarCards() {
	if (valorfiltroPrecio == "precios" && textSearch==""){
		cargarProductos(productos);
	}else if(valorfiltroPrecio != "precios" && textSearch==""){
		cargarProductos(productos.filter(producto => producto.precio <= valorfiltroPrecio))
	}else if(valorfiltroPrecio == "precios" && textSearch!=""){
		cargarProductos(productos.filter(producto => producto.nombre.toLowerCase().includes(textSearch.trim().toLowerCase())))
	}else{
		cargarProductos(productos.filter(producto => producto.nombre.toLowerCase().includes(textSearch.trim().toLowerCase()) && producto.precio <= valorfiltroPrecio))
	}
}