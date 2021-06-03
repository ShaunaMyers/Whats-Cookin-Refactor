import ingredientsData from "./data/ingredient-data";
import recipeData from "./data/recipe-data";

class Recipe {
  constructor(recipe) {
    this.id = recipe.id;
    this.name = recipe.name;
    this.image = recipe.image;
    this.ingredients = recipe.ingredients;
    this.instructions = recipe.instructions;
    this.tags = recipe.tags;
  }

  
  returnIngredientNames() {
    return this.ingredients.map(ing => ing.name);
  }

  calculateIngredientsCost() {
    let ingCost = this.ingredients.forEach(ingredient => {
      let match = ingredientsData.find(ingred => {
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
    return this.instructions.map(instruction => instruction.instruction);
  }

}

export default Recipe;
