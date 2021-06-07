import ingredient from './ingredient'

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

  searchForRecipe(searchText, ingredientsData) {
    let newSearchText = searchText.toLowerCase();
    let foundIngredientIds = [];

    ingredientsData.forEach(ingredient => {
      // let splitName = ingredient.name.split(' ');
      if (ingredient.name) {
        if (ingredient.name.split(' ').includes(newSearchText)) {
          foundIngredientIds.push(ingredient.id)
        }
      }
    })

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

    console.log("FOUND RECIPES", foundRecipes);
    return foundRecipes;
  }
}

export default Cookbook;