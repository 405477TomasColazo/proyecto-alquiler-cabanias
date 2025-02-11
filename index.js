// Función para calcular el precio según el tipo de cabaña y días
function calcularPrecio() {
    const tipoCabaña = document.getElementById('tipoCabaña').value;
    const fechaInicio = new Date(document.getElementById('fechaInicio').value);
    const fechaFin = new Date(document.getElementById('fechaFin').value);
    const personas = parseInt(document.getElementById('personas').value) || 0;
    
    if (!fechaInicio || !fechaFin || personas === 0) return;
    
    const dias = Math.ceil((fechaFin - fechaInicio) / (1000 * 60 * 60 * 24));
    if (dias <= 0) return;
    
    let precioPorDia;
    switch(tipoCabaña) {
        case 'estandar':
            precioPorDia = 100;
            break;
        case 'premium':
            precioPorDia = 150;
            break;
        case 'deluxe':
            precioPorDia = 200;
            break;
        default:
            precioPorDia = 100;
    }
    
    const precioTotal = precioPorDia * dias * (personas > 2 ? personas * 0.8 : personas);
    document.getElementById('precio').textContent = precioTotal.toFixed(2);
}

// Función para validar fechas
function validarFechas() {
    const fechaInicio = new Date(document.getElementById('fechaInicio').value);
    const fechaFin = new Date(document.getElementById('fechaFin').value);
    const fechaInicioError = document.getElementById('fechaInicioError');
    const fechaFinError = document.getElementById('fechaFinError');
    
    // Limpiar mensajes de error previos
    fechaInicioError.textContent = "";
    fechaFinError.textContent = "";
    
    // Validar que la fecha de inicio no sea anterior a hoy
    const hoy = new Date();
    hoy.setHours(0, 0, 0, 0);
    
    if (fechaInicio < hoy) {
        fechaInicioError.textContent = "La fecha de inicio no puede ser anterior a hoy";
        return false;
    }
    
    // Validar que la fecha de fin sea posterior a la de inicio
    if (fechaFin <= fechaInicio) {
        fechaFinError.textContent = "La fecha de salida debe ser posterior a la fecha de ingreso";
        return false;
    }
    
    return true;
}

// Añadir listeners para actualizar el precio
document.getElementById('tipoCabaña').addEventListener('change', calcularPrecio);
document.getElementById('fechaInicio').addEventListener('change', function() {
    validarFechas();
    calcularPrecio();
});
document.getElementById('fechaFin').addEventListener('change', function() {
    validarFechas();
    calcularPrecio();
});
document.getElementById('personas').addEventListener('change', calcularPrecio);

// Manejar el envío del formulario
document.getElementById('reservaForm').addEventListener('submit', function(event) {
    event.preventDefault();
    let isValid = true;
    
    const tipoCabaña = document.getElementById('tipoCabaña').value;
    const fechaInicio = document.getElementById('fechaInicio').value;
    const fechaFin = document.getElementById('fechaFin').value;
    const personas = document.getElementById('personas').value;
    const precio = document.getElementById('precio').textContent;
    
    // Validaciones
    if (!fechaInicio) {
        document.getElementById('fechaInicioError').textContent = "Por favor, selecciona una fecha de inicio.";
        isValid = false;
    }
    
    if (!fechaFin) {
        document.getElementById('fechaFinError').textContent = "Por favor, selecciona una fecha de fin.";
        isValid = false;
    }
    
    if (!validarFechas()) {
        isValid = false;
    }
    
    if (personas < 1) {
        document.getElementById('personasError').textContent = "La cantidad de personas debe ser al menos 1.";
        isValid = false;
    }
    
    if (isValid) {
        // Guardar datos en localStorage para acceder desde otra página
        const reservaData = {
            tipoCabaña,
            fechaInicio,
            fechaFin,
            personas,
            precio
        };
        localStorage.setItem('ultimaReserva', JSON.stringify(reservaData));
        
        // Mostrar datos en el modal
        const modalBody = document.querySelector('#alquilerModal .modal-body');
        modalBody.innerHTML = `
            <h4>¡Gracias por tu reserva!</h4>
            <div class="reservation-details">
                <p><strong>Tipo de Cabaña:</strong> ${tipoCabaña}</p>
                <p><strong>Fecha de Inicio:</strong> ${fechaInicio}</p>
                <p><strong>Fecha de Fin:</strong> ${fechaFin}</p>
                <p><strong>Cantidad de Personas:</strong> ${personas}</p>
                <p><strong>Precio Total:</strong> $${precio}</p>
            </div>
        `;
        
        // Mostrar el modal
        const modal = new bootstrap.Modal(document.getElementById('alquilerModal'));
        modal.show();
        
        // Opcional: redirigir a la página de confirmación
        setTimeout(() => {
            window.location.href = 'confirmacion.html';
        }, 3000);
    }
});