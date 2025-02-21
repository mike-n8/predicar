let listaPersonas = JSON.parse(localStorage.getItem("personas")) || [];
let objetoPersona = {};

function guardarDato(event) {
    event.preventDefault();
    // Obtener el valor del input
    const palabraNombre = document.getElementById('name').value;
    const secondPalaApellido = document.getElementById('apellido').value;
    //const imagen = document.getElementById('imagen').value;
    const codigophoto = document.getElementById("preview").src;

    objetoPersona.nombre= palabraNombre;
    objetoPersona.apellido= secondPalaApellido;
    objetoPersona.codigophoto= codigophoto;

        // Guardar el número en el arreglo
        listaPersonas.push(objetoPersona);
        console.log(listaPersonas);
        localStorage.setItem("personas", JSON.stringify(listaPersonas));
        window.location.href = "login.html";

}

  document.getElementById("photoInput").addEventListener("change", function(event) {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onload = function(e) {
        document.getElementById("preview").src = e.target.result;
    };
    reader.readAsDataURL(file);
});

function volver(){
    window.location.href = "login.html";
}