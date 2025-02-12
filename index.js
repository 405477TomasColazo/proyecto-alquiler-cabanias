document.addEventListener("DOMContentLoaded", function () {
    let today = new Date();
    let tomorrow = new Date();
    tomorrow.setDate(today.getDate() + 1);

    let formatDate = (date) => date.toISOString().split('T')[0];

    document.getElementById("fechaInicio").value = formatDate(tomorrow);
    document.getElementById("fechaFin").value = formatDate(new Date(new Date().setDate(new Date().getDate() + 2)));

});
// Función para calcular el precio según el tipo de cabaña y días
function calcularPrecio() {
    const tipoCabaña = document.getElementById('tipoCabaña').value;
    const fechaInicio = new Date(document.getElementById('fechaInicio').value);
    const fechaFin = new Date(document.getElementById('fechaFin').value);
    const personas = parseInt(document.getElementById('personas').value) || 0;

    if (!fechaInicio || !fechaFin || personas === 0 || !tipoCabaña) return;

    const dias = Math.ceil((fechaFin - fechaInicio) / (1000 * 60 * 60 * 24));
    if (dias <= 0) return;

    let precioPorDia;
    switch (tipoCabaña) {
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
    return precioTotal.toFixed(2);
}

// Función para validar fechas
function validarFechas() {
    const fechaInicio = new Date(document.getElementById('fechaInicio').value);
    const fechaFin = new Date(document.getElementById('fechaFin').value);

    // Validar que la fecha de inicio no sea anterior a hoy
    const hoy = new Date();
    hoy.setHours(0, 0, 0, 0);

    if (fechaInicio < hoy) {
        mostrarError('fechaInicio', "La fecha de inicio no puede ser anterior a hoy");
        return false;
    }

    // Validar que la fecha de fin sea posterior a la de inicio
    if (fechaFin <= fechaInicio) {
        mostrarError('fechaFin', "La fecha de salida debe ser posterior a la fecha de ingreso");
        return false;
    }

    limpiarErrores();
    return true;
}

function mostrarError(inputId, mensaje) {
    const errorDiv = document.getElementById(inputId + 'Error') || crearErrorDiv(inputId);
    errorDiv.textContent = mensaje;
    errorDiv.classList.add('error-message');
}

function crearErrorDiv(inputId) {
    const input = document.getElementById(inputId);
    const errorDiv = document.createElement('div');
    errorDiv.id = inputId + 'Error';
    errorDiv.classList.add('error-message');
    input.parentNode.appendChild(errorDiv);
    return errorDiv;
}

function limpiarErrores() {
    ['fechaInicio', 'fechaFin', 'personas', 'tipoCabaña'].forEach(id => {
        const errorDiv = document.getElementById(id + 'Error');
        if (errorDiv) errorDiv.textContent = '';
    });
}

// Event listeners para actualizar precio
document.getElementById('tipoCabaña').addEventListener('change', calcularPrecio);
document.getElementById('fechaInicio').addEventListener('change', calcularPrecio);
document.getElementById('fechaFin').addEventListener('change', calcularPrecio);
document.getElementById('personas').addEventListener('change', calcularPrecio);

// Manejar el envío del formulario
document.getElementById('reservaForm').addEventListener('submit', function (event) {
    event.preventDefault();
    let isValid = true;

    const localEmail = localStorage.getItem('email');
    const tipoCabaña = document.getElementById('tipoCabaña').value;
    const fechaInicio = document.getElementById('fechaInicio').value;
    const fechaFin = document.getElementById('fechaFin').value;
    const personas = document.getElementById('personas').value;

    // Validaciones
    if (!tipoCabaña) {
        mostrarError('tipoCabaña', "Por favor, selecciona un tipo de cabaña");
        isValid = false;
    }

    if (!fechaInicio) {
        mostrarError('fechaInicio', "Por favor, selecciona una fecha de inicio");
        isValid = false;
    }

    if (!fechaFin) {
        mostrarError('fechaFin', "Por favor, selecciona una fecha de fin");
        isValid = false;
    }

    if (!validarFechas()) {
        isValid = false;
    }

    if (personas < 1) {
        mostrarError('personas', "La cantidad de personas debe ser al menos 1");
        isValid = false;
    }

    if (isValid) {
        const precioTotal = calcularPrecio();

        // Guardar datos en localStorage
        const reservaData = {
            localEmail: localStorage.getItem('email'),
            tipoCabaña,
            fechaInicio,
            fechaFin,
            personas,
            precioTotal
        };
        localStorage.setItem('ultimaReserva', JSON.stringify(reservaData));

        // Mostrar modal de confirmación
        const modalBody = document.querySelector('#alquilerModal .modal-body');
        modalBody.innerHTML = `
            <div class="reservation-details">
                <p><strong>Email:</strong> ${localEmail}</p>
                <p><strong>Tipo de Cabaña:</strong> ${tipoCabaña}</p>
                <p><strong>Fecha de Inicio:</strong> ${fechaInicio}</p>
                <p><strong>Fecha de Fin:</strong> ${fechaFin}</p>
                <p><strong>Cantidad de Personas:</strong> ${personas}</p>
                <p><strong>Precio Total:</strong> $${precioTotal}</p>
            </div>
        `;

        const modal = new bootstrap.Modal(document.getElementById('alquilerModal'));
        modal.show();

    }
    
});

function modalAceptar() {
    setTimeout(() => {
        window.location.href = 'confirmacion.html';
    }, 500);
    
}