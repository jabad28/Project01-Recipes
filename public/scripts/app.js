console.log("Sanity Check: JS is working!");

$(document).ready(function() {
  console.log('app.js loaded!');

  // GET All recipes!
  $.ajax({
    method: 'GET',
    url: '/api/recipe',
    success: handleReceivedAllRecipes
  });
  // $('#recipe-form form').on('submit', handleRecipeSubmit);
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


function renderRecipe(recipe) {
  console.log('rendering recipes', recipe);
  var templateHtml = $('#recipeTemplate').html();
  var templateFun = Handlebars.compile(templateHtml);
  var newHtml= templateFun(recipe);
  $('#recipes').append(newHtml);
}
