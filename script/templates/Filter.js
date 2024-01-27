export default function FilterElements(recipe) {
    return {
      createFilterElements() {
        return recipe.ingredients.map((element) => {
          const filterElement = document.createElement("button");
          filterElement.classList.add("flex", "whitespace-nowrap","text-ellipsis", "hover:bg-yellow-400","pl-4");
          filterElement.innerHTML = `<p class="text-sm">${element.ingredient}</p>`;
  
          return filterElement;
        });
      },
    };
  }
  