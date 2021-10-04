const gulp = require('gulp');
const fs = require('fs');
const postcss = require('gulp-postcss');
const postcssCsso = require('postcss-csso');
const del = require('del');
const browserSync = require('browser-sync').create();
const imagemin = require('gulp-imagemin');
const svgSprite = require('gulp-svg-sprite');
const gulpif = require('gulp-if');
const pngquant = require('imagemin-pngquant');
const imageminWebp = require('imagemin-webp');
const extReplace = require('gulp-ext-replace');
const gulpStylelint = require('gulp-stylelint');
const eslint = require('gulp-eslint');
const ttf2woff = require('gulp-ttf2woff');
const ttf2woff2 = require('gulp-ttf2woff2');
const fonter = require('gulp-fonter');
const rename = require('gulp-rename');
const webpackModule = require('webpack');
const rev = require('gulp-rev');
const revRewrite = require('gulp-rev-rewrite');
const revdel = require('gulp-rev-delete-original');
const replace = require('gulp-replace');
const htmlmin = require('gulp-html-minifier-terser');
const changed = require('gulp-changed');
const notifier = require('node-notifier');
const webpackDevServer = require('webpack-dev-server');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');
const ejs = require('gulp-ejs');
const path = require('path');

const isProd = process.env.NODE_ENV === 'production';
const isDev = !isProd;

const webpackConfig = require('./webpack.config');

