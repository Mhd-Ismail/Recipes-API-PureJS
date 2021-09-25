receipts = [];
getReceipts("pasta");
var links = document.getElementsByClassName("nav-link");
for (let i = 0; i < links.length; i++) {
    links[i].addEventListener("click", function (e) {
        getReceipts(e.target.text);
    })
}
// to get the data from the api
function getReceipts(meals) {
    var httpRequest = new XMLHttpRequest();
    httpRequest.open("get", `https://forkify-api.herokuapp.com/api/search?q=${meals}`);
    httpRequest.send();
    httpRequest.onreadystatechange = function () {
        if (httpRequest.readyState == 4 && httpRequest.status == 200) {
            receipts = JSON.parse(httpRequest.response).recipes;
            displayReceipts();
        }
    };
}
// to display the data
function displayReceipts() {
    let receiptsContainer = "";
    for (let i = 0; i < receipts.length; i++) {
        receiptsContainer += `
            <div class="col-md-3">
                <div class="receipts">
                   <img class="w-100 receipts-img" src="${receipts[i].image_url}" alt="">
                   <h5 class="pt-3">${receipts[i].title.slice(0,25)}</h5>
                   <button class="btn btn-info mb-5"><a class="text-white" target="_blank" href="${receipts[i].source_url}">Source</a></button>
<button class="btn btn-danger mb-5"><a class="text-white" target="_blank" href="details.html?rid=${receipts[i].recipe_id}">details</a></button>
                </div>
            </div>
        `;
    }
    document.getElementById("postsRow").innerHTML = receiptsContainer;
}

