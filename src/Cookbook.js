import ingredient from './ingredient'

class Cookbook {
  constructor(recipeData, ingredientData) {
    this.recipes = recipeData;
    this.ingredients = ingredientData;
  }

  filterByTags(tags) {
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
  }


  searchForRecipe(searchText, ingredientsData) {
    let newSearchText = searchText.toLowerCase();
    let foundIngredientIds = [];

    ingredientsData.forEach(ingredient => {
      if (ingredient.name) {
        if (ingredient.name.split(' ').includes(newSearchText)) {
          foundIngredientIds.push(ingredient.id)
        }
      }
    })

    return this.checkRecipeData(newSearchText, foundIngredientIds)
  }


  checkRecipeData(newSearchText, foundIngredientIds) {
    let foundRecipes = []

    this.recipes.forEach(recipe => {
      if (recipe.name.split(' ').includes(newSearchText)) {
        foundRecipes.push(recipe)
      }
    })

    this.recipes.forEach(recipe => {
      recipe.ingredients.forEach(ingredient => {
        if (foundIngredientIds.includes(ingredient.id)) {
          foundRecipes.push(recipe);
        }
      })
    })
    return foundRecipes;
  }
}

export default Cookbook;