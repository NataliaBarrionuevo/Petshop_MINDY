const botonSubir=document.querySelector("form");
botonSubir.addEventListener("submit",e=>alerta(e));

function alerta(e){
    e.preventDefault();

    swal("Su mensaje fue enviado correctamente, ¡Gracias por escribirnos!");
    contactForm.reset();
}