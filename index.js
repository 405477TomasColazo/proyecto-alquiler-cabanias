document.getElementById('reservaForm').addEventListener('submit', function(event) {
    let isValid = true;
    let fecha = document.getElementById('fecha').value;
    let personas = document.getElementById('personas').value;
    let fechaError = document.getElementById('fechaError');
    let personasError = document.getElementById('personasError');
    
    fechaError.textContent = "";
    personasError.textContent = "";
    
    // Verificar que la fecha tenga un formato válido
    if (!fecha.match(/^\d{4}-\d{2}-\d{2}$/)) {
        fechaError.textContent = "Por favor, ingresa una fecha válida (YYYY-MM-DD).";
        isValid = false;
    } else {
        let fechaActual = new Date();
        let fechaSeleccionada = new Date(fecha);
        if (fechaSeleccionada <= fechaActual) {
            fechaError.textContent = "La fecha debe ser posterior a la actual.";
            isValid = false;
        }
    }
    
    // Verificar que la cantidad de personas no esté vacía y sea un número entero entre 1 y 8
    if (personas.trim() === '' || isNaN(personas) || personas < 1 || personas > 8) {
        personasError.textContent = "La cantidad de personas debe ser un número entero entre 1 y 8.";
        isValid = false;
    }
    
    if (!isValid) {
        event.preventDefault();
    }
});