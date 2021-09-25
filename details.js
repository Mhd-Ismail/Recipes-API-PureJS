var param = new URLSearchParams(location.search)
var recipeID = param.get("rid")
var recipeDetails = {};
var recipeImg = document.getElementById("recipeImg");
var ingredients = [];

getReceiptsDetails()
// to get the details
function getReceiptsDetails() {
    var httpRequest = new XMLHttpRequest();
    httpRequest.open("get", `https://forkify-api.herokuapp.com/api/get?rId=${recipeID}`);
    httpRequest.send();
    httpRequest.onreadystatechange = function () {
        if (httpRequest.readyState == 4 && httpRequest.status == 200) {
            recipeDetails = JSON.parse(httpRequest.response).recipe;
            recipeImg.src = recipeDetails.image_url;
            ingredients = recipeDetails.ingredients;
            displayIngredients()

        };
    }
}
// get ingredients
function displayIngredients() {
    var ingredientsContainer = ``;
    for (let i = 0; i < ingredients.length; i++) {
        ingredientsContainer += `
        <li>${ingredients[i]}</li>
        `
    }
    document.getElementById("ingredientsUI").innerHTML = ingredientsContainer;
}