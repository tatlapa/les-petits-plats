import Api from "./api/api.js";
import { FilterElements } from "./templates/Filter.js";
import { RecipeCard } from "./templates/Recipe-Card.js";
import { displaySelect } from "./movement/filter-select.js";
import { TagElements } from "./templates/Tag.js";
import { filterRecipesByTag } from './algorithm/Filter-Recipes.js';

const recipesApi = new Api("./data/recipes.json");

const recipesSection = document.querySelector(".recipes_section");
const filterIngredient = document.querySelector(".filter_ingredient");
const filterAppliance = document.querySelector(".filter_appliance");
const filterUstensil = document.querySelector(".filter_ustensils");
const searchInput = document.querySelector('#search');
const tagSection = document.querySelector(".tag_section");

let activeTags = [];


const displayRecipes = async (recipesData) => {
  const recipes = recipesData;

  let nbRecipes = document.querySelector('#nb_recipes');

  recipesSection.innerHTML = '';

  recipes.forEach((recipe) => {
    const templateRecipeCard = RecipeCard(recipe);
    const recipeCard = templateRecipeCard.createRecipeCard();
    recipesSection.appendChild(recipeCard);
  });

  nbRecipes.textContent = recipes.length + " recettes";

  if (recipes.length === 0) {
    recipesSection.innerHTML = `<p class="no-recipe">Aucune recette ne contient "${searchInput.value}" vous pouvez chercher «tarte aux pommes », « poisson », etc...</p>`
  }
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

  filter.forEach(button => {
    button.addEventListener('click', function(event) {
      const filterText = event.target.textContent;
      activeTags.push(filterText);
      const filteredRecipesByTag = filterRecipesByTag(recipes, activeTags);
  
      recipesSection.innerHTML = '';
      
      // Si filteredRecipesByTag est vide, ne pas appeler displayRecipes
      if (filteredRecipesByTag.length >= 0) {
        displayRecipes(filteredRecipesByTag);
      }
    });
  });

  const removeTag = () => {
    const tags = document.querySelectorAll(".tag");
    
    tags.forEach((tag) => {
      tag.addEventListener("click", function(event) {
        const filterText = tag.textContent.trim();
          
        // Filtrer activeTags en gardant seulement les éléments dont le texte est différent de filterText
        activeTags = activeTags.filter(activeTag => activeTag.trim() !== filterText);        

        // Supprimer l'élément de la page
        tag.remove();
    
        const filteredRecipesByTag = filterRecipesByTag(recipes, activeTags);
    
        // Afficher les recettes filtrées
        recipesSection.innerHTML = '';
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

let lastSearchText = '';
const searchButton = document.querySelector('#search_button');

// Gestionnaire d'événements pour la barre de recherche
searchInput.addEventListener('input', function() {
  if (searchInput.value.length === 0) {
    handleSearch();
  }
});

searchInput.addEventListener('keyup', function(event) {
  if (event.key === 'Enter') {
    handleSearch();
  }
});

// Gestionnaire d'événements pour le bouton de recherche
searchButton.addEventListener('click', handleSearch);

async function handleSearch() {
  const searchText = searchInput.value;

  recipesSection.innerHTML = ''; 

  if (searchText.length >= 3) {
    activeTags.push(searchText);
    lastSearchText = searchText;
  } else if (lastSearchText) {
    const index = activeTags.indexOf(lastSearchText);
    if (index > -1) {
      activeTags.splice(index, 1);
    }
    lastSearchText = '';
  }

  const allRecipes = await recipesApi.get();
  const filteredRecipes = filterRecipesByTag(allRecipes, activeTags);

  recipesSection.innerHTML = '';

  displayRecipes(filteredRecipes);
}


displayFilters();
displayRecipes(await recipesApi.get());
displaySelect();







