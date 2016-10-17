var gulp = require('gulp');
var args = require('yargs').argv;
var del = require('del');
var $ = require('gulp-load-plugins')({lazy:true});
var config = require('./gulp.config.js')();          

//var jshint = require('gulp-jshint');
//var jscs = require('gulp-jscs');
//var util = require('gulp-util');
//var gulpprint = require('gulp-print');
//var gulpif = require('gulp-if');


gulp.task('StartProject',function(){
    console.log('Project have been started');
});

gulp.task('styler', ['clean-styles'],function(){
    log('Compiling and Creating CSSSS Files ');
    return gulp.src(config.less) 
            .pipe($.plumber())           
            .pipe($.less())
            .pipe($.autoprefixer())
            .pipe(gulp.dest(config.styles));
});

gulp.task('clean-styles', function(){
    log('cleaning styles');
    var filepath = config.styles + '/*.css';
    cleaningFolder(filepath);
});

function cleaningFolder(filepath){
    log('clearing files from the path ->' + filepath);
    //log(done);
    del(filepath);
}


gulp.task('vet',function(){
    log('cheking all the JS files for errors and hint for opimize code');
    return gulp.src(config.alljs)   
                .pipe($.if(args.verbose,$.print()))
                .pipe($.jscs())
                .pipe($.jshint())
                .pipe($.jshint.reporter('jshint-stylish',{verbose:true}))
                .pipe($.jshint.reporter('fail'));
});

gulp.task('less-watcher',function(){
    log(config.less);
    gulp.watch([config.less],['styler']);
});

function log(msg){
    if(typeof(msg) === 'object'){
        for(var item in msg){
            if(msg.hasOwnProperty(item)){
                $.util.log($.util.colors.blue(msg[item]));                
            }}
    } else{
        $.util.log($.util.colors.blue(msg));
    }
}