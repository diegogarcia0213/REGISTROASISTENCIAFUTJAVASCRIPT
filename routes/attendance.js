const express = require('express');
const router = express.Router();
const pool = require('../config/db');

// Ruta para crear una nueva asistencia
router.post('/create', async (req, res) => {
  const { date, location, player_count } = req.body;

  try {
    await pool.query('INSERT INTO attendance (date, location, player_count) VALUES (?, ?, ?)', [
      date,
      location,
      player_count,
    ]);

    res.redirect('/welcome');
  } catch (err) {
    console.error(err);
    res.status(500).send('Error en el servidor');
  }
});

router.post('/delete', async (req, res) => {
    try {
      const { id } = req.body;
      await pool.query('DELETE FROM attendance WHERE id = ? ', [id]);
      res.redirect('/welcome');
    } catch (err) {
      console.error(err);
      res.status(500).send('Error en el servidor');
    }
});

router.get('/edit', async (req, res) => {
  const id = req.query.id;
  try {
    const [attendance] = await pool.query("SELECT date_format(date, '%Y-%m-%d') as date, id, location, player_count FROM attendance WHERE id = ?", [id]);
    const data = attendance[0];
    res.render('edit', {data});
  } catch (err) {
    console.error(err);
    res.status(500).send('Error en el servidor');
  }
});

router.post('/update', async (req, res) => {
  const { id, date, location, player_count } = req.body;

  try {
    await pool.query('UPDATE attendance SET date = ?, location = ?, player_count = ? WHERE id = ?', [
      date,
      location,
      player_count,
      id
    ]);

    res.redirect('/welcome');
  } catch (err) {
    console.error(err);
    res.status(500).send('Error en el servidor');
  }
});

module.exports = router;
