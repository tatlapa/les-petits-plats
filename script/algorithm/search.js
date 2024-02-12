// search.js

export const filterRecipes =(recipes, searchText) => {
    // Convertir le texte de recherche en minuscules pour une recherche insensible à la casse
    const lowerCaseSearchText = searchText.toLowerCase();
  
    // Filtrer les recettes
    const filteredRecipes = recipes.filter(recipe => {
      // Convertir les champs de la recette en minuscules et les concaténer en une seule chaîne
      const recipeText = (recipe.name + ' ' +
                          recipe.ingredients.map(i => i.ingredient).join(' ') + ' ' +
                          recipe.appliance + ' ' +
                          recipe.ustensils.join(' ')).toLowerCase();
  
      // Vérifier si le texte de la recette contient le texte de recherche
      return recipeText.includes(lowerCaseSearchText);
    });
  
    return filteredRecipes;
  }