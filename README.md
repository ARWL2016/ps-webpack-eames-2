## Webpack Fundamentals   

###Part 2: CSS

https://app.pluralsight.com/player?course=webpack-fundamentals&author=joe-eames&name=webpack-fundamentals-m1&clip=3&mode=live   
https://github.com/ARWL2016/ps-webpack-eames-2    

- Pluralsight  
- Joe Eames  
- Aug 2015  

####Packages  
1. webpack (-g)  
2. webpack-dev-server (-g) - with hot reloading   

---
####Adding CSS to the Build  
*Conventionally, we include css with a link ref inside `index.html`. But with webpack, we can include css in the js module system using a require statement and loaders. App.js becomes the root of our project instead of index.html.* 
1. `npm install style-loader css-loader --save-dev`  
2. remove style links from `index.html`  
3. In `webpack.config` under `module.rules` create a new loader object as before, with test, exclude and loader properties.  
4. Set `loader: "style-loader!css-loader"`. The `!` syntax is common in webpack. It will run our css files first through css-loader and then through style-loader. 
5. In `app.js`, use a require statement and the path to import the css files. E.g. `require("../css/app.css")` If there is a bootstrap and a local style, we should include bootstrap first.  

