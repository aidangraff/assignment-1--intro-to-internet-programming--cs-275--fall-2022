const { src, dest, series, watch } = require(`gulp`),
    htmlCompressor = require(`gulp-htmlmin`),
    cssCompressor = require(`gulp-clean-css`),
    jsValidator = require(`gulp-eslint`),
    babel = require(`gulp-babel`),
    jsCompressor = require(`gulp-uglify`),
    browserSync = require(`browser-sync`),
    reload = browserSync.reload;


let compressHTML = () => {
    return src(`dev/html/index.html`)
        .pipe(htmlCompressor({collapseWhitespace: true}))
        .pipe(dest(`prod/dev/html`));
};

let compressCSS = () => {
    return src(`dev/css/style.css`)
        .pipe(cssCompressor({collapseWhitespace: true}))
        .pipe(dest(`prod/dev/css`));
};

let compressJS = () => {
    return src(`dev/js/app.js`)
        .pipe(babel())
        .pipe(jsCompressor())
        .pipe(dest(`prod/dev/js`));
};

let validateJS = () => {
    return src(`dev/js/app.js`)
        .pipe(jsValidator())
        .pipe(jsValidator.formatEach(`compact`, process.stderr));
};

let transpileJSForDev = () => {
    return src(`dev/js/app.js`)
        .pipe(babel())
        .pipe(dest(`temp/scripts`));
};

let transpileJSForProd = () => {
    return src(`dev/js/app.js`)
        .pipe(babel())
        .pipe(jsCompressor())
        .pipe(dest(`prod/dev/js`));
};

let serve = () => {
    browserSync({
        notify: true,
        reloadDelay: 50,
        server: {
            baseDir: [
                `dev`,
                `dev/html`
            ]
        }
    });

    watch(`dev/html/*.html`).on(`change`, reload);
    watch(`dev/css/*.css`).on(`change`, reload);
    watch(`dev/js/*.js`, series(validateJS, transpileJSForDev)).on(`change`, reload);

};



exports.validateJS = validateJS;
exports.transpileJSForDev = transpileJSForDev;
exports.compressHTML = compressHTML;
exports.compressCSS = compressCSS;
exports.compressJS = compressJS;
exports.transpileJSForProd = transpileJSForProd;
exports.serve = series(
    validateJS,
    transpileJSForDev,
    serve
);
exports.build = series(
    transpileJSForProd,
    compressHTML,
    compressCSS
);
