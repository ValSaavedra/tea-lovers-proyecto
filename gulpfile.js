var gulp = require('gulp');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var sass = require('gulp-sass');
var minifyCSS = require('gulp-minify-css');
var webserver = require('gulp-webserver');

//concatena los js y los convierte en script, guardados en dist
gulp.task('script', function(){
	gulp.src(['node_modules/jquery/dist/jquery.js', 'node_modules/materialize-css/dist/js/materialize.js', 'assets/js/*.js'])
	.pipe(concat('script.js'))
	.pipe(gulp.dest('dist/js/'));
});

gulp.task('style', function(){
	gulp.src(['node_modules/materialize-css/dist/css/materialize.css', 'assets/sass/main.scss'])
	.pipe(sass().on('error', sass.logError))
	.pipe(minifyCSS())
	.pipe(concat('style.min.css'))
	.pipe(gulp.dest('dist/css/'));
});

//webserver crea un servidor web de desarrollo q se ejecuta en el puerto local 8000
gulp.task('webserver', function(){
	gulp.src('../tea-lovers-final/')
	.pipe(webserver({
		fallback: 'index.html',
		livereload: true,
		directoryListing: false,
		open: true
	}));
});

/*------ Watch SASS ------*/
gulp.task('watch', function(){
	gulp.watch('assets/sass/*.scss',['style']);
});

//Aqui se le indica a gulp cuales son las tareas que debera ejecutar al hacer correr el comando gulp
gulp.task('default', ['script', 'style', 'webserver', 'watch']);

