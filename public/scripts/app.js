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
});//ends doc.ready

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
  console.log("handleformsubmit got data", data);
  renderRecipe(data);
}




});

// $.ajax({
//    url: '/api/recipe/' + recipeId,
//    method: 'DELETE',
//    success: handleDeleteRecipeSuccess
//  });
//
// // callback after DELETE /api/recipe/:id
// function handleDeleteRecipeSuccess(data) {
//  var deletedRecipeId = data._id;
//  console.log('removing the following album from the page:', deletedRecipeId);
//  $('div[data-recipe-id=' + deletedRecipeId + ']').remove();
//
//  }

// after GET /api/recipes
function handleReceivedAllRecipes(json){
  console.log("handleformsubmit got data like..", json);
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
