import Api from "./api/api.js";
import Recipe from "./models/Recipe.js";
import FilterElements from "./templates/Filter.js";
import RecipeCard from "./templates/Recipe-Card.js";
import { displaySelect } from "./algorithm/filter-select.js";

const recipesApi = new Api("../data/recipes.json");

const recipesSection = document.querySelector(".recipes_section");

const filterSelect = document.querySelector(".filter_select");

const displayRecipes = async () => {
    const recipesData = await recipesApi.get();
    const recipes = recipesData;

    recipes.map((recipe) => Recipe(recipe)).forEach((recipe) => {

      const templateRecipeCard = RecipeCard(recipe);
      const recipeCard = templateRecipeCard.createRecipeCard();

      recipesSection.appendChild(recipeCard);

    });
};

const displayFilters = async () => {
  const recipesData = await recipesApi.get();
  const recipes = recipesData;

  console.log(recipes)

  recipes.forEach((recipe) => {

    console.log(recipe)

    const templateFilterElements = FilterElements(recipe);
    const filterElements = templateFilterElements.createFilterElements();


    filterSelect.appendChild(filterElements);
  });
}

displayFilters();
displayRecipes();
displaySelect();
