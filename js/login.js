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
document.querySelectorAll(`td:not(.conductores, .hora, .dia)`).forEach(cell => {
  cell.addEventListener('click', function () {
    let currentText = this.innerText;
    let input = document.createElement('input');
    input.value = currentText;

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

      // Lista de calles
      //const calles = ["Avenida Siempre Viva", "Calle Falsa 123", "Gran Vía", "Paseo de la Reforma", "Avenida Corrientes", "Calle Mayor", "Las Ramblas"];
      const lugaresGuardados = JSON.parse(localStorage.getItem("direccion"));

      input.addEventListener("input", () => {
        const query = input.value.toLowerCase();
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

    // Cuando el input pierde el foco
    input.addEventListener('blur', () => {
      if (!selectingSuggestion) {
        this.innerHTML = input.value;
        if (suggestionsContainer) suggestionsContainer.style.display = "none";
      }
    });

    // Permitir presionar 'Enter' para confirmar el cambio
    input.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') {
        this.innerHTML = input.value;
        if (suggestionsContainer) suggestionsContainer.style.display = "none";
      }
    });

    // Cerrar sugerencias si se hace clic fuera
    document.addEventListener("click", (event) => {
      if (!input.contains(event.target) && !suggestionsContainer.contains(event.target)) {
        if (suggestionsContainer) suggestionsContainer.style.display = "none";
      }
    }, { once: true });
  });
});

//INPUT modificar la hora!
document.querySelectorAll(".hora").forEach(cell => {
  let input = document.createElement('input');
  input.type = 'time';

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


   // Obtener todas las celdas de la tabla
   //const tablaCompleta = document.querySelectorAll('.conductores');
//
   //// Añadir un evento de click a cada celda
   //tablaCompleta.forEach(td => {
   //    td.addEventListener('click', function() {
   //     window.guardarTd = td;
   //        // Abrir una ventana al hacer click en una celda
   //        window.open('archive.html', '_blank', 'width=900,height=800');
   //    });
   //});

   function abrirPopup(td) {
    window.tdSeleccionado = td; // Guardar referencia del TD
    window.open('archive.html', '_blank', 'width=900,height=800');
}

function volverAlTd(info) {
    if (window.tdSeleccionado) {
        window.tdSeleccionado.textContent = info; // Insertar el dato en el TD
    }
}
