document.addEventListener("DOMContentLoaded", function () {
    const reservasLista = document.getElementById("reservasLista");

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

    function actualizarLista() {
        let reservas = obtenerReservas();
        reservasLista.innerHTML = "";

        if (reservas.length > 0) {
            reservas.forEach((reserva, index) => {
                const reservaItem = document.createElement("div");
                reservaItem.classList.add("list-group-item", "d-flex", "justify-content-between", "align-items-center");

                reservaItem.innerHTML = `
                    <div>
                        <h5>${reserva.tipoCabaña}</h5>
                        <p><strong>Fecha:</strong> ${reserva.fechaInicio} - ${reserva.fechaFin}</p>
                        <p><strong>Personas:</strong> ${reserva.personas}</p>
                        <p><strong>Total:</strong> $${reserva.precioTotal}</p>
                    </div>
                    <button class="btn btn-danger btn-sm eliminar-reserva" data-index="${index}">Cancelar</button>
                `;

                reservasLista.appendChild(reservaItem);
            });

            // Agregar evento a botones de eliminar
            document.querySelectorAll(".eliminar-reserva").forEach(btn => {
                btn.addEventListener("click", function () {
                    let reservas = obtenerReservas();
                    const index = this.getAttribute("data-index");
                    reservas.splice(index, 1);
                    guardarReservas(reservas);
                    actualizarLista(); // Actualizar sin recargar la página
                });
            });
        } else {
            reservasLista.innerHTML = `<p class="text-muted">No tienes reservas aún.</p>`;
        }
    }

    // Mueve la última reserva a la lista principal y actualiza la página
    moverUltimaReserva();
    actualizarLista();
});
