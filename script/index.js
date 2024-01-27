import Api from "./api/api.js";
import FilterElements from "./templates/Filter.js";
import RecipeCard from "./templates/Recipe-Card.js";
import { displaySelect } from "./algorithm/filter-select.js";

const recipesApi = new Api("../data/recipes.json");

const recipesSection = document.querySelector(".recipes_section");

const filterSelect = document.querySelector(".filter_select");

const displayRecipes = async () => {
    const recipesData = await recipesApi.get();
    const recipes = recipesData;

    recipes.forEach((recipe) => {

      const templateRecipeCard = RecipeCard(recipe);
      const recipeCard = templateRecipeCard.createRecipeCard();

      recipesSection.appendChild(recipeCard);

    });
};

const displayFilters = async () => {
  const recipesData = await recipesApi.get();
  const recipes = recipesData;
  let arrayIngredients = new Set();

  recipes.forEach((recipe) => {
    const templateFilterElements = FilterElements(recipe);
    const filterElements = templateFilterElements.createFilterElements();

    filterElements.forEach((filterElement) => {
      const existingButton = [...arrayIngredients].find(
        (button) => button.textContent.toLowerCase() === filterElement.textContent.toLowerCase()
        );

      if (!existingButton) {
        arrayIngredients.add(filterElement);
      }
    });
  });

  arrayIngredients = [...arrayIngredients];


  arrayIngredients.forEach((uniqueIngredient) => {
  filterSelect.appendChild(uniqueIngredient);
  });
};

displayFilters();
displayRecipes();
displaySelect();
