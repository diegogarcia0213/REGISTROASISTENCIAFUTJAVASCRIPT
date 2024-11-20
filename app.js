const express = require('express');
const bodyParser = require('body-parser');
const attendanceRoutes = require('./routes/attendance');
const welcomeRoutes = require('./routes/welcome');
const cors = require('cors');
require('dotenv').config();

const authRoutes = require('./routes/auth');

const app = express();

// Configurar EJS
app.set('view engine', 'ejs');
app.set('views', './views'); // Carpeta donde estarán las vistas

app.locals.cache = false;

// Middlewares
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true })); // Para datos de formularios
app.use(express.static('public')); // Carpeta para archivos estáticos

// Rutas
app.use('/api/auth', authRoutes);

// Rutas para vistas
app.get('/', (req, res) => res.render('login'));
app.get('/register', (req, res) => res.render('register'));
app.use('/attendance', attendanceRoutes);
app.use('/welcome', welcomeRoutes);

// Iniciar servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
