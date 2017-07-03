//leerá gulp para reconocer las tareas y ponerlas en el pipe
var gulp  = require('gulp');
var browserify = require('gulp-browserify');
var rename = require('gulp-rename');
var config = {
	source: './src/',
	dist: './public/'	
};



//GULP Y JS FILES
//instalar dependencias gulp-browserify y gulp-rename

var paths = {
	assets: "assets/",
	html: "**/*.html",
	sass: "scss/**/*.scss",
	mainSass: "scss/main.scss",
	mainJS: "js/app.js"
}

var sources = {
	assets: config.source + paths.assets,
	html: config.source + paths.html,
	sass: paths.assets + paths.sass,
	js: config.source + paths.js,
	rootSass: config.source + paths.assets + paths.mainSass,
	rootJS: config.source + paths.assets + paths.mainJS
};



/*var paths = {
	html: "**//*()*.html",
};*/

/*var sources = {
	html: config.source + paths.html,

};*/
gulp.task('html', () => {
	gulp.src(sources.html).pipe(gulp.dest(config.dist));
});


//GULP Y SASSS
//importar sass -  agregar los paths y sources de sass
var sass = require('gulp-sass');

//Actualizo sources
/*var paths = {
	assets: "assets/",
	html: "**//*()*.html",
	sass: "scss/**//*()*.scss",
	mainSass: "scss/main.scss"

}*/
/*var sources = {
	assets: config.source + paths.assets,
	html: config.source + paths.html,
	sass: paths.assets + paths.sass,
	rootSass: config.source + paths.assets + paths.mainSass,
};*/

//Creando la tarea
gulp.task("sass", function(){
	gulp.src(sources.rootSass)
	.pipe(sass({
		outputStyle: "compressed"
	}).on("error", sass.logError))
	.pipe(gulp.dest(config.dist + paths.assets + "css"));
});

/*
//GULP Y JS FILES
//instalar dependencias gulp-browserify y gulp-rename

var paths = {
	assets: "assets/",
	html: "**//*()*.html",
	sass: "scss/**//*()*.scss",
	mainSass: "scss/main.scss",
	mainJS: "js/app.js"
}

var sources = {
	assets: config.source + paths.assets,
	html: config.source + paths.html,
	sass: paths.assets + paths.sass,
	js: config.source + paths.js,
	rootSass: config.source + paths.assets + paths.mainSass,
	rootJS: config.source + paths.assets + paths.mainJS
};
*/
gulp.task("js", function(){
	gulp.src(sources.rootJS)
	.pipe(browserify()) //obtendrá el app.js y en función a los require, traerá los módulos necesarios
	.pipe(rename("bundle.js")) //colocará toda la información en un archivo bundle.js
	.pipe(gulp.dest(config.dist + paths.assets + "js"));
});

//AUTOMATIZANDO ...Recargar la página cada vez que hacemos cambios

//instalar la dependencia "Browsersync"

var browserSync = require('browser-sync').create();

gulp.task("sass-watch",["sass"], function(done){
	browserSync.reload();
	done();
});

gulp.task("js-watch",["js"], function(done){
	browserSync.reload();
	done();
});
gulp.task("html-watch",["html"], function(done){
	browserSync.reload();
	done();
}); 

//TAREA : hará el watch de todo el directorio 'src' y ejecutará todas las tareas anteriores para que compile todo y actualice

gulp.task("serve",function(){
	browserSync.init({
		server: {
			baseDir: config.dist
		}
	});
	gulp.watch(sources.html, ["html-watch"]);
	gulp.watch(sources.sass, ["sass-watch"]);
	gulp.watch(sources.js, ["js-watch"]);
});