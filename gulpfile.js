const {src, dest, watch, series} = require('gulp')
const concat = require('gulp-concat')
const htmlmin = require('gulp-htmlmin')
const minCSS = require('gulp-clean-css')
const sass = require('gulp-sass')(require('sass'))
const autoPref = require('gulp-autoprefixer')
const svgSprite = require('gulp-svg-sprite')
const imageMin = require('gulp-imagemin')
const babel = require('gulp-babel')
const uglify = require('gulp-uglify')
const rename = require("gulp-rename")
const notify = require('gulp-notify')
const sourcemap = require('gulp-sourcemaps')
const del = require('del')
const browserSync = require('browser-sync').create()



const clean = () => {
  return del('dist/**')
}

const libraries = () => {
  return src('src/resource/**')
    .pipe(dest('dist/resource'))
}

const htmlMinify = () => {
  return src('src/**/*.html')
    .pipe(htmlmin({ collapseWhitespace: true }))
    .pipe(dest('dist'))
    .pipe(browserSync.stream())
}

const style = () => {
  return src([
    'src/style/css_libs/**/*',
    `src/style/style.scss`
    ])
    .pipe(sourcemap.init())
    .pipe(sass())
    .pipe(concat('style.css'))
    .pipe(autoPref())
    .pipe(minCSS())
    .pipe(sourcemap.write())
    .pipe(rename({
      suffix: '.min'
    }))
    .pipe(dest('dist'))
    .pipe(browserSync.stream())
}

const sprite = () => {
  return src('src/images/svg/**/*.svg')
    .pipe(svgSprite({
      mode: {
        stack: {
          sprite: '../sprite.svg'
        }
      }
    }))
    .pipe(dest('dist/images'))
}

const images = () => {
  return src([
    'src/images/**/*.png',
    'src/images/**/*.jpg',
    'src/images/**/*.webp',
    'src/images/**/*.jpeg',
    'src/images/*.svg'
  ])
  .pipe(imageMin())
  .pipe(dest('dist/images'))
}

const scripts = () => {
  return src([
    'src/js/components/**/*.js',
    'src/js/index.js',
  ])
    .pipe(sourcemap.init())
    .pipe(babel({
      presets: ['@babel/env']
    }))
    .pipe(concat('app.js'))
    .pipe(uglify({toplevel: true }).on('error', notify.onError()))
    .pipe(rename({
      suffix: '.min'
    }))
    .pipe(sourcemap.write())
    .pipe(dest('dist'))
}

const buildJs = () => {
  return src('dist/app.min.js')
    .pipe(uglify())
    .pipe(dest('dist'))
}

const buildCss = () => {
  return src(`dist/style.min.css`)
    .pipe(minCSS({level: { 1: { specialComments: 0 } } }))
    .pipe(dest('dist'))
}

const watchFiles = () => {
  browserSync.init({
    server: {
      baseDir: 'dist'
    }
  })
}

watch('src/**/*.html', htmlMinify)
watch('src/style/**/*.*', style)
watch('src/images/svg/**/*.svg', sprite)
watch('src/js/**/*.js', scripts)
watch('src/images/**/*.{jpg,jpeg,png,webp,svg,gif}', images)


exports.style = style

exports.dev = series(clean, libraries, htmlMinify, scripts, style, images, sprite, watchFiles)
exports.build = series(clean, libraries, htmlMinify, scripts, style, buildCss, buildJs, images, sprite)
