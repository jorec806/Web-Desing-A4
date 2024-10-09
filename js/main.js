import { renderMeal } from "./api.js";

const recipeContainer = document.getElementById("recipeContainer");
const recipeButton = document.getElementById("recipeButton");

function renderMoreMeals() {
  for (let i = 0; i < 15; i++) {
    renderMeal(recipeContainer);
  }
}

recipeButton.addEventListener("click", renderMoreMeals);

renderMoreMeals();
