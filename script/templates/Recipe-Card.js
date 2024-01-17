export default function createRecipeCard(recipe) {
    return {
        createRecipeCard() {
            const figure = document.createElement('figure');
            figure.classList.add("bg-white", "relative", "rounded-lg");
            const recipeCard = ` <img src="../images/recipe/${recipe.image}" alt="" class="h-64 object-cover w-full rounded-t-lg">
            <span class="time bg-yellow-400 px-4 py-1 rounded-2xl absolute top-6 right-6">${recipe.time}min</span>
            <div class="px-6 pt-8 pb-16">
                <h2 class="font-anton text-lg">${recipe.name}</h2>
                <div class="flex flex-col pt-7 gap-4">
                    <p class="text-gray-400 uppercase">recette</p>
                    <p class="text-sm">${recipe.description}</p>
                </div>
                <div class="flex flex-col pt-7 gap-4">
                    <p class="text-gray-400 uppercase">ingrédients</p>
                    <div class="grid grid-cols-2 gap-y-5">
                    <span>
                        <p class="text-sm">Riz blanc</p>
                        <p class="text-sm text-gray-400">Riz blanc</p>
                    </span>
                    </div>   
                </div>
            </div>`;
            figure.innerHTML = recipeCard;
            return figure;
        }
    };
}