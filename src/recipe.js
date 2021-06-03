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
    // console.log(this.ingredients.map(i => {
    //   ingredientsData.find(ingredient => ingredient === i));
    // return this.ingredients.map(i => {
    //   ingredientsData.find(ingredient => ingredient === i);
    // });
  }

  returnInstructions() {
    return this.instructions;
  }
}

export default Recipe;
