export default `
    <section class="py-4">
        <div class="container">
            <h2 class="mb-4">Nuestras Cabañas</h2>
            <div class="row">
                <!-- Cabaña Estándar -->
                <div class="col-md-4 mb-4">
                    <div class="card cabin-card h-100">
                        <div class="position-relative">
                            <img src="https://images.unsplash.com/photo-1587061949409-02df41d5e562" class="card-img-top" alt="Cabaña estándar">
                            <span class="position-absolute top-0 end-0 badge bg-primary m-3">Desde $100/noche</span>
                        </div>
                        <div class="card-body">
                            <h5 class="card-title">Cabaña Estándar</h5>
                            <p class="card-text">Perfecta para parejas y familias pequeñas. Incluye:</p>
                            <ul class="list-unstyled">
                                <li><i class="bi bi-check-circle-fill text-success"></i> 2 habitaciones</li>
                                <li><i class="bi bi-check-circle-fill text-success"></i> Cocina equipada</li>
                                <li><i class="bi bi-check-circle-fill text-success"></i> WiFi gratuito</li>
                            </ul>
                        </div>
                        <div class="card-footer bg-white border-0">
                            <button class="btn btn-outline-primary w-100" data-cabin-type="standard">Reservar Ahora</button>
                        </div>
                    </div>
                </div>

                <!-- Cabaña Premium -->
                <div class="col-md-4 mb-4">
                    <div class="card cabin-card h-100">
                        <div class="position-relative">
                            <img src="https://cf.bstatic.com/xdata/images/hotel/max1024x768/503890185.jpg?k=54368a4fcda837b16c6695678bf17c805a8369f06d58b71c0137fa0eba91bb77&o=&hp=1" class="card-img-top" alt="Cabaña premium">
                            <span class="position-absolute top-0 end-0 badge bg-primary m-3">Desde $150/noche</span>
                        </div>
                        <div class="card-body">
                            <h5 class="card-title">Cabaña Premium</h5>
                            <p class="card-text">Ideal para familias. Incluye:</p>
                            <ul class="list-unstyled">
                                <li><i class="bi bi-check-circle-fill text-success"></i> 3 habitaciones</li>
                                <li><i class="bi bi-check-circle-fill text-success"></i> Jacuzzi privado</li>
                                <li><i class="bi bi-check-circle-fill text-success"></i> Vista panorámica</li>
                            </ul>
                        </div>
                        <div class="card-footer bg-white border-0">
                            <button class="btn btn-outline-primary w-100" data-cabin-type="premium">Reservar Ahora</button>
                        </div>
                    </div>
                </div>

                <!-- Cabaña Deluxe -->
                <div class="col-md-4 mb-4">
                    <div class="card cabin-card h-100">
                        <div class="position-relative">
                            <img src="https://www.turismocordoba.com.ar/lasmasiascabanas/img-cliente/02.jpg" class="card-img-top" alt="Cabaña deluxe">
                            <span class="position-absolute top-0 end-0 badge bg-primary m-3">Desde $200/noche</span>
                        </div>
                        <div class="card-body">
                            <h5 class="card-title">Cabaña Deluxe</h5>
                            <p class="card-text">Perfecta para grupos grandes. Incluye:</p>
                            <ul class="list-unstyled">
                                <li><i class="bi bi-check-circle-fill text-success"></i> 4 habitaciones</li>
                                <li><i class="bi bi-check-circle-fill text-success"></i> Piscina privada</li>
                                <li><i class="bi bi-check-circle-fill text-success"></i> Área de BBQ</li>
                            </ul>
                        </div>
                        <div class="card-footer bg-white border-0">
                            <button class="btn btn-outline-primary w-100" data-cabin-type="deluxe">Reservar Ahora</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
`;

export function init() {
    document.querySelectorAll('[data-cabin-type]').forEach(button => {
        button.addEventListener('click', (e) => {
            const cabinType = e.target.dataset.cabinType;
            window.location.hash = '#home';
            document.getElementById('tipoCabaña').value = cabinType;
        });
    });
}