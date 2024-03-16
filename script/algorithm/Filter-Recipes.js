export const filterRecipesByTag = (recipes, activeTags) => {
    const lowerCaseTags = activeTags.map(tag => tag.toLowerCase());
  
    let filteredRecipesByTag = [];
    for (let i = 0; i < recipes.length; i++) {
      const recipe = recipes[i];
  
      // Convertir les champs de la recette en minuscules et les concaténer en une seule chaîne
      let ingredientsText = '';
      for (let j = 0; j < recipe.ingredients.length; j++) {
        ingredientsText += recipe.ingredients[j].ingredient + ' ';
      }
  
      const recipeText = (recipe.name + ' ' +
                          ingredientsText +
                          recipe.appliance + ' ' +
                          recipe.ustensils.join(' ')).toLowerCase();

  
      // Vérifier si chaque tag individuel est inclus dans recipeText
      let matchesAllTags = true;
      for (let k = 0; k < lowerCaseTags.length; k++) {
        if (!recipeText.includes(lowerCaseTags[k])) {
          matchesAllTags = false;
          break;
        }
      }
  
      // Ajouter la recette à filteredRecipesByTag si elle contient tous les tags actifs
      if (matchesAllTags) {
        filteredRecipesByTag.push(recipe);
      }
    }
    return filteredRecipesByTag;
  }