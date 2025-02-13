// Router configuration
const routes = {
    home: () => import('./pages/home.js'),
    about: () => import('./pages/about.js'),
    cabins: () => import('./pages/cabins.js'),
    activities: () => import('./pages/activities.js'),
    contact: () => import('./pages/contact.js'),
    login: () => import('./pages/login.js'),
    reservations: () => import('./pages/reservations.js')
};

// State management
const state = {
    currentUser: null,
    isAuthenticated: false
};

// Router function
async function router(page = 'home') {
    const contentDiv = document.getElementById('mainContent');
    try {
        const module = await routes[page]();
        contentDiv.innerHTML = '';
        const newContent = document.createElement('div');
        newContent.className = 'page-transition';
        newContent.innerHTML = module.default;
        contentDiv.appendChild(newContent);
        
        if (module.init) {
            module.init();
        }
    } catch (error) {
        console.error('Error loading page:', error);
        contentDiv.innerHTML = '<div class="container py-5"><h2>Página no encontrada</h2></div>';
    }
}

// Update user section
function updateUserSection() {
    const userSection = document.getElementById('userSection');
    if (state.isAuthenticated) {
        userSection.innerHTML = `
            <div class="dropdown">
                <button class="btn btn-outline-light dropdown-toggle" type="button" data-bs-toggle="dropdown">
                    <i class="bi bi-person-circle"></i> ${state.currentUser}
                </button>
                <ul class="dropdown-menu dropdown-menu-end">
                    <li><a class="dropdown-item" href="#reservations">Mis Reservas</a></li>
                    <li><hr class="dropdown-divider"></li>
                    <li><a class="dropdown-item" href="#" id="logoutBtn">Cerrar Sesión</a></li>
                </ul>
            </div>
        `;
    } else {
        userSection.innerHTML = `
            <a href="#login" class="btn btn-outline-light">
                <i class="bi bi-box-arrow-in-right"></i> Iniciar Sesión
            </a>
        `;
    }
}

// Event listeners
document.addEventListener('DOMContentLoaded', () => {
    // Check authentication status
    const savedUser = localStorage.getItem('email');
    if (savedUser) {
        state.currentUser = savedUser;
        state.isAuthenticated = true;
    }
    
    updateUserSection();

    // Initial route
    const initialPage = window.location.hash.slice(1) || 'home';
    router(initialPage);

    // Handle navigation
    window.addEventListener('hashchange', () => {
        const page = window.location.hash.slice(1) || 'home';
        router(page);
    });

    // Handle logout
    document.addEventListener('click', (e) => {
        if (e.target.id === 'logoutBtn') {
            e.preventDefault();
            state.currentUser = null;
            state.isAuthenticated = false;
            localStorage.removeItem('email');
            updateUserSection();
            window.location.hash = 'home';
        }
    });
});

export { state, router, updateUserSection };