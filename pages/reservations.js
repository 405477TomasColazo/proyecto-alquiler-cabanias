export default `
    <div class="container py-5">
        <h2 class="mb-4">Mis Reservas</h2>
        <div class="row" id="reservationsList">
            <!-- Reservations will be loaded dynamically -->
        </div>
    </div>
`;

export function init() {
    const reservationsList = document.getElementById('reservationsList');
    const reservations = JSON.parse(localStorage.getItem('reservations') || '[]');
    
    if (reservations.length === 0) {
        reservationsList.innerHTML = '<div class="col"><p class="text-muted">No tienes reservas activas.</p></div>';
        return;
    }

    reservationsList.innerHTML = reservations.map(reservation => `
        <div class="col-md-6 mb-4">
            <div class="card">
                <div class="card-body">
                    <h5 class="card-title">Cabaña ${reservation.tipoCabaña}</h5>
                    <p class="card-text">
                        <strong>Fecha de llegada:</strong> ${reservation.fechaInicio}<br>
                        <strong>Fecha de salida:</strong> ${reservation.fechaFin}<br>
                        <strong>Personas:</strong> ${reservation.personas}
                    </p>
                    <button class="btn btn-danger" data-reservation-id="${reservation.id}">
                        Cancelar Reserva
                    </button>
                </div>
            </div>
        </div>
    `).join('');

    document.querySelectorAll('[data-reservation-id]').forEach(button => {
        button.addEventListener('click', (e) => {
            const id = parseInt(e.target.dataset.reservationId);
            const reservations = JSON.parse(localStorage.getItem('reservations') || '[]');
            const updatedReservations = reservations.filter(r => r.id !== id);
            localStorage.setItem('reservations', JSON.stringify(updatedReservations));
            init(); // Refresh the list
        });
    });
}