export const filterRecipesByTag = (recipes, activeTags) => {
    const lowerCaseTags = activeTags.map(tag => tag.toLowerCase());
  
    const filteredRecipesByTag = recipes.filter(recipe => {
        // Convertir les champs de la recette en minuscules et les concaténer en une seule chaîne
        const recipeText = (recipe.name + ' ' +
                            recipe.ingredients.map(i => i.ingredient).join(' ') + ' ' +
                            recipe.appliance + ' ' +
                            recipe.ustensils.join(' ')).toLowerCase();
        // Vérifier si chaque tag individuel est inclus dans recipeText
        const matchesAllTags = lowerCaseTags.every(tag => recipeText.includes(tag));

        // Retourner vrai si la recette contient tous les tags actifs   
        return matchesAllTags;
    });
    return filteredRecipesByTag;
}
