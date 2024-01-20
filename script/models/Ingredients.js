export default function createIngredients(data) {
    return {
        ingredient: data.ingredient,
        quantity: data.quantity,
        unit: data.unit
    };
}
