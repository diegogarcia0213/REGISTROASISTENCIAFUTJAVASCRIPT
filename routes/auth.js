const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const pool = require('../config/db');
require('dotenv').config();

const router = express.Router();

// Login
router.post('/login', async (req, res) => {
    const { email, password } = req.body;
  
    try {
      // Verificar si el usuario existe
      const [user] = await pool.query('SELECT * FROM users WHERE email = ?', [email]);
      if (user.length === 0) {
        return res.render('login', { message: 'Credenciales inválidas' });
      }
  
      // Verificar contraseña
      const validPassword = await bcrypt.compare(password, user[0].password);
      if (!validPassword) {
        return res.render('login', { message: 'Credenciales inválidas' });
      }
  
      // Crear el token
      const token = jwt.sign({ id: user[0].id }, process.env.JWT_SECRET, { expiresIn: '1h' });
      const [attendances] = await pool.query('SELECT * FROM attendance ORDER BY date DESC');
      // Renderizar la vista de bienvenida
      res.render('welcome', { attendances });
    } catch (err) {
      console.log(err);
      res.status(500).send('Error en el servidor Login');
    }
});  
  
router.post('/register', async (req, res) => {
    const {name, lastname, email, password } = req.body;

    try {
      const [user] = await pool.query('SELECT * FROM users WHERE email = ?', [email]);
      if (user.length > 0) {
        return res.render('register', { message: 'El usuario ya existe' });
      }
  
      const hashedPassword = await bcrypt.hash(password, 10);
      await pool.query(
        'INSERT INTO users (name, lastname, email, password) VALUES (?, ?, ?, ?)',
        [name, lastname, email, hashedPassword]
      );
  
      res.redirect('/');
    } catch (err) {
      console.log(err);
      res.status(500).send('Error en el servidor');
    }
});

module.exports = router;
