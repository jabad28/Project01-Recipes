
var db = require("./models");

var recipeList =[
                {
                recipeName: 'Baked Chicken Fajitas',
                ingredients: [
                            '3-4 Boneless skinless chicken breasts.',
                            '1-2 tsp Taco Seasoning.',
                            '2 Bell peppers in assorted colors, deseeded and thinly sliced.',
                            '1 Red onion, peeled and thinly sliced.',
                            '½ Cup Shredded Cheddar or Mexican Blend Cheese.'
                          ],
                directions: [
                            'Trim the chicken breasts then lay them in a single layer in a glass baking dish.',
                            'Sprinkle the taco seasoning over the top of the chicken breast to taste.',
                            'Lay your thinly sliced onions and peppers on top of the chicken breast, spread out evenly over the top.',
                            'Drizzle the olive oil over the peppers and onions.',
                            'Sprinkle cheese over the top of the dish.',
                            'Bake at 400˚F for 35-45 minutes or until chicken is cooked though and the juices run clear.'
                          ],
                madeBy:  'Joanne Abad',
                },
                {
                recipeName: 'Italian Chicken Bake',
                ingredients:  [
                              '3-4 Boneless skinless chicken breasts',
                              '1-2 Roma tomatoes cut into ½″ thick slices',
                              '4-6 Tablespoons Prepared Pesto Sauce',
                              '1 Cup Mozzarella or Italian blend cheese'
                            ],
                directions: [
                              'Trim chicken breast and lay them in a glass baking dish.',
                              'Spread 1-2 tablespoons of pesto on top side of chicken.',
                              'Slice roma tomatoes into ½″ thick slices and lay on top of pesto.',
                              'Sprinkle mozzarella or Italian blend cheese over the whole thing.',
                              'Bake at 400˚F for 30-40 minutes or until the juices run clear.'
                            ],
                madeBy:  'Joanne Abad',
                },
                {
                recipeName: 'Stuffed Bell peppers',
                ingredients: [
                            '4 Medium to Large green or red bell peppers.',
                            '1 ½ pounds of lean ground beef.',
                            '1 cup chopped onion.',
                            '1 cup cooke rice.',
                            '1 cup salsa.',
                            '1 package Taco Seasoning Mix.',
                            '1 can (15 ounces) tomato sauce.',
                            '½ cup shredded Cheddar cheese.',
                          ],
                directions: [
                              'Preheat oven to 400˚F.',
                              'Cut off tops of bell peppers.',
                              'Remove seeds, membranes, and rinse bell peppers.',
                              'Brown ground beef and onion in large skillet on medium-high heat.',
                              'Add rice, ½ cup of salsa, ½ cup tomato sauce, and seasoning mix.',
                              'Stuff peppers with beef mixture and place in square baking dish.',
                              'Mix remaining tomato sauce, salsa, and pour over stuffer peppers.',
                              'Cover tighly with foil.',
                              'Bake for 35 to 45 minutes or until peppers are tender.',
                              'Remove foil, sprikle peppers with cheese and bake for 5 minutes or until cheese is melted.'
                            ],
                madeBy:  'Joanne Abad',
                }
];

var sampleComment1 = {
  userName: 'Joanne',
  date: "Nov 1st, 2015",
  comment: "Wow amazing recipe!"
};

var sampleComment2 = {
  userName: 'tgaff',
  date: "Mar 2nd, 2016",
  comment: "I tried this one and it came out great!"
};

recipeList.forEach(function(element){
  element.comment = [sampleComment1, sampleComment2];
  console.log("whats wrong??", element.comment);
});

db.Recipe.remove({}, function(err, recipes){

  db.Recipe.create(recipeList, function(err, recipes){
    if (err) { return console.log('ERROR', err); }
    console.log("all recipes:", recipes);
    console.log("created", recipes.length, "recipes");
  });

});
