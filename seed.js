
var db = require("./models");

var recipeList =[
                {
                name: 'Dish 1',
                ingredients: 'blah blah',
                directions: 'blah blah',
                madeBy:  'Joanne Abad',
                imageUrl: 'sfdsa'
                },
                {
                name: 'Dish 2',
                ingredients: 'blah blah',
                directions: 'blah blah',
                madeBy:  'Joanne Abad',
                imageUrl: 'sfdsa'
                },
                {
                name: 'Dish 3',
                ingredients: 'blah blah',
                directions: 'blah blah',
                madeBy:  'Joanne Abad',
                imageUrl: 'sfdsa'
                }
];



db.Recipe.remove({}, function(err, recipes){

  db.Recipe.create(RecipeList, function(err, recipes){
    if (err) { return console.log('ERROR', err); }
    console.log("all recipes:", recipes);
    console.log("created", recipes.length, "recipes");
    process.exit(); //stops seed from running
  });

});
