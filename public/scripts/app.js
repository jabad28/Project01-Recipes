console.log("Sanity Check: JS is working!");

$(document).ready(function() {
  console.log('app.js loaded!');

  // GET All recipes!
  $.ajax({
    method: 'GET',
    url: '/api/recipe',
    success: handleReceivedAllRecipes,
    // error: handleReceivedAllRecipesError
  });
  $('#recipe-form form').on('submit', handleRecipeSubmit);
  $('#recipes').on('click', '.delete-recipe', handleDeleteRecipeClick);
  $('#recipes').on('click', '.update-recipe', handleRecipeUpdateClick);

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

function handleFormSumbitResponse(data){
  console.log("handleFormSumbitResponse got data", data);
  renderRecipe(data);
}

$('#recipe-form').on('submit', function (event) {
  event.preventDefault();
  renderRecipe();

});


});//ends doc.ready

// when the update button for an recipe is clicked
function handleRecipeUpdateClick(e) {
  var recipeId = $(this).closest('.recipes').data('recipe-id');
  console.log('edit recipes', recipeId);
}

// when a delete button for an recipe is clicked
function handleDeleteRecipeClick(e) {
  var recipeId = $(this).parents('.recipe').data('recipe-id');
  console.log('someone wants to delete recipe id=' + recipeId );

  $.ajax({
    url: '/api/recipe/' + recipeId,
    method: 'DELETE',
    success: handleDeleteRecipeSuccess
  });
}

// callback after DELETE /api/recipe/:id
function handleDeleteRecipeSuccess(data) {
  var deletedRecipeId = data._id;
  console.log('remove recipe from page:', deletedRecipeId);
  $('div[data-recipe-id=' + deletedRecipeId + ']').remove();
}

// after GET /api/recipes
function handleReceivedAllRecipes(json){
  console.log("handleReceivedAllRecipes got data like..", json);
  json.forEach(function(recipes){
    renderRecipe(recipes);
  });
}

function renderRecipe(recipe) {
  console.log('rendering recipes', recipe);
  var templateHtml = $('#recipeTemplate').html();
  var templateFun = Handlebars.compile(templateHtml);
  var newHtml= templateFun(recipe);
  $('#recipes').append(newHtml);
}
