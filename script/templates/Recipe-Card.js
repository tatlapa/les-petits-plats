export const RecipeCard = (recipe) => {

    return {
        createRecipeCard() {
            const figure = document.createElement('figure');
            figure.classList.add("bg-white", "relative", "rounded-lg", "recipe");
            let recipeCard = `<img src="../images/recipe/${recipe.image}" alt="" class="h-64 object-cover w-full rounded-t-lg">
            <span class="bg-yellow-400 px-4 py-1 rounded-2xl absolute top-6 right-6">${recipe.time}min</span>
            <div class="px-6 pt-8 pb-16">
                <h2 class="font-anton text-lg">${recipe.name}</h2>
                <div class="flex flex-col pt-7 gap-4">
                    <p class="text-gray-400 uppercase">recette</p>
                    <p class="text-sm">${recipe.description}</p>
                </div>
                <div class="flex flex-col pt-7 gap-4">
                    <p class="text-gray-400 uppercase">ingrédients</p>
                    <div class="grid grid-cols-2 gap-y-5">`;
                    recipe.ingredients.forEach(ingredient => {
                        recipeCard+= `<span>
                        <p class="text-sm">${ingredient.ingredient}</p>
                        <p class="text-sm text-gray-400">${ingredient.quantity ?? ""} ${ingredient.unit ?? ""}</p>
                    </span>`;
                        
                    });
                    recipeCard+=`</div>
                    </div>
                </div>`;
            figure.innerHTML = recipeCard;
            
            return figure;
        }
    };
}