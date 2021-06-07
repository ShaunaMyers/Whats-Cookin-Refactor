class Cookbook {
  constructor(recipeData, ingredientData) {
    this.recipes = recipeData;
    this.ingredients = ingredientData;
  }

  filterByTags(tags) {
    console.log(tags);

    let filteredResults = [];
    tags.forEach(tag => {
      let allRecipes = this.recipes.filter(recipe => {
        return recipe.tags.includes(tag.id);
      });
      allRecipes.forEach(recipe => {
        if (!filteredResults.includes(recipe)) {
          filteredResults.push(recipe);
        }
      })
    })
    return filteredResults;
    // const newFilterTags = typeof tags === "string" ? [tags] : tags;
    // let filteredRecipes = [];
    // newFilterTags.forEach(tag => {
    //   this.recipes.forEach(recipe => {
    //     if (recipe.tags.includes(tag)) {
    //       filteredRecipes.push(recipe)
    //     }
    //   });
    // });

    // return [...new Set(filteredRecipes)];
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