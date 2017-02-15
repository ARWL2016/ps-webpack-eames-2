var path = require('path'); 

module.exports = {
    context: path.resolve('js'), 
    entry: ["./app"],
    output: {
        path: path.resolve('build/'),
        // publicPath: '/public/assets/', - disable if not using webpack-dev-server
        filename: "bundle.js" 
    }, 

    devServer: {
        contentBase: 'public'
    }, 

    module: {
        rules: [
            {
                test: /\.css$/, 
                exclude: /node_modules/, 
                loader: "style-loader!css-loader!autoprefixer-loader" 
            },
            {
               test: /\.scss$/, 
                exclude: /node_modules/, 
                loader: "style-loader!css-loader!autoprefixer-loader!sass-loader"   
            }, 
            {
                test: /\.(png|jpg|ttf|eot)$/, 
                exclude: /node_modules/, 
                loader: 'url-loader?limit=10000' 

            }
        ] 
    }, 

    resolve: {
        extensions: ['.js', '.es6']
    }

}

