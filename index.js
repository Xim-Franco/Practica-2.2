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
    "Catterpie",
    "Gastly",
    "Metapod",
    "Pidgey",
    "Magikarp"
];

const pokemones = [
    { 
        "image": "/img/catterpie.png", 
        "url" : "http://localhost:3000/img/catterpie.png", 
        "frase" : "eres buena onda, pero te hablan feo y lloras"
    },
    { 
        "image": "/img/chikorita.jpg", 
        "url" : "http://localhost:3000/img/chikorita.jpg",
        "frase" : "Eres cool, aunque no todos lo sepan" 
    },
    { 
        "image": "/img/gastly.jpg", 
        "url" : "http://localhost:3000/img/gastly.jpg",
        "frase" : "Quizá cuando crezcas derrotes a una entrenadora psiquica" 
    },
    { 
        "image": "/img/hawnter.jpg", 
        "url" : "http://localhost:3000/img/hawnter.jpg",
        "frase" : "Llegas tardisímo a las fiestas" 
    },
    { 
        "image": "/img/piplup.png", 
        "url" : "http://localhost:3000/img/piplup.png",
        "frase" : "La persona más adorable del mundo" 
    }
    
    
]

// Configurar handlebars como motor de vistas
app.engine('handlebars', engine({
    defaultLayout: 'main', // Lienzo base
}));
app.set('view engine', 'handlebars');

app.use(express.static((__dirname + '/public')));

// Ruta raíz
app.get('/', (req, res) => res.render('home'))


// Ruta about
app.get('/about', (req, res) => {
    // Código para manejar la ruta personalizada
    const randomFortune=fortunes[Math.floor(Math.random()*fortunes.length)]
    res.render('about',{fortune: randomFortune})
});

// Ruta personalizada
app.get("/ruta1", (req,res)=>{
    res.render('ruta1')
})

// Ruta para contenido dinámico
app.get('/ruta2', (req, res) => {
    const randomPokemones=pokemones[Math.floor(Math.random()*pokemones.length)]
    res.render('ruta2',{pokemones: randomPokemones});
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
