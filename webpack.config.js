const config = {
    mode: "development",
    entry: ['./app/index.js'],
    output: {
        path: __dirname + '/build',
        filename: 'lyrid.js'
    },
    module: {
        rules: [
            {
                test: /\.js?$/,
                exclude:  /node_modules/,
                loader: 'babel-loader'
            }
        ]
    },
    resolve: {
        extensions: ['.js']
    },
    devServer:{
        port: 3000,
        contentBase: __dirname + '/build',
        inline: true
    }
};
module.exports = config;