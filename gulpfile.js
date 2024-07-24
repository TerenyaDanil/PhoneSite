const gulp = require("gulp")

require("./gulp/dev.js")
require("./gulp/prod.js")

// Запуск дефолтного таска gulp
gulp.task("default", gulp.series("clean:dev", gulp.parallel("includeFiles:dev", "sass:dev", "css:dev", "copyImages:dev", "copyFonts:dev", "copyFiles:dev", "js:dev"), gulp.parallel("browser-sync:dev", "watch:dev")))

// Запуск продакшн таска gulp
gulp.task("prod", gulp.series("clean:prod", gulp.parallel("includeFiles:prod", "sass:prod", "css:prod", "copyImages:prod", "copyFonts:prod", "copyFiles:prod", "js:prod"), gulp.parallel("browser-sync:prod", "watch:dev")))
