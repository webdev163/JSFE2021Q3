const gulp = require('gulp');
const fs = require('fs');
const postcss = require('gulp-postcss');
const postcssCsso = require('postcss-csso');
const del = require('del');
const imagemin = require('gulp-imagemin');
const svgSprite = require('gulp-svg-sprite');
const gulpif = require('gulp-if');
const pngquant = require('imagemin-pngquant');
const imageminWebp = require('imagemin-webp');
const extReplace = require('gulp-ext-replace');
const ttf2woff = require('gulp-ttf2woff');
const ttf2woff2 = require('gulp-ttf2woff2');
const fonter = require('gulp-fonter');
const rename = require('gulp-rename');
const webpackModule = require('webpack');
const changed = require('gulp-changed');
const debug = require('gulp-debug');
const webpackDevServer = require('webpack-dev-server');
const path = require('path');

const isProd = process.env.NODE_ENV === 'production';
const isDev = !isProd;
const dirname = require('path').basename(__dirname);

const webpackConfig = require('./webpack.config');

const srcdir = './src/';
const distdir = './build/';
const paths = {
  src: {
    base: srcdir,
    html: srcdir + 'views/',
    components: srcdir + 'components/',
    scss: srcdir + 'scss/',
    scss_libs: srcdir + 'scss/libs/',
    js: srcdir + 'js/',
    js_libs: srcdir + 'js/libs/',
    icons: srcdir + 'icons/',
    fonts: srcdir + 'fonts/',
    img: srcdir + 'img/',
    img_inline: srcdir + 'img/_inline/',
    img_copy: srcdir + 'img/_copy/',
    html_includes: srcdir + 'views/includes/',
    static: srcdir + 'static/',
    other: srcdir + 'other/',
  },
  dist: {
    base: distdir,
    html: distdir,
    css: distdir + 'css/',
    js: distdir + 'js/',
    icons: distdir + 'icons/',
    fonts: distdir + 'fonts/',
    img: distdir + 'img/',
    static: distdir,
    other: distdir + 'files/',
  },
};

const clean = () => {
  if (isProd) {
    del(paths.src.img_copy + '**/*.webp');
  }
  return del([paths.dist.base + '**/*', '!' + paths.dist.base + '.git/']);
};

exports.clean = clean;

const webpack = (done) => {
  webpackModule(webpackConfig, (err, stats) => {
    if (err) {
      console.error(err.stack || err);
      if (err.details) {
        console.error(err.details);
      }
      done();
      return;
    }
    const info = stats.toJson();
    if (stats.hasErrors()) {
      console.error(info.errors);
    }
    if (stats.hasWarnings()) {
      console.warn(info.warnings);
    }
    console.log(stats.toString({
      colors: true,
      errors: true,
      warnings: true,
    })),
    done();
  });
};

exports.webpack = webpack;

const fonts = () => {
  gulp.src(paths.src.fonts + '**/*.+(otf|eot)')
    .pipe(fonter({ formats: ['ttf'] }))
    .pipe(gulp.dest(paths.src.fonts));
  gulp.src(paths.src.fonts + '**/*.ttf')
    .pipe(ttf2woff())
    .pipe(gulp.dest(paths.src.fonts));
  return gulp.src(paths.src.fonts + '**/*.ttf')
    .pipe(ttf2woff2())
    .pipe(gulp.dest(paths.src.fonts));
};

exports.fonts = fonts;

const icons = (args) => {
  return new Promise((resolve) => {
    const defaults = { svg: true, png: true };
    const params = { ...defaults, ...args };
    if (params.svg) {
      gulp.src([paths.src.icons + '**/*.svg', '!' + paths.src.icons + 'sprite.*'])
        .pipe(imagemin([imagemin.svgo(
          { plugins: [{ removeXMLNS: true }] },
        )]))
        .pipe(svgSprite({ mode: { symbol: { sprite: '../sprite.svg', example: { dest: '../_sprite-preview.html' } } } }))
        .pipe(gulp.dest(paths.src.icons));
    }
    if (params.png) {}
    resolve();
  });
};

