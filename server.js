//server.js ---> SERVER!
var express = require('express');
var bodyParser = require('body-parser');

// calling express in app variable.
var app = express();



/**********
SERVER
***********/
// serve static files in public
app.use(express.static(__dirname + '/public'));

// body parser config to accept our datatypes
app.use(bodyParser.urlencoded({ extended: true }));


console.log(" hella console logging.....");


var controllers = require('./controllers');
var db = require('./models');

/**********
ROUTES
***********/


//HTML endpoints********


app.get('/', function homepage (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


//JSON API Endpoints*************



app.get('/api', controllers.api.index);
app.get('/api/recipe', controllers.recipe.index);
app.get('/api/recipe/:RecipeId', controllers.recipe.show);
app.post('/api/recipe', controllers.recipe.create);
app.delete('/api/recipe/:RecipeId', controllers.recipe.destroy);
app.put('/api/recipe/:RecipeId', controllers.recipe.update);

app.post('/api/recipes/:recipeId/comments', controllers.recipe.create);



/**********
SERVER
***********/

//listening on port 3000
app.listen(process.env.PORT || 3000, function () {
  console.log('Example app listening at http://localhost:3000/');
});
