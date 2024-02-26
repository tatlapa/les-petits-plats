export const FilterElements = (recipe) => {
  return {
    createFilterElements() {
      const ingredientsFilter = recipe.ingredients.map((ingredient) => {
        const filterIngredient = document.createElement("button");
        filterIngredient.classList.add("flex", "whitespace-nowrap", "text-ellipsis", "hover:bg-yellow-400", "pl-4", "ingredient", "filter");
        filterIngredient.innerHTML = `<p class="text-sm">${ingredient.ingredient}</p>`;
      
        return filterIngredient;
      });
    
      const filterAppliance = document.createElement("button");
      filterAppliance.classList.add("flex", "whitespace-nowrap", "text-ellipsis", "hover:bg-yellow-400", "pl-4", "appliance", "filter");
      filterAppliance.innerHTML = `<p class="text-sm">${recipe.appliance}</p>`;
    
      const ustensilsFilter = recipe.ustensils.map((ustensil) => {
        const filterUstensil = document.createElement("button");
        filterUstensil.classList.add("flex", "whitespace-nowrap", "text-ellipsis", "hover:bg-yellow-400", "pl-4", "ustensil", "filter");
        filterUstensil.innerHTML = `<p class="text-sm">${ustensil}</p>`;
      
        return filterUstensil;
      });
    
      return [...ingredientsFilter, filterAppliance, ...ustensilsFilter];
    },
  };
}