exports.icons = icons;

const images = (args) => {
  const defaults = isProd ? { img: true, webp: true, svg: true } : { img: true, webp: false, svg: true };
  const params = { ...defaults, ...args };
  return new Promise((resolve) => {
    if (params.img) {
      gulp.src([paths.src.img + '**/*.+(jpg|jpeg|png|gif)', '!' + paths.src.img_inline + '**/*', '!' + paths.src.img_copy + '**/*'])
        .pipe(gulpif(isProd, imagemin([
          imagemin.gifsicle({ interlaced: true }),
          imagemin.mozjpeg({ quality: 75, progressive: true }),
          pngquant({ quality: [0.5, 0.6], speed: 3 }),
          imagemin.optipng({ optimizationLevel: 3 }),
        ])))
        .pipe(gulp.dest(paths.dist.img))
        .on('end', resolve);
    } else { resolve(); }
  }).then(() => {
    return new Promise((resolve) => {
      if (false || params.webp) {
        gulp.src([paths.src.img + '**/*.+(jpg|jpeg|png)', '!' + paths.src.img_inline + '**/*', '!' + paths.src.img_copy + '**/*', paths.src.img_copy + '**/*+(jpg|jpeg|png)'])
          .pipe(changed(paths.src.img_copy, { extension: '.webp' }))
          .pipe(imagemin([imageminWebp()]))
          .pipe(extReplace('.webp'))
          .pipe(gulp.dest(paths.src.img_copy))
          .on('end', resolve);
      } else { resolve(); }
    }).then(() => {
      return new Promise((resolve) => {
        if (params.svg) {
          gulp.src([paths.src.img + '**/*.svg', '!' + paths.src.img_inline + '**/*', '!' + paths.src.img_copy + '**/*'])
            .pipe(imagemin([imagemin.svgo()]))
            .pipe(gulp.dest(paths.dist.img))
            .on('end', resolve);
        } else { resolve(); }
      });
    });
  });
};

exports.images = images;

const inline = () => {
  return gulp.src([paths.src.img_inline + '**/*', '!' + paths.src.img_inline + '**/*.min.*'])
    .pipe(imagemin([imagemin.gifsicle({ interlaced: true }), imagemin.mozjpeg({ quality: 75, progressive: true }), pngquant({ quality: [0.6, 0.8], speed: 3 }), imagemin.optipng({ optimizationLevel: 3 }), imagemin.svgo()]))
    .pipe(rename({ suffix: '.min' }))
    .pipe(gulp.dest(paths.src.img_inline));
};

exports.inline = inline;

const copy = () => {
  return new Promise((resolve) => {
    gulp.src([paths.src.static + '**/*.*', paths.src.static + '**/.*'])
      .pipe(gulp.dest(paths.dist.static));
    gulp.src(paths.src.img_copy + '**/*.*')
      .pipe(gulp.dest(paths.dist.img));
    gulp.src(paths.src.other + '**/*.*')
      .pipe(gulp.dest(paths.dist.other));
    gulp.src(paths.src.fonts + '**/*.+(woff|woff2)')
      .pipe(gulp.dest(paths.dist.fonts));
    gulp.src(paths.src.icons + '*sprite.svg')
      .pipe(gulp.dest(paths.dist.icons))
      .on('end', resolve);
  });
};

exports.copy = copy;

