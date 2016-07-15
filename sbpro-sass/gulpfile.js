var gulp = require('gulp');
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
var fileinclude = require('gulp-file-include');
var sourcemaps = require('gulp-sourcemaps');
var notify = require('gulp-notify');
var bs = require('browser-sync').create();

var target = {
	sassSrc       : 'src/sass/**/*.sass',
	sassWww       : 'www/app/css/',
	jsSrc         : 'src/js/**/*.js',
	jsWww         : 'www/app/js/',
	htmlSrc       : 'src/html/pages/*.html',
	htmlWww       : 'www/',
	htmlWatchSrc  : 'src/html/**/*.html',
	fontsSrc      : 'src/fonts/*',
	fontsWww      : 'www/app/fonts/',
	imgSrc        : 'src/img/**/*',
	imgWww        : 'www/app/img/'
};

gulp.task('sass', function () {
	gulp.src(target.sassSrc)
		.pipe(sourcemaps.init())
		.pipe(sass().on('error', sass.logError))
		.pipe(sourcemaps.write())
		.pipe(autoprefixer({
			browsers: ['last 10 versions'],
			cascade: true
		}))
		.pipe(gulp.dest(target.sassWww))
		.pipe(bs.stream())
		.pipe(notify({message: 'SASS processed!'}));
});

gulp.task('html', function () {
	gulp.src(target.htmlSrc)
		.pipe(fileinclude({
			prefix: '@@',
			basepath: '@file'
	  	}))
		.pipe(gulp.dest(target.htmlWww))
		.pipe(bs.stream())
		.pipe(notify({message: 'HTML processed!'}));
});

gulp.task('js', function () {
	gulp.src(target.jsSrc)
		.pipe(gulp.dest(target.jsWww))
		.pipe(bs.stream())
		.pipe(notify({message: 'JS processed!'}));
});

gulp.task('fonts', function () {
	gulp.src(target.fontsSrc)
		.pipe(gulp.dest(target.fontsWww))
		.pipe(bs.stream())
		.pipe(notify({message: 'FONTS processed!'}));
});

gulp.task('img', function () {
	gulp.src(target.imgSrc)
		.pipe(gulp.dest(target.imgWww))
		.pipe(bs.stream())
		.pipe(notify({message: 'IMG processed!'}));
});

gulp.task('bs', function() {
	bs.init({
		server: {
			baseDir: "www/"
		}
	});
	gulp.watch(target.sassSrc, ['sass']);
	gulp.watch(target.htmlSrc, ['html']);
	gulp.watch(target.htmlWatchSrc, ['html']);
	gulp.watch(target.jsSrc, ['js']);
	gulp.watch(target.fontsSrc, ['fonts']);
	gulp.watch(target.imgSrc, ['img']);
});

gulp.task('default', function() {
    gulp.run('sass', 'html', 'js', 'fonts', 'img', 'bs');
});
