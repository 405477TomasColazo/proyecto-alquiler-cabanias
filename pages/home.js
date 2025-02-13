export default `
    <header class="main-header">
        <div class="container">
            <h1 class="mb-4">Descubre tu próximo destino para las vacaciones</h1>
            <div class="search-box">
                <form id="reservaForm" class="row g-3">
                    <div class="col-md-3">
                        <select class="form-select" id="tipoCabaña" required>
                            <option value="">Tipo de cabaña</option>
                            <option value="Estandar">Estándar</option>
                            <option value="Premium">Premium</option>
                            <option value="Deluxe">Deluxe</option>
                        </select>
                    </div>
                    <div class="col-md-4">
                        <div class="d-flex gap-2">
                            <input type="date" class="form-control" id="fechaInicio" required>
                            <input type="date" class="form-control" id="fechaFin" required>
                        </div>
                    </div>
                    <div class="col-md-3">
                        <input type="number" class="form-control" id="personas" 
                               placeholder="Personas" min="1" required>
                    </div>
                    <div class="col-md-2">
                        <button type="submit" class="btn btn-primary w-100">Reservar</button>
                    </div>
                </form>
            </div>
        </div>
    </header>
`;

export function init() {
    const form = document.getElementById('reservaForm');
    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            // Handle reservation logic
            const reservaData = {
                tipoCabaña: document.getElementById('tipoCabaña').value,
                fechaInicio: document.getElementById('fechaInicio').value,
                fechaFin: document.getElementById('fechaFin').value,
                personas: document.getElementById('personas').value,
                id: Date.now()
            };

            const reservas = JSON.parse(localStorage.getItem('reservations') || '[]');
            reservas.push(reservaData);
            localStorage.setItem('reservations', JSON.stringify(reservas));
            
            window.location.hash = '#reservations';
        });
    }
}