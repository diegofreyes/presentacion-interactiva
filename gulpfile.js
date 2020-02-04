/* Modulos gulp */
var gulp = require('gulp'),
    sass = require('gulp-sass'),
    uglify = require( 'gulp-uglify' ),
    concat = require( 'gulp-concat' ),
    cssnano = require( 'gulp-cssnano'),
    gutil = require( 'gulp-util' ),
    imagemin = require( 'gulp-imagemin' );

// Ruta de node modules
var nodepath = './node_modules';
// Objeto de rutas de recursos
var sourcepath = {
    sass: './src/sass',
    css: './src/css',
    js: './src/js',
    fonts: './src/fonts',
    img: './src/img',
    media: '/src/media'
}
// Objeto de rutas de build
var buildpath = {
    css: './assets/css/',
    js: './assets/js/',
    fonts: './assets/fonts/',
    img: './assets/img/',
    media: './assets/media/'
}

// Copiar las fuentes a la carpeta assets/fonts
// gulp fonts
gulp.task('fonts', function(){
    gulp.src([
        sourcepath.fonts + '/**/*'
    ])
    .pipe( gulp.dest( buildpath.fonts ) );
});

// Copiar a la carpeta assets/img
// gulp img
gulp.task('img', function(){
    gulp.src([
        sourcepath.img + '/**/*'
    ])
    .pipe( gulp.dest( buildpath.img ) );
});

// Compilar los .scss y concatenarlos con .css
// gulp sass
gulp.task('sass', function(){
    gulp.src([
        sourcepath.css + '/*.css',
        sourcepath.sass + '/main.scss'
    ])
    .pipe( sass() )
    .pipe( concat( 'style.css' ) )
    .pipe( gulp.dest( buildpath.css + '/' ) );
});

gulp.task('js', function(){
    gulp.src([
        // Node modules .js
        sourcepath.js + '/*.js'
    ])
    .pipe(concat( 'scripts.js' ))
    .pipe(gulp.dest( buildpath.js + '/' ));
});

gulp.task('watch', function(){
    gulp.watch( sourcepath.sass + '/**/*.scss', ['sass','img']);
    gulp.watch( sourcepath.js + '/*.js', ['js','img']);
});

gulp.task('dev watch', ['sass','js','fonts','img','watch']);
gulp.task('dev', ['sass','js','fonts','img']);