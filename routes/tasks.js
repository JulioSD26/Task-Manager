const express = require('express');
const Task = require('../models/Task');
const User = require('../models/User');
const router = express.Router();

// Crear una tarea
router.post('/', async (req, res) => {
  const { title, description, userId } = req.body;

  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }

    const newTask = new Task({
      title,
      description,
      user: user._id,
    });

    await newTask.save();
    res.status(201).json({ message: 'Tarea creada con éxito', task: newTask });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al crear tarea' });
  }
});

// Obtener todas las tareas de un usuario
router.get('/', async (req, res) => {
  const { userId } = req.query;

  try {
    const tasks = await Task.find({ user: userId });
    res.status(200).json({ tasks });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al obtener tareas' });
  }
});

// Actualizar tarea
router.put('/:id', async (req, res) => {
  const { title, description, completed } = req.body;

  try {
    const task = await Task.findByIdAndUpdate(
      req.params.id,
      { title, description, completed },
      { new: true }
    );
    if (!task) {
      return res.status(404).json({ message: 'Tarea no encontrada' });
    }
    res.status(200).json({ message: 'Tarea actualizada', task });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al actualizar tarea' });
  }
});

// Eliminar tarea
router.delete('/:id', async (req, res) => {
  try {
    const task = await Task.findByIdAndDelete(req.params.id);
    if (!task) {
      return res.status(404).json({ message: 'Tarea no encontrada' });
    }
    res.status(200).json({ message: 'Tarea eliminada' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al eliminar tarea' });
  }
});

module.exports = router;
