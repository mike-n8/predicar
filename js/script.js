let numeros = []; // Arreglo donde se guardarán los números ingresados

        function guardarNumero() {
            // Obtener el valor del input
            const numero = document.getElementById('numero').value;

                // Guardar el número en el arreglo
                numeros.push(numero);


                // Mostrar los números en la página
                document.getElementById('numerosGuardados').textContent = "Números guardados: " + numeros.join(', ');

                // Limpiar el input para el siguiente número
                document.getElementById('numero').value = '';
            
        }


        function mediaNumero(numeros) {
          let suma = 0;
    
        for (let i = 0; i < numeros.length; i++) {
        suma = suma + Number(numeros[i]);
        }

        suma = suma / numeros.length;

        alert("La media del numero es: " + suma);

        return suma; // Devolvemos el resultado
        }

        function enviarForm(event) {

          event.preventDefault();

          const usuario= "Miqueas"; 
          const contraseña= "elbicho";
          const idUsuario = document.getElementById("user").value;
          const idContra = document.getElementById("contra").value;

          console.log("idUsuario:", idUsuario);
          console.log("idContra:", idContra);

          if (idUsuario === usuario  && idContra === contraseña) {
            console.log("GOKUUU");
              window.location.href = "login.html";
          } else {
            alert("Noooo");
            //console.log("abrazo de gol");
            }
      }
