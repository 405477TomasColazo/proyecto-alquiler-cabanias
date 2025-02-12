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

    if (!fechaInicio || !fechaFin || personas === 0 || !tipoCabaña) return 0;

    const dias = Math.ceil((fechaFin - fechaInicio) / (1000 * 60 * 60 * 24));
    if (dias <= 0) return 0;

    let precioPorDia;
    switch (tipoCabaña) {
        case 'estandar': precioPorDia = 100; break;
        case 'premium': precioPorDia = 150; break;
        case 'deluxe': precioPorDia = 200; break;
        default: precioPorDia = 100;
    }

    const precioTotal = precioPorDia * dias * (personas > 2 ? personas * 0.8 : personas);
    return precioTotal.toFixed(2);
}

// Función para validar fechas
function validarFechas() {
    const fechaInicio = new Date(document.getElementById('fechaInicio').value);
    const fechaFin = new Date(document.getElementById('fechaFin').value);
    const hoy = new Date();
    hoy.setHours(0, 0, 0, 0);

    if (fechaInicio < hoy) {
        mostrarError('fechaInicio', "La fecha de inicio no puede ser anterior a hoy");
        return false;
    }
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

// Función para mostrar el modal de confirmación
function mostrarReserva(tipoCabaña, localEmail, fechaInicio, fechaFin, personas, precioTotal) {
    let linkCabaña;
     // Asegurar que el tipo de cabaña está en minúsculas y sin espacios extra
     tipoCabaña = tipoCabaña.trim().toLowerCase();
     console.log("Tipo de Cabaña seleccionado:", tipoCabaña); // Verificar el valor

    switch (tipoCabaña) {
        case 'estandar':
            linkCabaña = 'https://www.maderastecnicasinmunizadas.co/wp-content/uploads/Caban%CC%83as-16.jpg';
            break;
        case 'premium':
            linkCabaña = 'https://scontent-eze1-1.xx.fbcdn.net/v/t1.6435-9/43207393_1005273723006320_5822038726204719104_n.jpg?_nc_cat=103&ccb=1-7&_nc_sid=127cfc&_nc_eui2=AeF6p7ckxH-LeuAyiHja-m_2B1chxGbIr2AHVyHEZsivYI-nn-RnFhR-cIQ6_HrieEkaVQAIrkZY3qZe8MiYDoBE&_nc_ohc=Za0CwjMbghoQ7kNvgEogV1l&_nc_zt=23&_nc_ht=scontent-eze1-1.xx&_nc_gid=A0i_y-MBMUWJsaSaz6A3wqJ&oh=00_AYBi40erg2EfPq_gp5_WtDO-BrEs8AhtMsrSFKLtmL1a4A&oe=67D378EF';
            break;
        case 'deluxe':
            linkCabaña = 'https://i.pinimg.com/736x/3c/36/25/3c362522dabc6d17de047ff078838b65.jpg';
            break;
        default:
            linkCabaña = 'img/default.jpg';
            break;
    }

    console.log("Imagen seleccionada:", linkCabaña);

    const modalBody = document.querySelector('#alquilerModal .modal-body');
    if (modalBody) {
        modalBody.innerHTML = `
            <div class="reservation-details text-center">
                <img src="${linkCabaña}" alt="Cabaña ${tipoCabaña}" class="img-fluid rounded mb-3" style="max-height: 150px;">
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
    } else {
        console.error("Error: No se encontró el elemento modal-body");
    }
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
        const reservaData = { localEmail, tipoCabaña, fechaInicio, fechaFin, personas, precioTotal };
        localStorage.setItem('ultimaReserva', JSON.stringify(reservaData));

        // Mostrar el modal de confirmación
        mostrarReserva(tipoCabaña, localEmail, fechaInicio, fechaFin, personas, precioTotal);
    }
});

// Redirección tras confirmar reserva
function modalAceptar() {
    setTimeout(() => {
        window.location.href = 'confirmacion.html';
    }, 500);
}
