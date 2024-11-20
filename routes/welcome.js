const express = require('express');
const router = express.Router();
const pool = require('../config/db');

// Ruta para crear una nueva asistencia
router.get('/', async (req, res) => {
  try {
    const [attendances] = await pool.query("SELECT date_format(date, '%Y-%m-%d') as date, id, location, player_count FROM attendance ORDER BY date DESC");    
    res.render('welcome', { attendances });
  } catch (err) {
    console.error(err);
    res.status(500).send('Error en el servidor');
  }
});

module.exports = router;