export default `
    <section class="py-5">
        <div class="container">
            <div class="row">
                <div class="col-lg-6">
                    <h2 class="mb-4">Contáctanos</h2>
                    <form id="contactForm">
                        <div class="mb-3">
                            <label for="nombre" class="form-label">Nombre</label>
                            <input type="text" class="form-control" id="nombre" required>
                        </div>
                        <div class="mb-3">
                            <label for="email" class="form-label">Email</label>
                            <input type="email" class="form-control" id="email" required>
                        </div>
                        <div class="mb-3">
                            <label for="mensaje" class="form-label">Mensaje</label>
                            <textarea class="form-control" id="mensaje" rows="4" required></textarea>
                        </div>
                        <button type="submit" class="btn btn-primary">Enviar Mensaje</button>
                    </form>
                </div>
                <div class="col-lg-6">
                    <div class="card h-100">
                        <div class="card-body">
                            <h5 class="card-title">Información de Contacto</h5>
                            <ul class="list-unstyled">
                                <li class="mb-3">
                                    <i class="bi bi-geo-alt-fill text-primary me-2"></i>
                                    Ruta Provincial 82, Km 15, Mendoza, Argentina
                                </li>
                                <li class="mb-3">
                                    <i class="bi bi-telephone-fill text-primary me-2"></i>
                                    +54 (261) 555-0123
                                </li>
                                <li class="mb-3">
                                    <i class="bi bi-envelope-fill text-primary me-2"></i>
                                    info@mountainescape.com
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
`;

export function init() {
    const form = document.getElementById('contactForm');
    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            alert('Mensaje enviado correctamente');
            form.reset();
        });
    }
}