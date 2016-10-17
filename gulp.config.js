module.exports = function(){

    var clientPath = './src/Edge/FrontEnd/';
    var config = {
        alljs:['./src/**/*.js','./*.js'],
        less: clientPath + 'styles/*.less',
        styles:'./.tmp'
    };
    return config;
};