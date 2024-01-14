import Api from "../script/api.js";
import { displaySelect } from "./filter.js";

const recipesApi = new Api("../data/recipes.json");
const recipesData = await recipesApi.get();

console.log(recipesData)

displaySelect();