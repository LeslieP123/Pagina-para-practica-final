const express = require('express')
const app = express();

const PORT = process.env.PORT || 4000;

app.get('/', (req, res)=>{
    res.send('Ruta de inicio de nuestro proyecto');
})

app.get('/Home', (req, res)=>{
    res.send('Pagina de Home');
})

app.get('/AboutUs', (req, res)=>{
    res.send('Pagina de informacion de empresa');
})

app.get('/Especialties', (req, res)=>{
    res.send('Pagina de especialidades');
})

app.get('/Form', (req, res)=>{
    res.send('Pagina de formulario');
})

app.get('/404', (req, res)=>{
    res.send('Pagina de  error 404');
})

app.listen (PORT, ()=>{
    console.log (`Server on http://localhost:${PORT}`);
})