
import express from 'express';
import ejs from 'ejs';
import path from 'path';
import expressLayouts from 'express-ejs-layouts';
import { fileURLToPath } from 'url';
import  { connectDB } from './config/dbConfig.mjs';
import superHeroRoutes from './routes/superHeroRoutes.mjs';
import methodOverride from 'method-override';
import contactoRoutes from './routes/superHeroRoutes.mjs';

//modulos ES
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

app.use(methodOverride('_method'));//leer como metodo delete, viniendo de un post

// Configurar EJS como motor de vistas
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Configurar express-ejs-layouts
app.use(expressLayouts);
app.set('layout', 'layout'); // Archivo base de layouts 

// servir archivos estáticos
app.use(express.static(path.resolve('./public')));

//Ruta principal
app.get('/', (req, res)=> {
  res.render('index',{ title: 'Pagina Principal'});
});

// Ruta para pagina Acerca de
app.get('/about',(req, res)=>{
  res.render('about',{title: ' Acerca de Nosotros'});
});

//Ruta para la pagina de Contacto
app.get('/contact',(req, res)=>{
  res.render('contact', { title: 'Contáctanos'});
});

// Middleware para parsear JSON
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Conexión a MongoDB
connectDB();

// Configuración de rutas
app.use('/api', superHeroRoutes);
console.log("DEBUG: Middleware '/api' configurado");
app.use('/', contactoRoutes);
app.get('/', (req, res) => res.redirect('/api/dashboard'));

// Manejo de errores para rutas no encontradas
app.use((req, res) => {
  res.status(404).send({ mensaje: "Ruta no encontrada" });
  });

  // Iniciar el servidor
app.listen(PORT, () => {
  console.log(`Servidor escuchando en el puerto ${PORT}`);
});
