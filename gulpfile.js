var gulp = require('gulp'),
    connect = require('gulp-connect'),
    sass = require('gulp-sass'),
    autoprefixer = require('gulp-autoprefixer'),
    minifyCSS = require('gulp-clean-css'),
    uglify = require('gulp-uglify'),
    minify = require('gulp-minify'),
    concat = require('gulp-concat');


var startFolder = 'src/',
    finishFolder = 'dist/';


gulp.task('connect', function() {
    connect.server({
        root: finishFolder,
        port: 8080,
        livereload: true,
        livereloadPort: 3000,
        middleware: function(connect) {
            return [connect().use("/bower_components", connect.static("bower_components"))];
        }
    });
});

gulp.task('html', function() {
    gulp.src(startFolder + '**.html')
        .pipe(gulp.dest(finishFolder))
        .pipe(connect.reload());
});

gulp.task('sass', ['bower_styles'], function() {
    return gulp.src(startFolder + 'css/scss/all.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(autoprefixer({
            browsers: ['last 20 versions'],
            cascade: false
        }))
        .pipe(concat('style.css'))
        .pipe(minifyCSS({ compatibility: 'ie8' }))
        .pipe(gulp.dest(finishFolder + 'css/'))
        .pipe(connect.reload());
});
gulp.task('bower_styles', function() {
    gulp.src([
            // here would be libs css files
            'bower_components/css-reset-and-normalize-sass/css/flavored-reset-and-normalize.css',
            'bower_components/fancybox/dist/jquery.fancybox.css',
            'bower_components/bxslider-4/dist/jquery.bxslider.css'
        ])
        .pipe(concat('bower_components.css'))
        .pipe(minifyCSS({ compatibility: 'ie8' }))
        .pipe(gulp.dest(finishFolder + 'css/'));
});

gulp.task('images', function() {
    gulp.src(startFolder + 'images/**/*')
        .pipe(gulp.dest(finishFolder + 'images/'));
});

gulp.task('fonts', function() {
    gulp.src(startFolder + 'fonts/**/*')
        .pipe(gulp.dest(finishFolder + 'fonts/'));
});

gulp.task('js', function() {
    gulp.src([
            startFolder + 'js/**.js',
        ])
        .pipe(concat('app.js'))
        // .pipe(minify())
        // .pipe(uglify())
        .pipe(gulp.dest(finishFolder + 'js/'))
        .pipe(connect.reload());

    gulp.src([
            // here would be libs js files			
            'bower_components/jquery/dist/jquery.min.js',
            'bower_components/fancybox/dist/jquery.fancybox.min.js',
            'bower_components/bxslider-4/dist/jquery.bxslider.min.js'
        ])
        .pipe(concat('bower_components.js'))
        // .pipe(minify())
        // .pipe(uglify())
        .pipe(gulp.dest(finishFolder + 'js'));
});

gulp.task('watch', function() {
    gulp.watch(startFolder + '**.html', ['html']);
    gulp.watch(startFolder + '**/**/**.js', ['js']);
    gulp.watch(startFolder + 'css/**/**.*', ['sass']);
});

gulp.task('build', ['html', 'fonts', 'images', 'sass', 'js'], function() {

});
gulp.task('default', ['connect', 'watch', 'build']);
