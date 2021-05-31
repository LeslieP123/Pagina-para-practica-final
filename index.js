const express = require('express');
const app = express();

const hbs = require('express-handlebars');
const path = require('path');
const nodemailer = require ('nodemailer');
require('dotenv').config();

//Nodemailer//
const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true, // true for 465, false for other ports
    auth: {
      user: process.env.MAIL_USER, // generated ethereal user
      pass: process.env.MAIL_PASS, // generated ethereal password
    },
  });
  transporter.verify().then(()=>{
    console.log("Listo para enviar correo!");
});

/*Settings*/ 
app.set("view engine", ".hbs");
app.set('Views', path.join(__dirname, 'Views'))
app.set(express.static(path.join(__dirname, "Public")))
app.use(express.urlencoded({
    extended: false
}));

/*Handlebars config*/ 
app.engine('.hbs', hbs({
    defaultLayout: "main",
    LayoutsDir: path.join(app.get('Views'), 'Layouts'),
    PartialsDir: path.join(app.get('Views'), 'Partials'),
    extname: ".hbs"

}))

app.get('/', (req, res)=>{
    res.render('Home', 
    {ruta: "/Assets/css/Home.css"});
})

app.get('/AboutUs', (req, res)=>{
    res.render('AboutUs', 
    {ruta: "/Assets/css/AboutUs.css"});
})

app.get('/Especialties', (req, res)=>{
    res.render('Especialties', 
    {ruta: "/Assets/css/Especialties.css"});
})

app.get('/Form', (req, res)=>{
    res.render('Form', 
    {ruta: "/Assets/css/Form.css"});
})

app.get('/404', (req, res)=>{
    res.render('404', 
    {ruta: "/Assets/css/404.css"});
})

app. post ('/Form', async(req, res)=>{
    // send mail with defined transport object
   await transporter.sendMail({
   from: process.env.MAIL_USER, // sender address
   to:process.env.MAIL_USER, // list of receivers
   subject: `${req.body.nombre} Requiere de su atención sobre ${req.body.asunto}`, // Subject line
   html: `<h1>Nombre:${req.body.nombre}</h1>
       <h1>Correo:${req.body.email}</h1>
       <h1>Solicita la siguiente información:</h1>
   <h1>${req.body.mensaje}</h1>` // html body
 });
   res.redirect('/');
})

app.use((req, res)=>{
    res.render('404');
});

const PORT = process.env.PORT || 4000;
app.listen (PORT, ()=>{
    console.log(app.get('Views'));
    console.log (`Server at http://localhost:${PORT}`);
})