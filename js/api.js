//Fetching DATA from API

async function getCategories() {
  try {
    const response = await fetch(
      "https://www.themealdb.com/api/json/v1/1/categories.php"
    );
    const data = await response.json();

    const categoriesArr = [];

    data.categories.forEach((category) => {
      categoriesArr.push(category.strCategory);
    });

    return categoriesArr;
  } catch (error) {
    console.error(error);
  }
}

async function getRandomMeal() {
  try {
    //Get a random Category
    const categoryArr = await getCategories();
    const randomIndex = Math.floor(Math.random() * categoryArr.length);
    const randomCategory = categoryArr[randomIndex];

    //Get a Random Meal
    const response = await fetch(
      `https://www.themealdb.com/api/json/v1/1/filter.php?c=${randomCategory}`
    );

    const data = await response.json();
    const randomIdx = Math.floor(Math.random() * data.meals.length);

    return data.meals[randomIdx].idMeal;
  } catch (error) {
    console.error("Error getting a random Meal", error);
  }
}

async function getMealInfo(mealId) {
  try {
    const id = await mealId;
    const response = await fetch(
      `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`
    );

    const data = await response.json();
    return data.meals[0];
  } catch (error) {
    console.error("Error fetching Meal ID", error);
  }
}

async function renderMeal(parent) {
  try {
    const mealId = await getRandomMeal(); // Espera a obtener el ID de la comida aleatoria
    const data = await getMealInfo(mealId); // Espera a obtener los detalles de la comida

    const mealName = data.strMeal.split(" ").slice(0, 2).join(" ");
    const mealPreview = `${data.strInstructions.slice(0, 45)}...`;
    const mealPic = data.strMealThumb;
    const mealID = data.idMeal;

    // Generar números aleatorios para los interactables
    const hearts = Math.ceil(Math.random() * 100);
    const stars = Math.ceil(Math.random() * 100);
    const favourites = Math.floor(Math.random() * (5 - 3 + 1)) + 3;

    const ratingStar = `<img src="images/icons/yellow-star.svg" alt="" />`;

    const newCard = document.createElement("div");
    newCard.innerHTML = `
    <div class="recipe-card" data-id="${mealID}">
          <div class="recipe-card__img">
            <img class="recipe-card--img" src="${mealPic}" alt="" loading="lazy">
          </div>
          <div class="recipe-card__script">
            <p class="recipe-card__title">${mealName}</p>
            <div class="recipe-card__rating">
              ${ratingStar.repeat(favourites)}
            </div>
            <p class="recipe-card__description">
            ${mealPreview}
            </p>
            <div class="recipe-card__interactables">
              <div class="recipe-card__interactable">
                <img
                  class="card__interactables__img"
                  src="images/icons/heart-235.svg"
                  alt=""
                />
                <p class="card__interactables__text">${hearts}</p>
              </div>
              <div class="recipe-card__interactable">
                <img
                  class="card__interactables__img"
                  src="images/icons/star-1-icon-256x253-3menv6cb.png"
                  alt=""
                />
                <p class="card__interactables__text">${stars}</p>
              </div>
            </div>
          </div>
        </div>`;
    parent.append(newCard);
  } catch (error) {
    console.error("Error rendering the meal:", error);
  }
}

async function renderRecipe(parent) {
  try {
    const mealID = localStorage.getItem("selectedMealID");
    const meal = await getMealInfo(mealID);

    console.log(meal);

    const mealIngredients = [];
    for (let i = 1; i <= 20; i++) {
      let ingredient = `strIngredient${i}`;
      let measure = `strMeasure${i}`;

      if (meal[ingredient]) {
        mealIngredients.push(`${meal[measure]} of ${meal[ingredient]}`);
      }
    }

    //Setting variables info
    const mealName = meal.strMeal;
    const mealInstructions = meal.strInstructions;
    const mealPic = meal.strMealThumb;

    //List of ingredients
    function printIngredients(listOfIngredients) {
      let list = "";

      for (let items of listOfIngredients) {
        let ingred = `• ${items}<br />`;
        list += ingred;
      }

      return list;
    }

    //Creating the new HTML
    const recipeInfo = `
    <div class="display__info">
      <div class="display__info-img">
        <img src="${mealPic}" alt="" />
      </div>
      <div class="display__info-ingredients">
        <p class="info-ingredients__title">${mealName}</p>
        <p class="info-ingredients__description">
          INGREDIENTS:<br /><br />
          ${printIngredients(mealIngredients)}
        </p>
      </div>
    </div>
    <div class="display__process">
      <div class="process--container">
        <p class="process__title">PROCESS:</p>
        <div class="process__box">
          <p class="info-ingredients__description">
          ${mealInstructions}
          </p>
        </div>
      </div>
    </div>`;

    //Clear HTML
    parent.innerHTML = "";

    //Render recipe
    parent.innerHTML = recipeInfo;
  } catch (error) {
    console.error("Error rendering the meal recipe:", error);
  }
}

export { renderMeal, renderRecipe };
