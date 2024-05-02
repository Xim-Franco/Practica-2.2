import express from 'express';
import { engine } from 'express-handlebars';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
dotenv.config();

const app = express();
const port = process.env.PORT || 3000;
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const fortunes = [
    "Estas líneas se cambian",
    "por los",
    "URL de las",
    "imágenes que van a estar",
    "cambiando"
];

// Configurar handlebars como motor de vistas
app.engine('handlebars', engine({
    defaultLayout: 'main', // Lienzo base
}));
app.set('view engine', 'handlebars');

app.use(express.static(path.join(__dirname, 'public')));

// Ruta raíz
app.get('/', (req, res) => res.render('home'));

// Ruta personalizada
app.get('/custom-route', (req, res) => {
    // Código para manejar la ruta personalizada
    res.send('Ruta personalizada');
});

// Ruta para contenido dinámico
app.get('/dynamic-content', (req, res) => {
    const data = {
        image: '/images/example.jpg',
        url: 'https://example.com'
    };
    res.render('dynamic', { data });
});

// Ruta para manejar errores 404 (Not Found)
app.use((req, res, next) => {
    res.status(404);
    res.render('404');
});

// Ruta para manejar errores 500 (Internal Server Error)
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500);
    res.render('500');
});

app.listen(port, () => {
    console.log(`La aplicación está funcionando en http://localhost:${port}`);
});
