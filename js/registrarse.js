// Seleccionar elementos del DOM
const registerForm = document.getElementById('registerForm');
const emailInput = document.getElementById('email');
const passwordInput = document.getElementById('password');
const confirmPasswordInput = document.getElementById('confirmPassword');

// Manejar el evento de envío del formulario
registerForm.addEventListener('submit', async (event) => {
  event.preventDefault(); // Evita que se recargue la página

  const email = emailInput.value.trim();
  const password = passwordInput.value.trim();
  const confirmPassword = confirmPasswordInput.value.trim();

  // Validar que las contraseñas coinciden
  if (password !== confirmPassword) {
    Toastify({
      text: "Las contraseñas no coinciden",
      backgroundColor: "linear-gradient(to right, #f44336, #e57373)", // Rojo
      className: "toast-error",
      duration: 3000
    }).showToast();
    return;
  }

  try {
    // Realizar solicitud al endpoint de registro
    const response = await fetch('http://localhost:5000/api/auth/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();

    if (response.ok) {
      // Registro exitoso
      Toastify({
        text: "Registro exitoso. Puedes iniciar sesión ahora.",
        backgroundColor: "linear-gradient(to right, #4caf50, #81c784)", // Verde
        className: "toast-success",
        duration: 3000
      }).showToast();
      window.location.href = '../index.html'; // Redirigir al login
    } else {
      // Mostrar mensaje de error con Toastify
      Toastify({
        text: data.message || 'Error al registrar usuario',
        backgroundColor: "linear-gradient(to right, #f44336, #e57373)", // Rojo
        className: "toast-error",
        duration: 3000
      }).showToast();
    }
  } catch (error) {
    console.error('Error al registrar usuario:', error);
    Toastify({
      text: 'Error del servidor. Inténtalo más tarde.',
      backgroundColor: "linear-gradient(to right, #f44336, #e57373)", // Rojo
      className: "toast-error",
      duration: 3000
    }).showToast();
  }
});
