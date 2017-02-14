## Webpack Fundamentals   
###Part 2: CSS, Sass

https://app.pluralsight.com/player?course=webpack-fundamentals&author=joe-eames&name=webpack-fundamentals-m1&clip=3&mode=live   
https://github.com/ARWL2016/ps-webpack-eames-2    

- Pluralsight  
- Joe Eames  
- Aug 2015  

####Packages  
1. webpack (-g)  
2. webpack-dev-server (-g)  
3. css-loader
4. style-loader
5. sass-loader  
6. node-sass    
7. (jQuery)   

---
####Adding CSS to the Build  
Conventionally, we include css with a link ref inside `index.html`. But with webpack, we can include css in the js module system using a require statement and loaders. App.js becomes the root of our project instead of index.html. But webpack will inject our css files into the index.html head (but see below for alternative) and the `<link>` tags will appear in the browser.    
1. `npm install style-loader css-loader --save-dev`  
2. remove style links from `index.html`  
3. In `webpack.config` under `module.rules` create a new loader object as before, with test, exclude and loader properties.  
4. Set `loader: "style-loader!css-loader"`. The `!` syntax is common in webpack. It will run our css files first through css-loader and then through style-loader.  
5. In `app.js`, use a require statement and the path to import the css files. E.g. `require("../css/app.css")` If there is a bootstrap and a local style, we should include bootstrap first.
6. Nb. running `webpack-dev-server -p` will now minify the js and css. 

---
####Adding Sass Support  
1. `npm install sass-loader node-sass --save-dev`  
2. Change css files to extension `.scss` and update the require statement in `app.js`  
3. In `webpack.config` add a new loader definition, with test, exclude and loader. 
4. Set `loader: "style-loader!css-loader!sass-loader"`. Hence, scss files will get passed through the sass-loader and then the css-loader 5. Nb. This method includes everything in the bundle, so we don't get to view the css output    

####Less Support 
This is identical to Sass, except that we use `less loader` and the extension is `.less` 

--- 
####Creating a Separate CSS bundle

See `webpack-seperate-css.config.js`  
IMPORTANT: Cannot make this function and this package may be incompatible with Webpack 2. `Error: Chunk.entry was removed. Use hasRuntime()`. But the course method is this: 

1. `npm install extract-text-webpack-plugin --save-dev`  
2. in `webpack.config` require the package in (1)  
3. Since this is supposed to output two files, we change the public path to `/public/assets` - remove the `js` folder  
4. define a plugin using a function from the package  
5. redefine the module loaders using the same `ExtractTextPlugin` function  
6. In `index.html` restore the css link to the publicPath: `<link rel="stylesheet" href="/public/assets/styles.css">` and:   
7. Alter the script link also: `<script src="/public/assets/bundle.js"></script>`  

---
####Adding Autoprefixer-Loader 
1. `npm install autoprefixer-loader --save-dev`  
2. In `webpack.config` chain this loader after scss but before css, e.g: `loader: "style-loader!css-loader!autoprefixer-loader!sass-loader" `  

---
####Adding Images   
1. `npm install url-loader file-loader --save-dev`  
2. add an image folder to the project  
3. create a tag to contain the element in `index.html`. In this example, this is done conventionally, with a css class, but also with an id which will be grabbed by app.js, using the createElement() function.  
4. in `app.css` provide a relative url to the image.  
5. In `app.js` we can require (import) the image, define its properties, and append it to the DOM (don't like this method).    
6. In `webpack.config` define the loader with test exclude and loader.    
7. Set `loader: 'url-loader?limit=10000'` The `?` introduces a parameter. The limit is the size of the image in bytes which can be sent inline, ie. actually converted and written into the bundle (base64 encoded). Images larger than that will be sent separately and/or will be copied into the build folder (renamed).   
8. Nb. As previously, different types of output file means we should use `build` for the build folder and `/public/assets/` for the `publicPath`  

--- 
####Fonts   
1. These work in the same way as images and use the same two loaders   
2. Add the local url to the css file like this `src: url('../fonts/Lora-Regular.ttf');` see app.css for full   example  
3. add the file extensions `ttf|eot` to the `test` property of the loaders. The limit can stay the same.   
4. Fonts are usually too large to write inline   
>>>>>>> ac576b0d4c587f952db2fb1de64b139c45f05019

--- 
####Deployment  
1. To deploy without webpack-dev-server, put bundle.js in the public folder and in `index.html` link relatively to it. 
2. It may be easier to configure the output.path to public so that this happens automatically  
3. We can also define paths without `path.resolve`. We can use `path: __dirname,` to reference the current folder (ie the root) and `filename: './public/bundle.js'`. See https://github.com/ARWL2016/react-timer/blob/master/webpack.config.js.   

####JQuery Plugin   
1. See `webpack-jquery.config`. Here, `jquery`  is installed as a dependency, so the library is in `node_modules`. 
2. JQuery should be added as a global. For this purpose, we use plugins rather than loaders. Hence, `index.html` has no jquery link  
3. In `webpack.config` require webpack  
4. Define a plugin property by calling `webpack.ProvidePlugin` and define aliases for jquery  
5. Nb. The webpack library will be included in the bundle  
