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
        return recipe.tags.includes(tag);
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
    let lowercaseSearchText = searchText.toLowerCase();
    let foundIngredientIds = [];

    ingredientsData.forEach(ingredient => {
      if (ingredient.name) {
        if (ingredient.name.split(' ').includes(lowercaseSearchText)) {
          foundIngredientIds.push(ingredient.id)
        }
      }
    })
    return this.checkRecipeData(lowercaseSearchText, foundIngredientIds)
  }


  checkRecipeData(lowercaseSearchText, foundIngredientIds) {
    let foundRecipes = []

    this.recipes.forEach(recipe => {
      if (recipe.name.split(' ').includes(lowercaseSearchText)) {
        foundRecipes.push(recipe)
      }
    })

    this.recipes.forEach(recipe => {
      recipe.ingredients.forEach(ingredient => {
        if (foundIngredientIds.includes(ingredient.id) && !foundRecipes.includes(recipe)) {
          foundRecipes.push(recipe);
        }
      })
    })
    return foundRecipes;
  }
}

export default Cookbook;