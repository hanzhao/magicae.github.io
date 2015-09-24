import gulp from 'gulp';
import gulpif from 'gulp-if';
import sass from 'gulp-sass';
import rename from 'gulp-rename';
import uglify from 'gulp-uglify';
import concat from 'gulp-concat';
import minifyCSS from 'gulp-minify-css';
import fs from 'fs';
import del from 'del';
import webpack from 'webpack-stream';

const isProduction = (process.env.NODE_ENV === 'production');

const webpackConfig = {
  output: {
    filename: 'bundle.js'
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        query: {
          optional: ['runtime'],
          stage: 0
        }
      }
    ]
  }
};

gulp.task('clean-script', () => {
  return del([
    './assets/js'
  ]);
});

gulp.task('clean-style', () => {
  return del([
    './assets/css'
  ]);
});

gulp.task('clean-font', () => {
  return del([
    './assets/fonts'
  ]);
});

gulp.task('data', () => {
  function getDirectory(cwd) {
    let res = {};
    for (let filename of fs.readdirSync(`${__dirname}${cwd}`)) {
      if (cwd == '/pages' && filename == 'index.js')
        continue;
      let file = `${__dirname}${cwd}/${filename}`;
      let stats = fs.statSync(file);
      if (stats.isDirectory()) {
        res[filename] = getDirectory(`${cwd}/${filename}`);
      } else {
        res[filename] = true;
      }
    }
    return res;
  }
  let res = {pages: getDirectory('/pages')};
  fs.writeFileSync(`${__dirname}/pages/index.js`,
                   `export default ${JSON.stringify(res, null, 2)};`);
});

gulp.task('script', ['clean-script', 'data'], () => {
  return gulp.src('app/scripts/index.js')
             .pipe(webpack(webpackConfig))
             .pipe(gulpif(isProduction, uglify()))
             .pipe(gulp.dest('assets/js'));
});

gulp.task('scss', () => {
  return gulp.src('app/styles/index.scss')
             .pipe(sass())
             .pipe(rename('all.css'))
             .pipe(gulp.dest('/tmp'));
});

gulp.task('style', ['clean-style', 'scss'], () => {
  return gulp.src(['./node_modules/amazeui/dist/css/amazeui.css',
                   './node_modules/highlight.js/styles/monokai_sublime.css',
                   '/tmp/all.css'])
             .pipe(concat('bundle.css'))
             .pipe(gulpif(isProduction, minifyCSS()))
             .pipe(gulp.dest('assets/css'));
});

gulp.task('font', ['clean-font'], () => {
  return gulp.src(['node_modules/amazeui/dist/fonts/*'])
             .pipe(gulp.dest('assets/fonts'));
});

gulp.task('compile', ['script', 'style', 'font']);

gulp.task('default', [
  'compile'
]);
