document.addEventListener("DOMContentLoaded", function () {
    const reservasLista = document.getElementById("reservasLista");
    const modalConfirmacion = new bootstrap.Modal(document.getElementById("confirmarCancelacionModal"));
    const modalDetalles = new bootstrap.Modal(document.getElementById("detallesCabañaModal"));
    let reservaAEliminar = null;

    function obtenerReservas() {
        return JSON.parse(localStorage.getItem("reservas")) || [];
    }

    function guardarReservas(reservas) {
        localStorage.setItem("reservas", JSON.stringify(reservas));
    }

    function moverUltimaReserva() {
        let reservas = obtenerReservas();
        let ultimaReserva = JSON.parse(localStorage.getItem("ultimaReserva"));

        if (ultimaReserva) {
            reservas.push(ultimaReserva);
            guardarReservas(reservas);
            localStorage.removeItem("ultimaReserva");
        }
    }

    function obtenerDatosCabaña(tipoCabaña) {
        const datos = {
            estandar: {
                imagen: 'https://www.maderastecnicasinmunizadas.co/wp-content/uploads/Caban%CC%83as-16.jpg',
                descripcion: "Una cabaña acogedora con lo esencial para una estadía cómoda.",
                comodidades: ["WiFi", "Cocina equipada", "Estacionamiento", "TV"],
                ubicacion: "Bosque de la Montaña, Argentina"
            },
            premium: {
                imagen: 'https://scontent-eze1-1.xx.fbcdn.net/v/t1.6435-9/43207393_1005273723006320_5822038726204719104_n.jpg?_nc_cat=103&ccb=1-7&_nc_sid=127cfc&_nc_eui2=AeF6p7ckxH-LeuAyiHja-m_2B1chxGbIr2AHVyHEZsivYI-nn-RnFhR-cIQ6_HrieEkaVQAIrkZY3qZe8MiYDoBE&_nc_ohc=Za0CwjMbghoQ7kNvgEogV1l&_nc_zt=23&_nc_ht=scontent-eze1-1.xx&_nc_gid=A0i_y-MBMUWJsaSaz6A3wqJ&oh=00_AYBi40erg2EfPq_gp5_WtDO-BrEs8AhtMsrSFKLtmL1a4A&oe=67D378EF',
                descripcion: "Cabaña de lujo con vista al lago, ideal para relajarse con estilo.",
                comodidades: ["WiFi rápido", "Jacuzzi", "Desayuno incluido", "TV 50''"],
                ubicacion: "Lago Azul, Argentina"
            },
            deluxe: {
                imagen: 'https://i.pinimg.com/736x/3c/36/25/3c362522dabc6d17de047ff078838b65.jpg',
                descripcion: "Experiencia de lujo total con sauna privado y terraza con vista.",
                comodidades: ["Sauna", "Piscina climatizada", "Chef privado", "Netflix"],
                ubicacion: "Valle Secreto, Argentina"
            }
        };
        return datos[tipoCabaña.toLowerCase().trim()] || datos["estandar"];
    }

    function actualizarLista() {
        let reservas = obtenerReservas();
        reservasLista.innerHTML = "";

        if (reservas.length > 0) {
            reservas.forEach((reserva, index) => {
                const datosCabaña = obtenerDatosCabaña(reserva.tipoCabaña);
                const reservaItem = document.createElement("div");
                reservaItem.classList.add("col-md-6", "mb-4", "reserva-item");
                reservaItem.innerHTML = `
                    <div class="card shadow-lg border-0" data-index="${index}">
                        <img src="${datosCabaña.imagen}" class="card-img-top" alt="${reserva.tipoCabaña}" style="height: 200px; object-fit: cover;">
                        <div class="card-body">
                            <h5 class="card-title text-capitalize">${reserva.tipoCabaña}</h5>
                            <p><strong>Fecha:</strong> ${reserva.fechaInicio} - ${reserva.fechaFin}</p>
                            <p><strong>Personas:</strong> ${reserva.personas}</p>
                            <p><strong>Total:</strong> $${reserva.precioTotal}</p>
                            <button class="btn btn-danger btn-sm eliminar-reserva" data-index="${index}">
                                <i class="fas fa-trash-alt"></i> Cancelar
                            </button>
                        </div>
                    </div>
                `;
                reservasLista.appendChild(reservaItem);
            });

            // Evento para abrir detalles al hacer clic en la tarjeta
            document.querySelectorAll(".card").forEach(card => {
                card.addEventListener("click", function () {
                    const index = this.getAttribute("data-index");
                    mostrarDetalles(reservas[index]);
                });
            });

            // Evento para cancelar reserva
            document.querySelectorAll(".eliminar-reserva").forEach(btn => {
                btn.addEventListener("click", function (event) {
                    event.stopPropagation(); // Evita abrir el modal de detalles al cancelar
                    reservaAEliminar = this.getAttribute("data-index");
                    modalConfirmacion.show();
                });
            });
        } else {
            reservasLista.innerHTML = `<p class="text-muted text-center">No tienes reservas aún.</p>`;
        }
    }

    function mostrarDetalles(reserva) {
        const datosCabaña = obtenerDatosCabaña(reserva.tipoCabaña);
        document.getElementById("detallesTitulo").textContent = `Cabaña ${reserva.tipoCabaña}`;
        document.getElementById("detallesImagen").src = datosCabaña.imagen;
        document.getElementById("detallesDescripcion").textContent = datosCabaña.descripcion;
        document.getElementById("detallesUbicacion").textContent = datosCabaña.ubicacion;
        document.getElementById("detallesComodidades").innerHTML = datosCabaña.comodidades.map(item => `<li>${item}</li>`).join('');
        modalDetalles.show();
    }

    // Confirmar cancelación
    document.getElementById("btnConfirmarCancelacion").addEventListener("click", function () {
        if (reservaAEliminar !== null) {
            let reservas = obtenerReservas();
            reservas.splice(reservaAEliminar, 1);
            guardarReservas(reservas);
            reservaAEliminar = null;
            modalConfirmacion.hide();
            actualizarLista();
        }
    });

    moverUltimaReserva();
    actualizarLista();
});
