export default function createFilterElements(recipe) { 
    return {
        createFilterElements() {
            const filterElements = document.createElement('button');
            filterElements.classList.add("flex", "items-center", "hover:bg-yellow-400", "pl-4");
            let filterElementsCard = ``; 
                recipe.ingredients.forEach(element => {
                filterElementsCard +=
                `<p class="text-sm">${element.ingredient}</p>`;
            });
            
            filterElements.innerHTML = filterElementsCard;
            return filterElements;
        }
    }
}