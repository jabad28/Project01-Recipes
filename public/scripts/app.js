console.log("Sanity Check: JS is working!");

$(document).ready(function() {
  console.log('app.js loaded!');

  // GET All recipes!
  $.ajax({
    method: 'GET',
    url: '/api/recipe',
    success: handleReceivedAllRecipes,
  });

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

  $('#recipes').on('submit','.comment-form form', handleCommentSubmit);
  $('#recipe-form form').on('submit', handleRecipeSubmit);
  $('#recipes').on('click', '.delete-recipe', handleDeleteRecipeClick);
  $('#recipes').on('click', '.edit-recipe', handleRecipeEditClick);
  $('#updateRecipesForm').on('submit', '.save-recipe', handleSaveChangesClick);

  // $('#addComments').on('submit', '.save-comment', handleAddCommentsSubmit);
  $('#commentsForm form').on('submit', handleRecivedCommentSubmit);

});//ends doc.ready


// when the update button for a recipe is clicked
function handleRecipeEditClick(e) {
  e.preventDefault();
  var recipeId = $(this).closest('.recipe').data('recipe-id');
  console.log('edit recipes', recipeId);
}



function handleSaveChangesClick(e) {
  var recipeId = $(this).closest('.recipe').data('recipe-id');
  var $recipeRow = $('[data-recipe-id=' + recipeId + ']');

  var data = {
    recipeName: $recipeRow.find('.edit-recipe-recipeName').val(),
    ingredients: $recipeRow.find('.edit-recipe-ingredients').val(),
    directions: $recipeRow.find('.edit-recipe-directions').val()
  };

  console.log('PUTing data for recipe', recipeId, 'with data', data);

  $.ajax({
    method: 'PUT',
    url: '/api/recipe/' + recipeId,
    data: data,
    success: handleRecipeUpdatedResponse
  });
}

function handleRecipeUpdatedResponse(data) {
  console.log('response to update', data);

  var recipeId = data._id;
  console.log('the id of the recipe is', data._id);
  // scratch this recipe from the page
  $('[data-recipe-id=' + recipeId + ']').remove();
  // and then re-draw it with the updates ;-)
  renderRecipe(data);
}



// when a delete button for an recipe is clicked
function handleDeleteRecipeClick(e) {
  e.preventDefault();
  var recipeId = $(this).parents('.recipe').data('recipe-id');
  console.log('trying to delete recipe id' + recipeId );

  $.ajax({
    method: 'DELETE',
    url: '/api/recipe/' + recipeId,
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

// this function takes a single recipe and renders it to the page
function renderRecipe(recipe) {
  console.log('rendering recipes', recipe);
  var templateHtml = $('#recipeTemplate').html();
  var templateFun = Handlebars.compile(templateHtml);
  var newHtml= templateFun(recipe);
  $('#recipes').append(newHtml);
}

function handleCommentSubmit(event){
  event.preventDefault();
  var formData = $(this).serialize();
  console.log("handleCommentSubmit got comments", formData);

  $.ajax({
    method: 'POST',
    url: '/api/recipes/:recipeId/comment',
    data: formData,
    success: handleRecivedCommentSubmit,
    error: handleErr
  });
  $(this).trigger('reset');
}

function handleErr(err) {
  console.log(err);
}
function handleRecivedCommentSubmit(data){
  console.log("handleRecivedCommentSubmit got comments like..", data);
  renderComment(data);
}

// this function takes a single comment and renders it to the page
function renderComment(comment) {
  console.log('rendering comments', comment);
  var templateComment = $('#commentTemplate').html();
  var addComments = Handlebars.compile(templateComment);
  var newComment= addComments(comment);
  console.log(newComment);
  $('.comment-section').append(newComment);
}