const watch = async () => {
  gulp.watch([paths.src.img + '**/*.+(jpg|jpeg|png|gif)', '!' + paths.src.img_inline + '**/*', '!' + paths.src.img_copy + '**/*'], { events: ['add'] }, imgUpdate = () => images({ svg: false, webp: true }));
  gulp.watch(paths.src.img_copy + '**/*+(jpg|jpeg|png|gif)', { events: ['add'] }, imgUpdate = () => images({ img: false, svg: false, webp: true }));
  gulp.watch([paths.src.img + '**/*.svg', '!' + paths.src.img_inline + '**/*', '!' + paths.src.img_copy + '**/*'], imgUpdate = () => images({ img: false }));
  gulp.watch(paths.src.icons + '*sprite.svg', gulp.parallel('copy'));
  gulp.watch(paths.src.fonts + '**/*.ttf', gulp.series('fonts', 'copy'));
  gulp.watch([paths.src.img_copy + '**/*.*', '!' + paths.src.img_copy + '**/*.*+(jpg|jpeg|png|gif)'], { events: ['add'] }, gulp.parallel('copy'));
  gulp.watch([paths.src.img_inline + '**/*', '!' + paths.src.img_inline + '**/*.min.*'], { events: ['add'] }, gulp.parallel('inline'));
  gulp.watch([paths.src.icons + '**/*.svg', '!' + paths.src.icons + 'sprite.svg'], gulp.parallel(iconsUpdate = () => icons({ png: false })));
  gulp.watch([paths.src.static + '**/*', paths.src.static + '**/.*', paths.src.other + '**/*'], gulp.parallel('copy'));
  gulp.watch(paths.src.scss + '**/_*.+(scss|sass|css)', { events: ['add'] }, (done) => {
    file = paths.src.scss + 'style.scss';
    fs.readFile(file, 'utf8', (err, data) => {
      fs.writeFile(file, data, 'utf8', (error) => {
        if (error) { return console.log(error); }
      });
    });
    done();
  });
};

exports.watch = watch;

// gulp newcomp --a {name}
const newcomp = (done) => {
  fs.mkdir((paths.src.components + `${process.argv[4]}/`), (err) => {
    if (err) {
      throw err;
    }
  }),
  fs.writeFile((paths.src.components + `${process.argv[4]}/${process.argv[4]}.html`), '', (err) => {
    if (err) {
      throw err;
    }
  }),
  fs.writeFile((paths.src.components + `${process.argv[4]}/${process.argv[4]}.scss`), '', (err) => {
    if (err) {
      throw err;
    }
  }),
  fs.writeFile((paths.src.components + `${process.argv[4]}/${process.argv[4]}.js`), '', (err) => {
    if (err) {
      throw err;
    }
  }),
  fs.appendFile(paths.src.scss + 'style.scss', (`@import '../components/${process.argv[4]}/${process.argv[4]}';\n`), (err) => {
    if (err) {
      throw err;
    }
  });
  fs.appendFile(paths.src.js + 'index.js', (`import '../components/${process.argv[4]}/${process.argv[4]}';\n`), (err) => {
    if (err) {
      throw err;
    }
  });
  done();
};

exports.newcomp = newcomp;

const csso = () => {
  return gulp.src(paths.dist.css + '**/*.css')
    .pipe(postcss([postcssCsso({ restructure: false, forceMediaMerge: true, comments: false })]))
    .pipe(gulp.dest(paths.dist.css));
};

exports.csso = csso;

const wds = async () => {
  const options = {
    // onBeforeSetupMiddleware(wdsServer) {
    //   gulp.watch([
    //     watchFiles,
    //   ]).on('all', () => {
    //     wdsServer.sendMessage(wdsServer.webSocketServer.clients, 'content-changed');
    //   });
    // },
    watchFiles: ['./src/views/**/*.html'],
    static: {
      directory: path.join(__dirname, './build'),
    },
    host: '0.0.0.0',
    historyApiFallback: true,
    hot: true,
    compress: true,
    open: 'http://localhost:8080',
    client: {
      overlay: {
        warnings: true,
        errors: true,
      },
      logging: 'error',
    },
  };
  const compiler = webpackModule({
    ...webpackConfig, stats: {
      assets: false,
      entrypoints: false,
      modules: false,
    },
  });
  const devServer = new webpackDevServer(options, compiler);
  devServer.startCallback(() => {
    console.log('Successfully started server on http://localhost:8080');
  });
};

exports.wds = wds;

exports.default = gulp.series(
  clean,
  images,
  copy,
  gulp.parallel(
    watch,
    wds,
  ),
);

exports.build = gulp.series(
  clean,
  gulp.parallel(
    webpack,
    images,
  ),
  csso,
  copy,
);
