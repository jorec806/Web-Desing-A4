const myrecipeContainer = document.getElementById("myrecipeContainer");

// Set up the headers for student authentication
const myHeaders = new Headers();
myHeaders.append("student_number", "s4918633"); // Replace with actual student number
myHeaders.append("uqcloud_zone_id", "0703141e"); // Replace with actual zone ID

// Request options for the GET request
const requestOptions = {
  method: "GET",
  headers: myHeaders,
  redirect: "follow",
};

async function displayMyRecipes(parent) {
  const response = await fetch(
    "https://damp-castle-86239-1b70ee448fbd.herokuapp.com/decoapi/genericproduct/",
    requestOptions
  );

  const data = await response.json();

  let allCardsHTML = ""; // Variable para almacenar todas las cards

  for (let recipe of data) {
    const recipeName = recipe.product_name;
    const recipeDescription = recipe.product_description.slice(0, 45);
    const recipeIMG = recipe.product_photo;
    const recipeIngredients = recipe.product_owner;

    // Generar números aleatorios para los interactables
    const hearts = Math.ceil(Math.random() * 100);
    const stars = Math.ceil(Math.random() * 100);
    const favourites = Math.floor(Math.random() * (5 - 3 + 1)) + 3;

    const ratingStar = `<img src="images/icons/yellow-star.svg" alt="" />`;

    const randomID = Math.floor(Math.random() * 90000 + 10000).toString() + "J";

    // Crear el HTML directamente
    allCardsHTML += `
        <div class="recipe-card" data-id="${randomID}">
              <div class="recipe-card__img">
                <img class="recipe-card--img" src="${recipeIMG}" alt="" loading="lazy">
              </div>
              <div class="recipe-card__script">
                <p class="recipe-card__title">${recipeName}</p>
                <div class="recipe-card__rating">
                  ${ratingStar.repeat(favourites)}
                </div>
                <p class="recipe-card__description">
                ${recipeDescription}
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
  }

  // Agregar todas las cards al parent de una sola vez
  parent.innerHTML = allCardsHTML;
}

displayMyRecipes(myrecipeContainer);
