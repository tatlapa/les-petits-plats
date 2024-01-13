export const displaySelect = () => {
    const selects = document.querySelectorAll(".select");

    selects.forEach((select) => {
        const inputSelect = select.nextElementSibling; // Supposant que .input-select est le frère suivant de .select

        select.addEventListener("click", () => {
            inputSelect.classList.toggle("hidden");
            inputSelect.classList.add("flex");
        });
    });
};
