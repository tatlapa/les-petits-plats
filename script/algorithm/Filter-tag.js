export const filterRecipesByTag = (recipes, tag) => {
    const lowerCaseTag = tag.toLowerCase();
  
    const filteredRecipesByTag = recipes.filter(recipe => {
      // Convertir les champs de la recette en minuscules et les concaténer en une seule chaîne
      const recipeText = (recipe.name + ' ' +
                          recipe.ingredients.map(i => i.ingredient).join(' ') + ' ' +
                          recipe.appliance + ' ' +
                          recipe.ustensils.join(' ')).toLowerCase();
  
      // Vérifier si le texte de la recette contient le tag
      const matchesTag = recipeText.includes(lowerCaseTag);

      console.log(`Checking recipe ${recipe.name}: ${matchesTag ? 'matches' : 'does not match'} tag ${tag}`);  
      // Retourner vrai si le tag correspond à une partie de la recette
      return matchesTag;
    });

    console.log(`Filtered recipes: ${filteredRecipesByTag.map(r => r.name).join(', ')}`);

  
    return filteredRecipesByTag;
  }