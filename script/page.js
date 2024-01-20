import Api from "../script/api.js";
import Recipe from "./models/Recipe.js";
import Ingredients from "./models/Ingredients.js";
import RecipeCard from "./templates/Recipe-Card.js";
import { displaySelect } from "./filter.js";

const recipesApi = new Api("../data/recipes.json");

const recipesSection = document.querySelector(".recipes_section");

const displayRecipes = async () => {
    const recipesData = await recipesApi.get();
    const recipes = recipesData;


    recipes.map((recipe) => Recipe(recipe)).forEach((recipe) => {
        
      const template = RecipeCard(recipe);
      const recipeCard = template.createRecipeCard();

      recipesSection.appendChild(recipeCard);

    });
};

displayRecipes();
displaySelect();
