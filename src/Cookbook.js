class Cookbook {
  constructor(recipeData, ingredientData) {
    this.recipes = recipeData;
    this.ingredients = ingredientData;
  }

  filterByTags(tags) {
    const newFilterTags = typeof tags === "string" ? [tags] : tags;
    let filteredRecipes = [];
    newFilterTags.forEach(tag => {
      this.recipes.forEach(recipe => {
        if (recipe.tags.includes(tag)) {
          filteredRecipes.push(recipe)
        }
      });
    });

    return [...new Set(filteredRecipes)];
  }

  searchForRecipe(searchText) {
    const newSearchText = searchText.toLowerCase();
    return this.recipes.filter(recipe => {
      return recipe.name.includes(newSearchText)
      || recipe.ingredients.find(ingredient => {
        return ingredient.name.includes(newSearchText);
      });
    });
  }
}

export default Cookbook;