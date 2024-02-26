import Api from "./api/api.js";
import { FilterElements } from "./templates/Filter.js";
import { RecipeCard } from "./templates/Recipe-Card.js";
import { displaySelect } from "./movement/filter-select.js";
import { TagElements } from "./templates/Tag.js";
import { filterRecipes } from './algorithm/Filter-search-bar.js';
import { filterRecipesByTag } from './algorithm/Filter-tag.js';

const recipesApi = new Api("./data/recipes.json");

const recipesSection = document.querySelector(".recipes_section");
const filterIngredient = document.querySelector(".filter_ingredient");
const filterAppliance = document.querySelector(".filter_appliance");
const filterUstensil = document.querySelector(".filter_ustensils");
const searchInput = document.querySelector('#search');
const tagSection = document.querySelector(".tag_section");

const displayRecipes = async (recipesData) => {
    const recipes = recipesData;
    let nbRecipes = document.querySelector('#nb_recipes');
    let counterRecipes;

    recipes.forEach((recipe) => {

      const templateRecipeCard = RecipeCard(recipe);
      const recipeCard = templateRecipeCard.createRecipeCard();

      recipesSection.appendChild(recipeCard);

      counterRecipes = recipes.length;
      nbRecipes.textContent = counterRecipes + " recettes";
    });
};

const displayFilters = async () => {

  //section filtres

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

  //Fin de la section input

  // Section tag
  
  // Affichage des recettes filtrées par tag
  const filter = document.querySelectorAll(".filter");
  let activeTags = [];

  filter.forEach(button => {
    button.addEventListener('click', function(event) {
      // Récupérez le texte du bouton de filtre cliqué

      const filterText = event.target.textContent;
      console.log(filteredRecipesByTag)
      activeTags.push(filterText);
      const filteredRecipesByTag = filterRecipesByTag(recipes, activeTags);

      recipesSection.innerHTML = '';

      // Affichage de vos recettes avec les recettes filtrées
      displayRecipes(filteredRecipesByTag);
    });
  });

  const removeTag = () => {
    const tags = document.querySelectorAll(".tag");
    
    tags.forEach((tag) => {
      tag.addEventListener("click", function(event) {
        tag.remove();

        const filterText = event.target.textContent;
        activeTags.push(filterText);
        const filteredRecipesByTag = filterRecipesByTag(recipes, activeTags);
  
        // Afficher les recettes filtrées
        displayRecipes(filteredRecipesByTag);
      });
    });
  }
  
  
  filter.forEach((tag) => {
  
    let filterText = tag.textContent;
  
    const templateTagElements = TagElements(tag);
    const tagElement = templateTagElements.createTagElements(filterText);
  
    tag.addEventListener("click", () => {
       tagSection.innerHTML += tagElement;
       removeTag();
    });
  }); //Fin de la section tag
}; // Fin de la fonction displayFilters



let timeoutId;

// Gestionnaire d'événements pour la barre de recherche
searchInput.addEventListener('input', () => {
  clearTimeout(timeoutId); // Annule le précédent setTimeout

  timeoutId = setTimeout(async () => {
    const searchText = searchInput.value;

    recipesSection.innerHTML = ''; 

    if (searchText.length >= 3) {
      const allRecipes = await recipesApi.get();
      const filteredRecipes = filterRecipes(allRecipes, searchText);

      recipesSection.innerHTML = '';

      displayRecipes(filteredRecipes);
    } else {
      displayRecipes(await recipesApi.get());
    }
  }, 500); // Attend 500 millisecondes avant de faire la requête
});


displayFilters();
displayRecipes(await recipesApi.get());
displaySelect();







