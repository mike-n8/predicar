function agregarFechas() {
    const tbody = document.querySelector("#dataTable tbody");
    const rows = tbody.querySelectorAll("tr");
    let fecha = new Date(); // Fecha actual

    rows.forEach(row => {
        const cell = row.insertCell(1);
        cell.textContent = fecha.toISOString().split('T')[0]; // Formato YYYY-MM-DD
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


// Función que permite editar una celda al hacer clic
document.querySelectorAll('td').forEach(cell => {
    cell.addEventListener('click', function() {
      let currentText = this.innerText;
      let input = document.createElement('input');
      input.value = currentText;
      
      // Reemplazar el contenido de la celda con un input
      this.innerHTML = '';
      this.appendChild(input);
      
      // Colocar el foco automáticamente en el campo de entrada
      input.focus();

      // Cuando el input pierde el foco, se guarda el valor y se reemplaza por texto
      input.addEventListener('blur', () => {
        this.innerHTML = input.value;
      });

      // Permitir presionar 'Enter' para confirmar el cambio
      input.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
          this.innerHTML = input.value;
        }
      });
    });
  });

   // Obtener todas las celdas de la tabla
   const celdas = document.querySelectorAll('.conductores');

   // Añadir un evento de click a cada celda
   celdas.forEach(celda => {
       celda.addEventListener('click', function() {
           // Abrir una ventana al hacer click en una celda
           window.open('archive.html', '_blank', 'width=900,height=800');
       });
   });

   