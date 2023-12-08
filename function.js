// Selecting the element with class "visible" to show search results
const result = document.querySelector(".visible");

const add_fav = document.querySelector(".add-fav");

const hidden = document.querySelector(".hidden");

// Event listener for when the DOM content is fully loaded
document.addEventListener("DOMContentLoaded", () => {reloadContent(); });
function reloadContent(){
  // Getting references to various DOM elements
  const searchInput = document.getElementById("searchInput");
  const itemMenu = document.querySelector(".items-menu");
  const favouritesList = document.getElementById("search-result");
  const favouritesSection = document.getElementById("results");

  // Array to store favorite meals
  let favouriteMeals = [];

  // Function to fetch meals from API based on user input
  const searchMeals = async (query) => {
    // Perform API request
    const meals = await fetchMeals(query);

    // Display search results
    displaySearchResults(meals);
  };

  // Function to display search results
  const displaySearchResults = (meals) => {
    // Clear the existing content
    itemMenu.innerHTML = "";

    meals.forEach((meal) => {
      // Creating individual elements for each meal
      const item = document.createElement("div");
      item.className = "item";

      const img_section = document.createElement("div");
      img_section.classList.add("img-section");
      const img = document.createElement("img");
      img.src = meal["strMealThumb"];
      img_section.appendChild(img);
      item.appendChild(img_section);

      // Creating and setting up elements for meal name
      const item_name = document.createElement("h3");
      item_name.className = "item-name";
      item_name.innerHTML = `<marquee>${meal["strMeal"]}</marquee>`;
      item.appendChild(item_name);

      // Creating and setting up elements for the footer
      const footer = document.createElement("div");
      footer.className = "footer";
      footer.innerHTML = `<a href=${meal["strYoutube"]} style="display: inline-block;" class="youtube"><i class="fa fa-youtube"></i></a>`;
      const recipe = document.createElement("p");
      recipe.className = "recipe";
      recipe.textContent = "Get recipe";
      footer.appendChild(recipe);
      item.appendChild(footer);

      const favorite_btn = document.createElement("button");
      favorite_btn.className = "favorite-btn";
      const fav_icon = document.createElement("i");
      fav_icon.className = "fa fa-heart";
      favorite_btn.appendChild(fav_icon);
      footer.appendChild(favorite_btn);

      favorite_btn.addEventListener("click", () => {
        addToFavourites(meal, fav_icon);
      });

      favcheck(meal, fav_icon);

      // Appending the created item to the itemMenu
      itemMenu.appendChild(item);

      // Click event to view details
      recipe.addEventListener("click", () => {
        // Show the result element
        result.style.display = "block";
        result.innerHTML = "";
        // Create the details markup
        const detail = `
          <i class="fa fa-close" onclick="hideResult()"></i>
          <div style="text-align:center">
            <div class="result-img-section">
              <img src=${meal["strMealThumb"]}>
            </div>
            <h3 class="item-name">${meal["strMeal"]}</h3>
            <div class="footer">
              <a href=${meal["strYoutube"]} style="display: inline-block;" class="youtube"><i class="fa fa-youtube"></i></a>
            </div>
            <div class="recipe-text">
              <p>${meal["strInstructions"]}</p>
            </div>
          </div>`;
        // Insert the details markup to the result element
        result.insertAdjacentHTML("beforeend", detail);
      });


    });
  };

  
  // Event listener for search input
  searchInput.addEventListener("input", (event) => {
    const query = event.target.value.trim();

    // If the query is not empty, perform a search
    if (query.length > 0) {
      searchMeals(query);
    } else {
      // If the query is empty, clear the search results
      itemMenu.innerHTML = "";
    }
  });
  

  
};

const favcheck = (meal, fav_icon) => {
  let favouriteMeals = JSON.parse(localStorage.getItem("favorites")) || [];

  // Check if the meal is not already in the favorites
  if (favouriteMeals.some((favMeal) => favMeal["idMeal"] === meal["idMeal"])) {
    fav_icon.classList.add("fav-color");
    // The meal is in favorites
    // Add the meal to favorites if needed
    // Display updated favorites if needed
  } else {
    fav_icon.classList.remove("fav-color");
    // The meal is not in favorites
    // Remove the meal from favorites if needed
    // Display updated favorites if needed
  }

};

