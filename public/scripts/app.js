
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

  $('#recipe-form form').on('submit', handleRecipeSubmit);
  $('#recipes').on('click', '.delete-recipe', handleDeleteRecipeClick);
  $('#recipes').on('click', '.edit-recipe', handleRecipeEditClick);
  $('#recipes').on('click', '.save-recipe', handleSaveChangesClick);


  $('#recipes').on('submit','.comment-form', function handleCommentSubmit(e){
    e.preventDefault();
    console.log("clicked on the submit button");
    var userName = $('.comment-form').find('#userName');
    var date = $('.comment-form').find('#date');
    var comment = $('.comment-form').find('#comment');

    var formData = {
      userName: userName.val(),
      date: date.val(),
      comment: comment.val()
    };
    console.log("this is the formdata, ", formData);
    // var recipeId = $('#recipe-form').data('recipeId');
    var recipeId = $(this).closest('.recipe').data('recipe-id');
    console.log("This logs the recipe ID, ", recipeId);

    $.ajax({
      method: 'POST',
      url: '/api/recipe/' + recipeId + '/comment',
      data: formData,
      success: onSuccess,
      error: onError
    });

    function onSuccess(json){
      console.log('returned comment', json);
      renderComment(json);
    }

    function onError(err){
      console.log('error from comment', err);
    }

    userName.val('');
    date.val('');
    comment.val('');

  });



});//ends doc.ready


//////////////Update Recipe///////////////

// when the update button for a recipe is clicked
function handleRecipeEditClick(e) {
  e.preventDefault();
  var $recipeRow = $(this).closest('.recipe');
  var recipeId = $recipeRow.data('recipe-id');
  console.log('edit recipes', recipeId);


$recipeRow.find('.save-recipe').toggleClass('hidden');
$recipeRow.find('.edit-recipe').toggleClass('hidden');


// get the recipe name and replace its field with an input element
var recipeName = $recipeRow.find('span.recipe-name').text();
$recipeRow.find('span.recipe-name').html('<input type="text" value="' + recipeName + '"></input>');
console.log('edit this', recipeName);

var ingredients = $recipeRow.find('span.ingredients-list').text();
$recipeRow.find('span.ingredients-list').html('<input type="text" value="' + ingredients + '"></input>');

var directions = $recipeRow.find('span.directions-list').text();
$recipeRow.find('span.directions-list').html('<input type="text" value="' + directions + '"></input>');

var madeBy = $recipeRow.find('span.madeBy-name').text();
$recipeRow.find('span.madeBy-name').html('<input type="text" value="' + madeBy + '"></input>');

var comments = $recipeRow.find('span.recipe-comments').text();
$recipeRow.find('span.recipe-comments').html('<input type="text" value="' + comments + '"></input>');

}


function handleSaveChangesClick(e) {
var recipeId = $(this).parents('.recipe').data('recipe-id');
var $recipeRow = $('[data-recipe-id=' + recipeId + ']');

var data = {
  recipeName: $recipeRow.find('.recipe-name input').val(),
  ingredients: $recipeRow.find('.ingredients-list input').val(),
  directions: $recipeRow.find('.directions-list input').val(),
  madeBy: $recipeRow.find('.madeBy-name input').val(),
  comments: $recipeRow.find('.recipe-comments input').val()

};
// console.log('PUTing data for recipe', recipeId, 'with data', data);
// alert(data.recipeName);
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
// scratch this recipe from the page
$('[data-recipe-id=' + recipeId + ']').remove();
// and then re-draw it with the updates
renderRecipe(data);

}


/////////////end update//////////////

// when a delete button for a recipe is clicked
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

// function handleCommentSubmit(event){
//   event.preventDefault();
//   // var formData = $(this).serialize();
//     var formData ={
//       name: $("#someselector").val(),
//       date: $("#someselector").val(),
//       comment: $("#someselector").val(),
//     };
//
//   console.log("handleCommentSubmit got comments", formData);
//
//     var recipeId = $(this).closest('.recipe').data('recipe-id');
//     console.log("recipe id: ", recipeId);
//   $.ajax({
//     method: 'POST',
//     url: '/api/recipes/' + recipeId + '/comment', // :recipeId needs to be filled in with the recipe ID!
//     data: formData,
//     success: handleReceivedCommentSubmit,
//     error: handleErr
//   });
//   $(this).trigger('reset');
// }
//
// function handleErr(err) {
//   console.log(err);
// }
// function handleReceivedCommentSubmit(formData){
//   console.log("handleRecivedCommentSubmit got comments like..", formData);
//   renderComment(formData);
// }

// this function takes a single comment and renders it to the page
function renderComment(comment) {
  console.log('rendering comments', comment);
  var templateComment = $('#commentTemplate').html();
  var addComments = Handlebars.compile(templateComment);
  var newComment= addComments(comment);
  console.log(newComment);
  $('.comment-section').append(newComment);  // close, but you'll need to tell it which recipe to find the .comment-section in.
}
