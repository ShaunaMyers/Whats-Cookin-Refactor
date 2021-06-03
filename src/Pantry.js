class Pantry {
    constructor(pantryData) {
        this.contents = pantryData;
        this.pantryIngredients = [];
        this.pantryAmounts = [];
        this.recipeIngredients = [];
    }


    // Create classes and methods that can:

    // Determine whether a user’s pantry has enough ingredients to cook a given meal.

    evaluateUsersPantry(recipe) {
        // I need the recipe ingredient details for this then 
        // Pass in args for recipe?
        // evaluate recipe
        // recipe holds an array of ingredients
        // in this array, each object has an ingredient id
        // In user data array
        // each user has a pantry array 
        // iterate over users pantry and push to this.pantryIngredients
        this.pantryIngredients = this.contents.map(item => item.ingredient);
        this.recipeIngredients = recipe.ingredients.map(ingredient => ingredient.id);
        // Map would create an array of just the ingredients
        // Iterate over this.pantryIngredients and see if each 

        let userMessage;

        console.log('Pantry INGRED', this.pantryIngredients);
        console.log('recipe INGRED', this.recipeIngredients);
        this.pantryIngredients.forEach(ingredient => {
            if (!this.recipeIngredients.includes(ingredient)) {
                userMessage = 'You do not have enough ingredients to cook this meal.'
            }
        })
        // ingredient id is included in recipe ingredients
        return userMessage;
    }
}

// Determine the amount of missing ingredients still needed to cook a given meal, based on what’s in the user’s pantry.
// User Stories
// As a user, I should be able to view what ingredients exist inside of my pantry.
// As a user, I should be able to check my list of recipes to cook and see if my pantry has enough ingredients to cook a meal.
// As a user, I should be told what ingredients are still needed if I don’t have enough ingredients in my pantry to cook the recipe.

export default Pantry;