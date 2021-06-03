class User {
  constructor(user) {
    this.id = user.id;
    this.name = user.name;
    this.pantry = user.pantry;
    this.favoriteRecipes = [];
    this.recipesToCook = [];
  }
  saveRecipe(recipe) {
    if (!this.favoriteRecipes.includes(recipe)) {
      this.favoriteRecipes.push(recipe);
    }
  }

  removeRecipe(recipe) {
    this.favoriteRecipes = this.favoriteRecipes.filter(favRecipe => {
      if (favRecipe.id !== recipe.id) {
        return favRecipe;
      }
    });
  }

  decideToCook(recipe) {
    if (!this.recipesToCook.includes(recipe)) {
      this.recipesToCook.push(recipe);
    }
  }

  filterRecipes(tags) {
    const newFilterTags = typeof tags === "string" ? [tags] : tags;
    let filteredRecipes = [];
    newFilterTags.forEach(tag => {
      this.favoriteRecipes.forEach(recipe => {
        if (recipe.tags.includes(tag)) {
          filteredRecipes.push(recipe)
        }
      });
    });

    return [...new Set(filteredRecipes)];
  }

  searchForRecipe(keyword) {
    const newSearchText = keyword.toLowerCase();
    return this.favoriteRecipes.filter(recipe => {
      const stringifiedInstructions = recipe.instructions.map(item => {
        return item.instruction;
      }).join(' ').toLowerCase();

      return recipe.name.toLowerCase().includes(newSearchText) ||
        stringifiedInstructions.includes(newSearchText)
    });
  }
  
}

module.exports = User;
