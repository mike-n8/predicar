let datos = [];

function guardarDato(event) {
    event.preventDefault();
    // Obtener el valor del input
    const palabra = document.getElementById('name').value;
    const secondPala = document.getElementById('apellido').value;

        // Guardar el número en el arreglo
        datos.push(palabra);
        datos.push(secondPala);
        console.log(datos);

}

function datazo(datos) {
    let suma = 0;

  for (let i = 0; i < datos.length; i++) {
  suma += (datos[i]);
  }

  alert("La media del numero es: " + suma);

  return suma; // Devolvemos el resultado
  }