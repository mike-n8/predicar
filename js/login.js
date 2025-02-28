let listaPrograma = JSON.parse(localStorage.getItem("programa")) || [];
if(listaPrograma.length === 0){
  for (let i = 0; i < 18; i++) {
    let objetoPrograma = {
      id: i,
      dia:"",
      fecha:"",
      hora:"",
      lugar:"",
      conductor:"",
      territorio:"",
      grupo:""
    };
    listaPrograma.push(objetoPrograma);
  }
  localStorage.setItem("programa", JSON.stringify(listaPrograma));
} else {
  for (let i = 0; i < 18; i++) {
    let tr = document.getElementById(i);
    let tdHora = tr.querySelector('.hora');
    let inputHora = tdHora.querySelector('input');
    inputHora.value = listaPrograma[i].hora;    
  }
}

function guardarHora(td) {  
  window.tdSeleccionadoHora = td; // Guardar referencia del TD
}

function guardarLugar(td) {
  window.tdSeleccionadoLugar = td; // Guardar referencia del TD
}

function guardarTerritorio(td) {
  window.tdSeleccionadoTerritorio = td;
}

// Seleccionamos todos los inputs de tipo time y number
const inputsHora = document.querySelectorAll(".hora");
const inputTerri = document.querySelectorAll(".territorio");

// Agregamos un evento 'change' a cada input de hora
inputsHora.forEach(input => {
  input.addEventListener("change", (event) => {
    let horaSeleccionada = event.target.value;
    let idTrSeleccionado = tdSeleccionadoHora.closest('tr').id;

    const programa = JSON.parse(localStorage.getItem("programa"));
    let index = programa.findIndex(prog => prog.id === Number(idTrSeleccionado));
    programa[index].hora = horaSeleccionada;
    localStorage.setItem("programa", JSON.stringify(programa));
  });
});

// Agregamos un evento 'change' a cada input de territorio
inputTerri.forEach(input => {
  input.addEventListener("change", (event) => {
    let territorioSeleccionado = event.target.value;
    let idTrSeleccionado = tdSeleccionadoTerritorio.closest('tr').id;

    const programa = JSON.parse(localStorage.getItem("programa"));
    let index = programa.findIndex(prog => prog.id === Number(idTrSeleccionado));
    if (index !== -1) {
      programa[index].territorio = territorioSeleccionado;
      localStorage.setItem("programa", JSON.stringify(programa));
    }
  });
});

// Evento para los inputs dentro de los <td class="lugares">
//document.addEventListener("input", (event) => {
//  if (event.target.classList.contains("input-lugar")) { // Detectar cambios en inputs dentro de .lugares
//    let lugarSeleccionado = event.target.value;
//    let idTrSeleccionado = tdSeleccionadoLugar.closest('tr').id; // Obtener ID del <tr>
//
//    const programa = JSON.parse(localStorage.getItem("programa"));
//    if (programa && Array.isArray(programa)) {
//      let index = programa.findIndex(prog => prog.id === Number(idTrSeleccionado));
//      if (index !== -1) {
//        programa[index].lugar = lugarSeleccionado; // Solo lo actualizas si el índice es válido
//        localStorage.setItem("programa", JSON.stringify(programa));
//      }
//    }
//  }
//});


//Fecha de la columna "Fecha"
function agregarFechas() {
    const tbody = document.querySelector("#dataTable tbody");
    const rows = tbody.querySelectorAll("tr");
    let fecha = new Date(); // Fecha actual

    rows.forEach(row => {
        const cell = row.insertCell(1);
        cell.textContent = fecha.toISOString().split('T')[0].split('-').reverse().join('-'); // Formato DD-MM-YYYY
        fecha.setDate(fecha.getDate() + 1); // Incrementa la fecha en un día
    });
}
// ¿Que hace esto?
function sortTable() {
    const table = document.querySelector("#dataTable tbody");
    const rows = Array.from(table.rows);
    
    rows.sort((a, b) => {
        const dateA = new Date(a.cells[3].textContent);
        const dateB = new Date(b.cells[3].textContent);
        return dateA - dateB;
    });

    table.innerHTML = "";
    rows.forEach(row => table.appendChild(row));
}

agregarFechas();


