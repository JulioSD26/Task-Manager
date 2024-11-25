// Seleccionar elementos del DOM
const loginForm = document.querySelector('form');
const emailInput = document.getElementById('email');
const passwordInput = document.getElementById('password');

// Manejar el evento de envío del formulario
loginForm.addEventListener('submit', async (event) => {
  event.preventDefault(); // Evita que se recargue la página

  const email = emailInput.value.trim();
  const password = passwordInput.value.trim();

  try {
    // Realizar solicitud al endpoint de login
    const response = await fetch('http://localhost:5000/api/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();

    if (response.ok) {
      // Login exitoso
      Toastify({
        text: "Inicio de sesión exitoso",
        backgroundColor: "linear-gradient(to right, #4caf50, #81c784)", // Verde
        className: "toast-success",
        duration: 3000
      }).showToast();
      
      localStorage.setItem('userId', data.userId); // Guarda el ID del usuario
      window.location.href = '../tasks.html'; // Redirigir al dashboard
    } else {
      // Mostrar mensaje de error con Toastify
      Toastify({
        text: data.message || 'Credenciales incorrectas',
        backgroundColor: "linear-gradient(to right, #f44336, #e57373)", // Rojo
        className: "toast-error",
        duration: 3000
      }).showToast();
    }
  } catch (error) {
    console.error('Error al iniciar sesión:', error);
    Toastify({
      text: 'Error del servidor. Inténtalo más tarde.',
      backgroundColor: "linear-gradient(to right, #f44336, #e57373)", // Rojo
      className: "toast-error",
      duration: 3000
    }).showToast();
  }
});
