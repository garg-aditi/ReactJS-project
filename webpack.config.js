//entry ->output
const path= require('path');
const ExtractTextPlugin =  require('extract-text-webpack-plugin');

module.exports=  (env)=>{
    const isProduction = env === "production";
    const CssExtract =  new ExtractTextPlugin('styles.css');
    return {
        entry: './src/app.js',
        output :{
            path: path.join(__dirname, 'public'),
            filename : 'bundle.js'
        },
        module :{
           rules: [{
               loader : 'babel-loader',
               test: /\.js$/ ,      //trst files are getting ended with .js
               exclude : /node_modules/
           },{
               test : /\.s?css$/,
               use: CssExtract.extract({
                   use: [
                       {
                           loader : 'css-loader',
                           options: {
                               sourceMap: true
                           }
                       }
                   ]
               })
           }]
        },
        plugins : [
            CssExtract
        ],
        devtool: isProduction? "source-map" : "inline-source-map",
        devServer : {
            contentBase : path.join(__dirname, 'public'),
            historyApiFallback : true
        }
    
    };
}

