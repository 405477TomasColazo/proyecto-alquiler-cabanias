document.getElementById('form').addEventListener('submit', function(event) {
    event.preventDefault();
    let isValid = true;

    const email = document.getElementById('email').value; 
    localStorage.setItem('email', email);
    
    const password = document.getElementById('password').value;

    if (!email) {
        mostrarError('email', 'Por favor, ingresa tu correo electrónico');
        isValid = false;
    }

    if (!password) {
        mostrarError('password', 'Por favor, ingresa tu contraseña');
        isValid = false;
    }

    if (isValid) {
        window.location.href = 'index.html';
    }
});
