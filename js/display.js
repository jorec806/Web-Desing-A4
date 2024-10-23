import { renderRecipe } from "./api.js";

const recipeDisplay = document.getElementById("recipeDisplay");
const form = document.getElementById("recipeForm");

renderRecipe(recipeDisplay);

form.addEventListener("submit", function (event) {
  event.preventDefault();

  // Create headers for authentication
  const myHeaders = new Headers();
  myHeaders.append("student_number", "s4918633");
  myHeaders.append("uqcloud_zone_id", "0703141e");

  // Create FormData from the form
  const formData = new FormData(form);

  // Prepare the fetch request options
  const requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: formData, // Pass the serialized form data
    redirect: "follow",
  };

  fetch(
    "https://damp-castle-86239-1b70ee448fbd.herokuapp.com/decoapi/genericproduct/",
    requestOptions
  )
    .then((response) => response.json()) // Convert response to JSON
    .then((result) => {
      console.log(result); // Log the result to the console
      // process the result here

      window.location.href = "/assessment/myrecipes.html";
    })
    .catch((error) => console.error("Error:", error)); // handle any errors that occur
});
