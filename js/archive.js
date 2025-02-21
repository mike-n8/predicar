const usuariosGuardados = JSON.parse(localStorage.getItem("personas"));
// Obtener el contenedor donde agregar las imágenes
const gallery = document.getElementById('gallery');

// Recorrer el array de fotos y crear una etiqueta <img> por cada foto
//let index = 0; // Definir un índice para llevar la cuenta de las imágenes

/*usuariosGuardados.forEach(function(usuario) {
    // Crear un elemento <img>
    const img = document.createElement('img');
    //img.id = `preview-${index}`;  // Asignar un id único
    img.classList.add('preview'); // Asignar una clase
    img.src = usuario.codigophoto;  // Asignar la URL de la imagen
    img.width = 300;  // Establecer el tamaño (100px de ancho)

    // Añadir la imagen al contenedor de la galería
    gallery.appendChild(img);

    // Incrementar el índice para la próxima imagen
    index++;
});*/

for (let i = 0; i < usuariosGuardados.length; i++) {
    // Crear un elemento <img>
    const img = document.createElement('img');
    //img.id = `preview-${i}`; // Asignar un id único
    img.classList.add('preview'); // Asignar una clase
    img.src = usuariosGuardados[i].codigophoto;  // Asignar la URL de la imagen
    img.setAttribute("info", usuariosGuardados[i].nombre + " " +usuariosGuardados[i].apellido);  // Asignar la URL de la imagen
    img.width = 300;  // Establecer el tamaño (100px de ancho)

    // Añadir la imagen al contenedor de la galería
    gallery.appendChild(img); // otra opción document.getElementById('gallery').appendChild(img);
}

    document.querySelectorAll('.preview').forEach(function(element) {
        element.addEventListener('click', function(event) {
            console.log("El elemento que disparó el evento es: ", event.target);
            console.log("usuario: ", event.target.getAttribute('info'));
            const info = event.target.getAttribute('info');
                window.opener.volverAlTd(info);// Asegurar que `window.opener` existe y está abierto
                window.close(); // Cerrar el popup
                // Notificar a la otra página
                //localStorage.setItem("actualizacionConductores", Date.now());
            
        });
    });

    

