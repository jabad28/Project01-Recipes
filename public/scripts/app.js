console.log("Sanity Check: JS is working!");

$(document).ready(function() {
  console.log('app.js loaded!');

  // GET All recipes!
  $.ajax({
    method: 'GET',
    url: '/api/recipe',
    success: handleReceivedAllRecipes
  });
  $('#recipe-form form').on('submit', handleRecipeSubmit);
});
//ends doc.ready

function handleRecipeSubmit(e){
  e.preventDefault();
  var formData = $(this).serialize();

  $.ajax({
    method: 'POST',
    url: '/api/recipe',
    data: formData,
    success: handleFormSumbitResponse
  });

  $(this).trigger('reset');

}

// catch and handle the click on an add recipe button
$('#recipes').on('click', '.add-recipe', function(e) {
    console.log('add-recipe clicked!');
    var id= $(this).closest('.recipe').data('recipe-id');
    console.log('id',id);
});



// save recipe save button
$('#saveRecipe').on('click', handleNewRecipeSubmit);
$('#recipes').on('click', '.delete-recipes', handleDeleteRecipeClick);

// the click on add recipe button
$('#recipes').on('click', '.add-recipe', handleAddRecipeClick);

function handleDeleteRecipeClick(e) {
var recipeId = $(this).parents('.recipe').data('recipe-id');
console.log('someone wants to delete recipe id=' + recipeId );
}


// after GET /api/recipes
function handleReceivedAllRecipes(json){
  console.log("handleformsubmit got data like..", json);
  json.forEach(function(recipes){
    renderRecipe(recipes);
  });
}


function handleFormSubmitResponse(data){
  console.log("handleformsubmit got data", data);
  renderRecipe(data);
}

// function handleError() {
//   console.log('error');
//   $('#recipeTemplate').text('Failed to load, is the server working?');
// }

function renderRecipe(recipe) {
  console.log('rendering recipes', recipe);
  var templateHtml = $('#recipeTemplate').html();
  var templateFun = Handlebars.compile(templateHtml);
  var newHtml= templateFun(recipe);
  $('#recipes').append(newHtml);
}
