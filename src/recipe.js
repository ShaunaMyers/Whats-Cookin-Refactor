class Recipe {
  constructor(recipe, ingredientsData) {
    this.id = recipe.id;
    this.name = recipe.name;
    this.image = recipe.image;
    this.ingredients = recipe.ingredients;
    this.ingredientsData = ingredientsData;
    this.instructions = recipe.instructions;
    this.tags = recipe.tags;
  }

  
  returnIngredients() {
    this.calculateIngredientsCost();
    return this.ingredients;
  }

  calculateIngredientsCost() {
    this.ingredients.forEach(ingredient => {
      let match = this.ingredientsData.find(ingred => {
        return ingred.id === ingredient.id;
      });
      return ingredient.cost = match.estimatedCostInCents
    });
    let total = this.ingredients.reduce((acc, curIng) => {
      return (acc += curIng.cost)/100;
    }, 0);
    this.recipeTotal = Math.floor(total).toFixed(2);
    return this.recipeTotal;
  }

  returnInstructions() {
    return this.instructions.map(inst => inst.instruction);
  }

}

export default Recipe;
