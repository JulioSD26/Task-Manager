// Seleccionar los elementos del DOM
const addTaskBtn = document.getElementById('addTaskBtn');
const taskInput = document.getElementById('taskInput');
const taskList = document.getElementById('taskList');
const logoutBtn = document.getElementById('logoutBtn');

// Obtener el ID del usuario
const userId = localStorage.getItem('userId');

// URL de la API para interactuar con las tareas
const apiUrl = 'http://localhost:5000/api/tasks';

// Función para obtener las tareas desde la API
const getTasks = async () => {
    try {
        const response = await fetch(`${apiUrl}?userId=${userId}`);
        const data = await response.json();

        if (data.tasks) {
            // Limpiar la lista antes de agregar las tareas actualizadas
            taskList.innerHTML = '';

            data.tasks.forEach(task => {
                const li = document.createElement('li');
                li.classList.add('list-group-item', 'd-flex', 'justify-content-between', 'align-items-center', 'bg-dark', 'text-white');
                li.innerHTML = `
                    <span>${task.title}</span>
                    <div>
                        <button class="btn btn-outline-warning btn-sm me-2" onclick="editTask('${task._id}')">Editar</button>
                        <button class="btn btn-outline-danger btn-sm" onclick="deleteTask('${task._id}')">Eliminar</button>
                    </div>
                `;
                taskList.appendChild(li);
            });
        }
    } catch (error) {
        console.error('Error al obtener las tareas:', error);
    }
};

// Función para agregar una nueva tarea
addTaskBtn.addEventListener('click', async () => {
    const taskText = taskInput.value.trim();
    if (taskText !== '') {
        try {
            const response = await fetch(apiUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    title: taskText,
                    description: 'Descripción de la tarea',  // Puedes modificar esto si lo deseas
                    userId: userId,
                }),
            });

            const newTask = await response.json();
            if (newTask.task) {
                getTasks(); // Volver a cargar las tareas después de agregar una nueva
                taskInput.value = ''; // Limpiar el input
            }
        } catch (error) {
            console.error('Error al agregar tarea:', error);
        }
    }
});

// Función para eliminar una tarea
const deleteTask = async (taskId) => {
    try {
        await fetch(`${apiUrl}/${taskId}`, {
            method: 'DELETE',
        });
        getTasks(); // Volver a cargar las tareas después de eliminar una
    } catch (error) {
        console.error('Error al eliminar tarea:', error);
    }
};

// Función para editar una tarea
const editTask = async (taskId) => {
    const newTaskText = prompt('Edita la tarea:');
    if (newTaskText && newTaskText.trim() !== '') {
        try {
            await fetch(`${apiUrl}/${taskId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ title: newTaskText, description: 'Descripción actualizada' }),
            });
            getTasks(); // Volver a cargar las tareas después de editar
        } catch (error) {
            console.error('Error al editar tarea:', error);
        }
    }
};

// Función para cerrar sesión
logoutBtn.addEventListener('click', () => {
    console.log('Cerrando sesión...');
    localStorage.removeItem('userId');
    window.location.href = 'index.html'; // Redirigir al login
});

// Cargar las tareas cuando la página se carga
window.onload = getTasks;
