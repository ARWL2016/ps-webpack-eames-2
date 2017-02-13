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

---
####Adding CSS to the Build  
Conventionally, we include css with a link ref inside `index.html`. But with webpack, we can include css in the js module system using a require statement and loaders. App.js becomes the root of our project instead of index.html. But webpack will inject our css files into the index.html and the `<link>` tags will appear in the browser.    
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