// Función para manejar la edición de celdas
document.querySelectorAll(`td:not(.conductores, .hora, .dia, .territorio)`).forEach(cell => {
  cell.addEventListener('click', function () {
    let currentText = this.innerText;
    let input = document.createElement('input');
    input.value = currentText;

    // Si la celda es de tipo "lugares", agregamos la clase
    if (this.classList.contains("lugares")) {
      input.classList.add("input-lugar");
    }

    // Reemplazar la celda por el input
    this.innerHTML = '';
    this.appendChild(input);
    input.focus();

    let suggestionsContainer = null;
    let selectingSuggestion = false;

    // Mostrar sugerencias si la celda es de tipo "lugares"
    if (this.classList.contains("lugares")) {
      suggestionsContainer = document.getElementById("suggestions");
      suggestionsContainer.innerHTML = "";
      suggestionsContainer.style.display = "none";

      const lugaresGuardados = JSON.parse(localStorage.getItem("direccion")) || [];

      input.addEventListener("input", () => {
        const query = input.value.toLowerCase();
        console.log('Consultando sugerencias para: ', query);
        suggestionsContainer.innerHTML = "";

        if (query) {
          const filteredCalles = lugaresGuardados.filter(calle => calle.toLowerCase().includes(query));

          filteredCalles.forEach(calle => {
            const div = document.createElement("div");
            div.textContent = calle;
            div.classList.add("suggestion");

            div.addEventListener("mousedown", () => {
              selectingSuggestion = true; // Evita que el blur cierre el input
            });

            div.addEventListener("click", () => {
              input.value = calle;
              guardarEnLocalStorage(calle);
              this.innerHTML = calle;
              suggestionsContainer.style.display = "none";
              selectingSuggestion = false;
            });

            suggestionsContainer.appendChild(div);
          });

          // Posicionar las sugerencias
          const rect = input.getBoundingClientRect();
          suggestionsContainer.style.top = `${rect.bottom + window.scrollY}px`;
          suggestionsContainer.style.left = `${rect.left + window.scrollX}px`;
          suggestionsContainer.style.width = `${rect.width}px`;
          suggestionsContainer.style.display = "block";
        }
      });
    }

   
  function guardarEnLocalStorage(valor) {
    let idTrSeleccionado = tdSeleccionadoLugar.closest('tr').id;
    const programa = JSON.parse(localStorage.getItem("programa"));

    if (programa && Array.isArray(programa)) {
      let index = programa.findIndex(prog => prog.id === Number(idTrSeleccionado));
      if (index !== -1) {
        programa[index].lugar = valor; // Guarda la opción seleccionada
        localStorage.setItem("programa", JSON.stringify(programa));
      }
    }
  }


  });
});

//INPUT modificar el territorio!
document.querySelectorAll(".territorio").forEach(cell => {
  let input = document.createElement('input');
  input.type = 'number';
 
  // Reemplazar la celda por el input
  cell.innerHTML = '';
  cell.appendChild(input);

  // Añadir un evento para detectar cuando se presiona Enter
  input.addEventListener('keypress', (event) => {
    if (event.key === 'Enter') {
      input.blur(); // Eliminar el foco del input
    }
  });
});


   function abrirPopup(td) {
    window.tdSeleccionado = td; // Guardar referencia del TD
    window.open('archive.html', '_blank', 'width=900,height=800');
}

function volverAlTd(info) {
  if (window.tdSeleccionado) {
      window.tdSeleccionado.textContent = info; // Insertar el dato en el TD
      let idTrSeleccionado = window.tdSeleccionado.closest('tr').id; // Asignar el id de la fila más cercana a una variable
      const programa = JSON.parse(localStorage.getItem("programa")) || [];

      // Encuentra el índice del programa correspondiente al idTrSeleccionado
      let index = programa.findIndex(prog => prog.id === Number(idTrSeleccionado));

      if (index !== -1) {
          let conductorSeleccionado = info; // Asumimos que `info` es el conductor seleccionado
          programa[index].conductor = conductorSeleccionado; // Actualiza el conductor en el programa
          localStorage.setItem("programa", JSON.stringify(programa)); // Guarda los cambios en localStorage
      }
  }
}

