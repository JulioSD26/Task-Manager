const express = require('express');
const bcrypt = require('bcryptjs');
const User = require('../models/User');
const router = express.Router();

// Registro de usuario
router.post('/register', async (req, res) => {
    const { email, password } = req.body;
    try {
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'Usuario ya registrado' });
        }

        const user = new User({ email, password });
        await user.save();

        res.status(201).json({ message: 'Usuario registrado exitosamente' });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Error al registrar usuario' });
        }
});

// Login de usuario
router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: 'Credenciales incorrectas' });
        }

        const validPassword = await bcrypt.compare(password, user.password);
        if (!validPassword) {
            return res.status(400).json({ message: 'Credenciales incorrectas' });
        }

        // Si la contraseña es válida, responder con un mensaje de éxito
        res.json({ message: 'Login exitoso', userId: user._id });

        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Error al iniciar sesión' });
        }
});

module.exports = router;
