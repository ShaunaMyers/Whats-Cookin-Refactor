class Recipe {
  constructor(recipe) {
    this.id = recipe.id;
    this.name = recipe.name;
    this.image = recipe.image;
    this.ingredients = recipe.ingredients;
    this.instructions = recipe.instructions;
    this.tags = recipe.tags;
  }
  calculateIngredientsCost() {
    return this.ingredients.map(i => {
      ingredientData.find(ingredient => ingredient === i);
    });
  }

  returnInstructions() {
    return this.instructions;
  }
}

export default Recipe;
