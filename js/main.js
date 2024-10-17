import { renderMeal } from "./api.js";

const recipeContainer = document.getElementById("recipeContainer");
const recipeButton = document.getElementById("recipeButton");

//FUNCIONS
function renderMoreMeals() {
  for (let i = 0; i < 15; i++) {
    renderMeal(recipeContainer);
  }
}

function app() {
  //Render first 15 random meals
  renderMoreMeals();
}

///////EVENT LISTENERS////////
//Render random meals in page
recipeButton.addEventListener("click", renderMoreMeals);

//Get id from meal selected
recipeContainer.addEventListener("click", function (e) {
  if (e.target && e.target.matches(".recipe-card__img img")) {
    const recipeCard = e.target.closest(".recipe-card");
    const mealID = recipeCard.getAttribute("data-id");
    console.log("Recipe ID:", mealID);

    // Save ID in localStorage
    localStorage.setItem("selectedMealID", mealID);

    // Redirect to Recipe Display
    window.location.href = "/assessment/recipedisplay.html";
  }
});

//Start app
app();
