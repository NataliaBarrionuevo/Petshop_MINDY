let cantidadProductos = document.getElementById("cantidad-productos");
function mostrarCantidadProductos() {
	let contador=0;
	ProductosAlmacenados = JSON.parse(localStorage.getItem("Productos"))
	if(ProductosAlmacenados && ProductosAlmacenados.length > 0){
		ProductosAlmacenados.forEach(elemento => {
			contador += elemento.carrito;
		})
		cantidadProductos.innerHTML = contador;
	}else{
		cantidadProductos.innerHTML = 0;
	}	
}
mostrarCantidadProductos();