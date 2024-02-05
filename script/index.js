import Api from "./api/api.js";
import FilterElements from "./templates/Filter.js";
import RecipeCard from "./templates/Recipe-Card.js";
import { displaySelect } from "./movement/filter-select.js";
import TagElements from "./templates/Tag.js";

const recipesApi = new Api("../data/recipes.json");

const recipesSection = document.querySelector(".recipes_section");

//Variables for filters
const filterIngredient = document.querySelector(".filter_ingredient");
const filterAppliance = document.querySelector(".filter_appliance");
const filterUstensil = document.querySelector(".filter_ustensils");

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

  //section filters

  const recipesData = await recipesApi.get();
  const recipes = recipesData;

  let arrayIngredients = new Set();
  let arrayAppliances = new Set();
  let arrayUstensils = new Set();

  recipes.forEach((recipe) => {
    const templateFilterElements = FilterElements(recipe);
    const filterElements = templateFilterElements.createFilterElements();

    filterElements.forEach((filterElement) => {
      const textContentLower = filterElement.textContent.toLowerCase();
    
      if (filterElement.classList.contains('ingredient')) {
        if (!Array.from(arrayIngredients).some(ingredient => ingredient.textContent.toLowerCase() === textContentLower)) {
          arrayIngredients.add(filterElement);
        }
      } else if (filterElement.classList.contains('appliance')) {
        if (!Array.from(arrayAppliances).some(appliance => appliance.textContent.toLowerCase() === textContentLower)) {
          arrayAppliances.add(filterElement);
        }
      } else if (filterElement.classList.contains('ustensil')) {
        if (!Array.from(arrayUstensils).some(ustensil => ustensil.textContent.toLowerCase() === textContentLower)) {
          arrayUstensils.add(filterElement);
        }
      }
    });
  });

  arrayIngredients.forEach((uniqueIngredient) => {
    filterIngredient.appendChild(uniqueIngredient);
  });

  arrayAppliances.forEach((uniqueAppliance) => {
    filterAppliance.appendChild(uniqueAppliance);
  });

  arrayUstensils.forEach((uniqueUstensil) => {
    filterUstensil.appendChild(uniqueUstensil);
  });

  //section tag

  const tagSection = document.querySelector(".tag_section");
  const tagSelect = document.querySelectorAll(".tag_select");

  const removeTag = () => {
    const tagElement = document.querySelectorAll(".tag");
  
    tagElement.forEach((tag) => {
      tag.addEventListener("click", () => {
        tag.remove();
      });
    });
  }
  
  tagSelect.forEach((tag) => {
  
    let filterText = tag.textContent;
  
    const templateTagElements = TagElements(tag);
    const tagElement = templateTagElements.createTagElements(filterText);
  
    tag.addEventListener("click", () => {
       tagSection.innerHTML += tagElement;
       removeTag();
    });
  
  });

  // section input

const inputIngredient = document.querySelector(".input-ingredient");
const inputAppliance = document.querySelector(".input-appliance");
const inputUstensil = document.querySelector(".input-ustensil");

const ingredientTags = document.querySelectorAll(".ingredient");
const applianceTags = document.querySelectorAll(".appliance");
const ustensilTags = document.querySelectorAll(".ustensil");

const filterTags = (input, tags) => {
  input.addEventListener('input', () => {
    const searchText = input.value.toLowerCase();

    tags.forEach(tag => {
      const tagText = tag.textContent.toLowerCase();
      if (tagText.includes(searchText)) {
        tag.style.display = "";
      } else {
        tag.style.display = "none";
      }
    });
  });
}

filterTags(inputIngredient, ingredientTags);
filterTags(inputAppliance, applianceTags);
filterTags(inputUstensil, ustensilTags);
};

displayFilters();
displayRecipes();
displaySelect();



