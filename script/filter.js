export const displaySelect = () => {
    const buttonRelative0 = document.querySelector(".select-0");
    const buttonRelative1 = document.querySelector(".select-1");
    const buttonRelative2 = document.querySelector(".select-2");
    const absoluteElement0 = document.querySelector(".absolute-0")
    const absoluteElement1 = document.querySelector(".absolute-1")
    const absoluteElement2 = document.querySelector(".absolute-2")
    const roundedElement0 = document.querySelector(".select-rounded-0")
    const roundedElement1 = document.querySelector(".select-rounded-1")
    const roundedElement2 = document.querySelector(".select-rounded-2")

        buttonRelative0.addEventListener("click", () => {
            absoluteElement0.classList.toggle("hidden");

            if (absoluteElement0.classList.contains("hidden")) {
                console.log("hidden")
                    roundedElement0.classList.remove("rounded-t-xl");
                    roundedElement0.classList.add("rounded-xl");
               
            } else {
                console.log("display")
                    roundedElement0.classList.remove("rounded-xl");
                    roundedElement0.classList.add("rounded-t-xl");
            }
        });

        buttonRelative1.addEventListener("click", () => {
            absoluteElement1.classList.toggle("hidden");

            if (absoluteElement1.classList.contains("hidden")) {
                    roundedElement1.classList.remove("rounded-t-xl");
                    roundedElement1.classList.add("rounded-xl");
               
            } else {
                    roundedElement1.classList.remove("rounded-xl");
                    roundedElement1.classList.add("rounded-t-xl");
            }
        });

        buttonRelative2.addEventListener("click", () => {
            absoluteElement2.classList.toggle("hidden");

            if (absoluteElement2.classList.contains("hidden")) {
                    roundedElement2.classList.remove("rounded-t-xl");
                    roundedElement2.classList.add("rounded-xl");
               
            } else {
                    roundedElement2.classList.remove("rounded-xl");
                    roundedElement2.classList.add("rounded-t-xl");
            }
        });
};
