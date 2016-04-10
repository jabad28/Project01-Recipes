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
  console.log("handleFormSumbitResponse got data", data);
  renderRecipe(data);
}

$('#recipe-form').on('submit', function (event) {
  event.preventDefault();
  renderRecipe();
//
//   $('#recipes').on('click', '.delete-recipe', handleDeleteRecipeClick);
//
// });
//
//
// function handleDeleteRecipeClick(e) {
//   var RecipeId = $(this).parents('.recipe').data('recipe-id');
//   console.log('someone wants to delete recipe id=' + RecipeId );
// }

});

// $.ajax({
//    url: '/api/recipe/' + RecipeId,
//    method: 'DELETE',
//    success: handleDeleteRecipeSuccess
//  });
//
// // callback after DELETE /api/recipe/:id
// function handleDeleteRecipeSuccess(data) {
//  var deletedRecipeId = data._id;
//  console.log('removing the following recipe from the page:', deletedRecipeId);
//  $('div[data-recipe-id=' + deletedRecipeId + ']').remove();
//
//  }

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


// GET All recipes!
$.ajax({
  method: 'GET',
  url: '/api/comment',
  success: handleReceivedAllComments,
  // error: handleReceivedAllRecipesError
});
$('#comment-form form').on('submit', handleCommentSubmit);
// });//ends doc.ready

function handleCommentSubmit(e){
e.preventDefault();
var commentData = $(this).serialize();

$.ajax({
  method: 'POST',
  url: '/api/comment',
  data: commentData,
  success: handleCommentSumbitResponse
});
$(this).trigger('reset');
}

function handleCommentSumbitResponse(data){
console.log("handleCommentSumbitResponse got data", data);
renderComment(data);
}

$('#comment-form').on('submit', function (event) {
event.preventDefault();
commentRecipe();

// after GET /api/recipes
function handleReceivedAllComments(json){
  console.log("handleReceivedAllRecipes got data like..", json);
  json.forEach(function(comments){
    renderComment(comments);
  });
}

function renderCooment(comment) {
  console.log('rendering comments', comment);
  var commentHtml = $('#commentTemplate').html();
  var commentFun = Handlebars.compile(commentHtml);
  var newHtmlComment = commentFun(comment);
  $('#comments').append(newHtmlComment);
}