const srcdir = './src/';
const distdir = './build/';
const paths = {
  src: {
    base: srcdir,
    html: srcdir + 'views/',
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
    icons: distdir + 'assets/icons/',
    fonts: distdir + 'assets/fonts/',
    img: distdir + 'assets/img/',
    static: distdir + 'assets/',
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

const server = () => {
  const bundler = webpackModule(webpackConfig);
  const bundlerOptions = {
    publicPath: webpackConfig.output.publicPath,
    stats: 'errors-warnings',
    writeToDisk: false,
  };
  browserSync.init({
    server: {
      baseDir: paths.dist.base,
      middleware: [
        webpackDevMiddleware(bundler, bundlerOptions),
        webpackHotMiddleware(bundler),
      ],
    },
  });
};

exports.server = server;

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

const html = () => {
  return gulp.src([paths.src.html + '**/[^_]*.+(html|ejs)', '!' + paths.src.html_includes + '**/*'])
    .pipe(ejs({}).on('error', function (err) { notifier.notify({ title: 'EJS Error', message: err.message, wait: false }); console.error(err); this.emit('end'); }))
    .pipe(extReplace('.html'))
    .pipe(gulpif(isProd, replace(/.*linthtml.*/g, '')))
    .pipe(gulpif(isProd, htmlmin({ collapseWhitespace: true, removeComments: true })))
    .pipe(gulp.dest(paths.dist.base))
    .on('end', browserSync.reload);
};

exports.html = html;

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
    } else resolve();
  }).then(() => {
    return new Promise((resolve) => {
      if (params.webp) {
        gulp.src([paths.src.img + '**/*.+(jpg|jpeg|png|gif)', '!' + paths.src.img_inline + '**/*', '!' + paths.src.img_copy + '**/*', paths.src.img_copy + '**/*+(jpg|jpeg|png|gif)'])
          .pipe(changed(paths.src.img_copy, { extension: '.webp' }))
          .pipe(imagemin([imageminWebp()]))
          .pipe(extReplace('.webp'))
          .pipe(gulp.dest(paths.src.img_copy))
          .on('end', resolve);
      } else resolve();
    }).then(() => {
      return new Promise((resolve) => {
        if (params.svg) {
          gulp.src([paths.src.img + '**/*.svg', '!' + paths.src.img_inline + '**/*', '!' + paths.src.img_copy + '**/*'])
            .pipe(imagemin([imagemin.svgo()]))
            .pipe(gulp.dest(paths.dist.img))
            .on('end', resolve);
        } else resolve();
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
    gulp.src(paths.src.other + '**/*.*')
      .pipe(gulp.dest(paths.dist.other));
    gulp.src(paths.src.img_copy + '**/*.*')
      .pipe(gulp.dest(paths.dist.img));
    gulp.src(paths.src.fonts + '**/*.+(woff|woff2)')
      .pipe(gulp.dest(paths.dist.fonts));
    gulp.src([paths.src.icons + '*sprite.png', paths.src.icons + '*sprite.svg'])
      .pipe(gulpif(isProd, imagemin([
        imagemin.mozjpeg({ quality: 75, progressive: true }),
        pngquant({ quality: [0.6, 0.8], speed: 3 }),
        imagemin.optipng({ optimizationLevel: 3 }),
      ])))
      .pipe(gulp.dest(paths.dist.icons))
      .on('end', resolve);
  });
};

exports.copy = copy;

const watch = () => {
  gulp.watch([paths.src.html + '**/*.+(html|ejs)'], gulp.parallel('html'));
  gulp.watch([paths.src.img + '**/*.+(jpg|jpeg|png|gif)', '!' + paths.src.img_inline + '**/*', '!' + paths.src.img_copy + '**/*'], { events: ['add'] }, imgUpdate = () => images({ svg: false, webp: true }));
  gulp.watch(paths.src.img_copy + '**/*+(jpg|jpeg|png|gif)', { events: ['add'] }, imgUpdate = () => images({ img: false, svg: false, webp: true }));
  gulp.watch([paths.src.img + '**/*.svg', '!' + paths.src.img_inline + '**/*', '!' + paths.src.img_copy + '**/*'], imgUpdate = () => images({ img: false }));
  gulp.watch([paths.src.icons + '*sprite.png', paths.src.icons + '*sprite.svg'], gulp.parallel('copy'));
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

const cache = () => {
  return new Promise((resolve) => {
    // gulp.src([paths.dist.icons + '**/*sprite*.*', paths.dist.img + '**/*.{jpg,jpeg,png,gif,webp,svg,avif}', paths.dist.fonts + '**/*.{woff,woff2}', '!' + paths.dist.base + '**/*.{css,js,map,json,html}'], { base: paths.dist.base })
    gulp.src([paths.dist.icons + '**/*sprite*.*', '!' + paths.dist.base + '**/*.{css,js,map,json,html}'], { base: paths.dist.base })
      .pipe(rev())
      .pipe(revdel())
      .pipe(gulp.dest(paths.dist.base))
      .pipe(rev.manifest())
      .pipe(gulp.dest('./utils/'))
      .on('end', resolve);
  }).then(() => {
    return new Promise((resolve) => {
      fs.readFile('./utils/rev-manifest.json', (err, manifest) => {
        if (err) { return console.log(err); }
        return gulp.src(paths.dist.base + '**/*.{css,js}', { base: paths.dist.base })
          .pipe(revRewrite({ manifest }))
          .pipe(gulp.dest(paths.dist.base))
          .on('end', resolve);
      });
    }).then(() => {
      return new Promise((resolve) => {
        gulp.src(paths.dist.base + '**/*.{css,js}', { base: paths.dist.base })
          .pipe(rev())
          .pipe(revdel())
          .pipe(gulp.dest(paths.dist.base))
          .pipe(rev.manifest({ cwd: './utils/', merge: true }))
          .pipe(gulp.dest('./utils/'))
          .on('end', resolve);
      }).then(() => {
        fs.readFile('./utils/rev-manifest.json', (err, manifest) => {
          if (err) { return console.log(err); }
          return gulp.src(paths.dist.base + '**/*.html', { base: paths.dist.base })
            .pipe(revRewrite({ manifest }))
            .pipe(gulp.dest(paths.dist.base));
        });
      });
    });
  });
};

exports.cache = cache;

const lint = async () => {
  await gulp.src([paths.src.scss + '**/*.scss', '!' + paths.src.scss_libs + '**'])
    .pipe(gulpStylelint({
      failAfterError: true,
      reporters: [
        { formatter: 'string', console: true },
      ],
      syntax: 'scss',
    }))
    .on('error', function (err) {
      console.error('CSS ERROR', err);
      this.emit('end');
    });
  return gulp.src([paths.src.js + '**/*.+(js|jsx|ts|tsx)', '!' + paths.src.js_libs + '**'])
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(eslint.failAfterError())
    .on('error', function (err) {
      console.error('JS ERROR', err);
      this.emit('end');
    });
};

exports.lint = lint;

const csso = () => {
  return gulp.src(paths.dist.css + '**/*.css')
    .pipe(postcss([postcssCsso({ restructure: false, forceMediaMerge: true, comments: false })]))
    .pipe(gulp.dest(paths.dist.css));
};

exports.csso = csso;

const wds = () => {
  const watchFiles = './build/**/*.html';
  const options = {
    before(app, wdServer) {
      gulp.watch([
        watchFiles,
      ]).on('all', () => {
        wdServer.sockWrite(wdServer.sockets, 'content-changed');
      });
    },
    stats: 'errors-warnings',
    contentBase: path.join(__dirname, 'build'),
    historyApiFallback: true,
    hot: true,
    inline: true,
    compress: true,
    open: true,
    overlay: false,
    // overlay: {
    //   warnings: true,
    //   errors: true,
    // },
    writeToDisk: true,
    host: 'localhost',
  };
  webpackConfig.entry.main.splice(0, 1);
  webpackDevServer.addDevServerEntrypoints(webpackConfig, options);
  const compiler = webpackModule(webpackConfig);
  const devServer = new webpackDevServer(compiler, options);
  devServer.listen(5000, 'localhost', () => {
    console.log('dev server listening on port 5000');
  });
};

exports.wds = wds;

exports.default = gulp.series(
  clean,
  gulp.parallel(
    gulp.series(
      html,
    ),
    images,
  ),
  copy,
  gulp.parallel(
    watch,
    server,
  ),
);

exports.build = gulp.series(
  clean,
  gulp.parallel(
    gulp.series(
      html,
      webpack,
    ),
    images,
  ),
  csso,
  copy,
  gulp.series(
    cache,
  ),
);

exports.start = gulp.series(
  gulp.parallel(
    fonts,
    icons,
  ),
);
