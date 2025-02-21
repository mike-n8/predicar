function volver(){
    window.location.href = "login.html";
}

let listaLugar = JSON.parse(localStorage.getItem("direccion")) || [];
let objetoLugar = {};

function guardarLugar(event) {
    event.preventDefault();
    // Obtener el valor del input
    const lugarDireccion = document.getElementById('lugar').value;

    objetoLugar= lugarDireccion;

        // Guardar el número en el arreglo
        listaLugar.push(objetoLugar);
        console.log(listaLugar);
        localStorage.setItem("direccion", JSON.stringify(listaLugar));
        window.location.href = "login.html";

}