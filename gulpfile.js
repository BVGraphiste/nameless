// Plugins
// --------------------------------------------
// --------------------------------------------
var gulp           = require("gulp"),                // Gulp
    plugins        = require('gulp-load-plugins')(); // Tous les plugins de package.json

// Variables
// --------------------------------------------
// --------------------------------------------
var	src            = "src";
var	dist           = "dist";
var	assetSrc       = src + "/asset";
var	assetDist      = dist + "/asset";

// Tâches CSS
// --------------------------------------------
// --------------------------------------------
var cssSrc  = assetSrc + '/css';
var cssDist = assetDist + '/css';

gulp.task('concatCSS', function() {
  return gulp
		.src(cssSrc + '/*.scss')
		.pipe(plugins.plumber({ errorHandler: function (err) { console.log(err); this.emit('end'); }}))
		.pipe(plugins.sass())
		.pipe(plugins.autoprefixer('last 10 version', 'ie 6-9'))
		.pipe(gulp.dest(cssDist))
});

gulp.task('minifyCSS', function() {
  return gulp
		.src(cssSrc + '/*.scss')
		.pipe(plugins.plumber({ errorHandler: function (err) { console.log(err); this.emit('end'); }}))
		.pipe(plugins.sass())
		.pipe(plugins.autoprefixer('last 10 version', 'ie 6-9'))
		.pipe(plugins.cssnano())
		.pipe(gulp.dest(cssDist))
});


// Tâches JS
// --------------------------------------------
// --------------------------------------------
var jsSrc  = assetSrc + '/js';
var jsDist = assetDist + '/js';

gulp.task('concatJS', function() {
  return gulp
		.src([jsSrc + '/jquery.js', jsSrc + '/jquery-ui.js', jsSrc + '/jquery.*/*.js', jsSrc + '/utility.js'])
    .pipe(plugins.concat('script.js'))
		.pipe(gulp.dest(jsDist))
});

gulp.task('minifyJS', function() {
  return gulp
		.src([jsSrc + '/jquery.js', jsSrc + '/jquery-ui.js', jsSrc + '/jquery.*/*.js', jsSrc + '/utility.js'])
    .pipe(plugins.uglify())
    .pipe(plugins.concat('script.js'))
		.pipe(gulp.dest(jsDist))
});


// Tâches Image (Minification)
// --------------------------------------------
// --------------------------------------------
var imgSrc  = assetSrc + '/img';
var imgDist = assetDist + '/img';

gulp.task('minifyImg', function() {
  return gulp.src(src + '/asset/img/**/*.{png,jpg,jpeg,gif,svg}')
    .pipe(plugins.imagemin())
    .pipe(gulp.dest(dist + '/asset/img'));
});


// Synchronisation de fichiers
// --------------------------------------------
// --------------------------------------------
gulp.task('syncFonts', function() {
  gulp
		.src(assetSrc + '/fonts/**/**/*')
		.pipe(gulp.dest(assetDist + '/fonts'))
});

gulp.task('syncHTML', function() {
  gulp
		.src([src + '/*.html', src + '/**/*.html'])
		.pipe(gulp.dest(dist))
});

gulp.task('syncUploads', function() {
  gulp
		.src([src + '/uploads'])
		.pipe(gulp.dest(dist))
});


// Favicon
// --------------------------------------------
// --------------------------------------------
var faviconSrc  = assetSrc + '/favicon';
var faviconDist = dist + '/favicon';

var fs = require('fs');
var FAVICON_DATA_FILE = faviconSrc + '/faviconfile.json';
// File where the favicon markups are stored

// Generate the icons. This task takes a few seconds to complete.
gulp.task('faviconGenerate', function(done) {
	plugins.realFavicon.generateFavicon({
		masterPicture: faviconSrc + '/favicon.svg',
		dest: dist,
		iconsPath: '/favicon',
		design: {
			ios: {
				pictureAspect: 'backgroundAndMargin',
				backgroundColor: '#000000',
				margin: '7%'
			},
			desktopBrowser: {},
			windows: {
				pictureAspect: 'noChange',
				backgroundColor: '#000000',
				onConflict: 'override'
			},
			androidChrome: {
				pictureAspect: 'shadow',
				themeColor: '#ffffff',
				manifest: {
					name: 'Nameless',
					display: 'browser',
					orientation: 'notSet',
					onConflict: 'override'
				}
			},
			safariPinnedTab: {
				pictureAspect: 'silhouette',
				themeColor: '#000000'
			}
		},
		settings: {
			compression: 5,
			scalingAlgorithm: 'Mitchell',
			errorOnImageTooSmall: false
		},
		markupFile: FAVICON_DATA_FILE
	}, function() {
		done();
	});
});

gulp.task('faviconInject', function() {
	gulp
		.src([dist + '**/**/*.html'])
		.pipe(plugins.realFavicon.injectFaviconMarkups(JSON.parse(fs.readFileSync(FAVICON_DATA_FILE)).favicon.html_code))
		.pipe(gulp.dest(''));
});


// WATCH TASK
// --------------------------------------------
// --------------------------------------------
gulp.task('watch', function() {
  gulp.watch(assetSrc + '/fonts/**/*', ['syncFonts']);
  gulp.watch(src + '/**/*.html', ['syncHTML']);
  gulp.watch(src + '/uploads/*', ['syncUploads']);
	
  gulp.watch(assetSrc + '/css/**/*.scss', ['concatCSS']);
  gulp.watch(assetSrc + '/js/**/*.js', ['concatJS']);
	
  gulp.watch(assetSrc + '/img/**/*', ['minifyImg']);
  gulp.watch(assetSrc + '/favicon/*', ['faviconGenerate']);
});

gulp.task('default', ['watch']);

gulp.task('prod', ['syncHTML', 'syncFonts', 'concatCSS', 'minifyJS', 'syncUploads', 'minifyImg']);