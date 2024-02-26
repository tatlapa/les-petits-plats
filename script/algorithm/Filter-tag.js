export const filterRecipesByTag = (recipes, tag) => {
    const lowerCaseTag = tag.toLowerCase();
  
    const filteredRecipesByTag = recipes.filter(recipe => {
      // Converti les champs de la recette en minuscules et les concaténer en une seule chaîne
      const recipeText = (recipe.name + ' ' +
                          recipe.ingredients.map(i => i.ingredient).join(' ') + ' ' +
                          recipe.appliance + ' ' +
                          recipe.ustensils.join(' ')).toLowerCase();
  
      // Vérifie si le texte de la recette contient le tag
      const matchesTag = recipeText.includes(lowerCaseTag);

      // Retourne vrai si le tag correspond à une partie de la recette
      return matchesTag;
    });

  
    return filteredRecipesByTag;
  }