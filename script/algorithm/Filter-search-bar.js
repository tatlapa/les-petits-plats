export const filterRecipes = (recipes, searchText) => {
  // Converti le texte de recherche en minuscules pour une recherche insensible à la casse
  const lowerCaseSearchText = searchText.toLowerCase();

  // Filtre les recettes
  let filteredRecipes = [];
  for (let i = 0; i < recipes.length; i++) {
    const recipe = recipes[i];

    // Converti les champs de la recette en minuscules et les concaténer en une seule chaîne
    let ingredientsText = '';
    for (let j = 0; j < recipe.ingredients.length; j++) {
      ingredientsText += recipe.ingredients[j].ingredient + ' ';
    }

    const recipeText = (recipe.name + ' ' +
                        ingredientsText +
                        recipe.appliance + ' ' +
                        recipe.ustensils.join(' ')).toLowerCase();
  }

  return filteredRecipes;
}