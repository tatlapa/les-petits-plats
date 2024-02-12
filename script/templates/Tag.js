export const TagElements = () => {
    return {
        createTagElements(filterText) {
            const tagElement = `
            <button class="tag bg-yellow-400 flex justify-between p-4 items-center w-1/6 rounded-xl">
                <p>${filterText}</p>
                <i class="fa-solid fa-xmark"></i>
            </button>
            `
            return tagElement;
        }
    }
}