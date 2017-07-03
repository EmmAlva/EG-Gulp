//Ejecutara el proyecto y hará el routing de los url
const express = require('express');
const app = express();

//aqui le decimos que use los archivos estáticos
//y que se muestren al llamar a la ruta '/'

app.use('/', express.static('public'));

//aqui le decimos al framework desde qué puerto 
app.listen(3000, () => {
	console.log('Listening on 3000');
})



//VAmos a generar una tarea para el GUlP que mueva archivos del 'src' al 'public'  :D
//1ro: installar gulp y guardarlo en devdependencias para generar archivos que se verán en producción
//gulpfile.js

//2do SASS
//3ro GULP Y JS FILES
//4to 
//AUTOMATIZANDO ...Recargar la página cada vez que hacemos cambios