// Function to add meal to favourites
const addToFavourites = (meal, fav_icon) => {

  let favouriteMeals = JSON.parse(localStorage.getItem("favorites")) || [];
  
  // Check if the meal is not already in the favorites
  if (
    !favouriteMeals.some((favMeal) => favMeal["idMeal"] === meal["idMeal"])
  ) {
    fav_icon.classList.add("fav-color");
    // Add the meal to favorites
    favouriteMeals.push(meal);

    // Display updated favorites
    localStorage.setItem("favorites",JSON.stringify(favouriteMeals))
  } else {
    fav_icon.classList.remove("fav-color");
    remove(meal);
    console.log(favouriteMeals);
  }
};

const remove = (meal) => {
  let favouriteMeals = JSON.parse(localStorage.getItem("favorites")) || [];
  // Filter out the removed meal from favorites
  favouriteMeals = favouriteMeals.filter(
    (favMeal) => favMeal["idMeal"] !== meal["idMeal"]
  );
  localStorage.setItem("favorites", JSON.stringify(favouriteMeals));
  
};

// Function to remove meal from favourites
const removeFromFavourites = (meal) => {
  let favouriteMeals = JSON.parse(localStorage.getItem("favorites")) || [];
  // Filter out the removed meal from favorites
  favouriteMeals = favouriteMeals.filter(
    (favMeal) => favMeal["idMeal"] !== meal["idMeal"]
  );
  localStorage.setItem("favorites", JSON.stringify(favouriteMeals));
  add_fav.innerHTML = "";
  reloadContent();
  displayFavourites();
};



function displayFavourites() {
  hidden.style.display = 'block';
  let favaouriteMeals = JSON.parse(localStorage.getItem("favorites")) || [];
  favaouriteMeals.forEach((meal) => {
    // Creating individual elements for each meal
    const item = document.createElement("div");
    item.className = "item";

    const img_section = document.createElement("div");
    img_section.classList.add("img-section");
    const img = document.createElement("img");
    img.src = meal["strMealThumb"];
    img_section.appendChild(img);
    item.appendChild(img_section);

    // Creating and setting up elements for meal name
    const item_name = document.createElement("h3");
    item_name.className = "item-name";
    item_name.innerHTML = `<marquee>${meal["strMeal"]}</marquee>`;
    item.appendChild(item_name);

    // Creating and setting up elements for the footer
    const footer = document.createElement("div");
    footer.className = "footer";
    footer.innerHTML = `<a href=${meal["strYoutube"]} style="display: inline-block;" class="youtube"><i class="fa fa-youtube"></i></a>`;
    const recipe = document.createElement("p");
    recipe.className = "recipe";
    recipe.textContent = "Get recipe";
    footer.appendChild(recipe);
    item.appendChild(footer);

    const trash_btn = document.createElement("button");
    trash_btn.className = "favorite-btn";
    const fav_icon = document.createElement("i");
    fav_icon.className = "fa fa-trash";
    trash_btn.appendChild(fav_icon);
    footer.appendChild(trash_btn);

    trash_btn.addEventListener("click", () => {
      removeFromFavourites(meal);
    });

    // Appending the created item to the itemMenu
    add_fav.appendChild(item);

    // Click event to view details
    recipe.addEventListener("click", () => {
      // Show the result element
      result.style.display = "block";
      result.innerHTML = "";
      // Create the details markup
      const detail = `
          <i class="fa fa-close" onclick="hideResult()"></i>
          <div style="text-align:center">
            <div class="result-img-section">
              <img src=${meal["strMealThumb"]}>
            </div>
            <h3 class="item-name">${meal["strMeal"]}</h3>
            <div class="footer">
              <a href=${meal["strYoutube"]} style="display: inline-block;" class="youtube"><i class="fa fa-youtube"></i></a>
            </div>
            <div class="recipe-text">
              <p>${meal["strInstructions"]}</p>
            </div>
          </div>`;
      // Insert the details markup to the result element
      result.insertAdjacentHTML("beforeend", detail);
    });
  });

}

// Function to fetch meals from API based on user input
async function fetchMeals(query) {
  try {
    // Performing API request using the provided fetchMeals function
    const response = await fetch(
      `https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`
    );
    const data = await response.json();
    // Assuming the API returns an array of meals
    return data["meals"];
  } catch (error) {
    // Log an error if fetching meals fails
    console.error("Error fetching meals:", error);
    return [];
  }
}

// Function to hide the result element
function hideResult() {
  result.style.display = "none";
}

function hideFav() {
  hidden.style.display = "none";
}
