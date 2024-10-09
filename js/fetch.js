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

async function selectRandomCategory() {
  try {
    const categoryArr = await getCategories();
    const randomIndex = parseInt(Math.random() * categoryArr.length);
    const randomCategory = categoryArr[randomIndex];

    return randomCategory;
  } catch (error) {
    console.error(error);
  }
}

async function getRandomMeal() {
  try {
    const category = await selectRandomCategory();
    console.log(category);

    const response = await fetch(
      `https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`
    );

    const data = await response.json();
    const randomIndex = parseInt(Math.random() * data.meals.length);

    console.log(data.meals[randomIndex]);
    return data.meals[randomIndex];
  } catch (error) {
    console.error("Error getting a random Meal", error);
  }
}

getRandomMeal();
