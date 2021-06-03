class Pantry {
    constructor(pantryData) {
        this.contents = pantryData;
        this.pantryIngredients = [];
        this.pantryAmounts = [];
        this.recipeIngredients = [];
        this.ingredientsNeeded = [];
    }


    // Create classes and methods that can:

    // Determine whether a user’s pantry has enough ingredients to cook a given meal.

    evaluateUsersPantry() {
        this.pantryIngredients = this.contents.map(item => item.ingredient);
        this.pantryAmounts = this.contents.map(item => item.amount);
    }

    // Determine if a user has enough ingredients to cook a meal
    // Do I need to evaluate if the amount of each ingredient is enough???

    evaluateUsersIngredients(recipe) {
        this.recipeIngredients = recipe.ingredients.map(ingredient => ingredient.id);

        this.pantryIngredients.forEach(ingredient => {
            if (!this.recipeIngredients.includes(ingredient)) {
                this.ingredientsNeeded.push(ingredient);
            }
        })

        if (this.ingredientsNeeded.length > 0) {
            return 'You do not have enough ingredients to cook this meal. Time to go shopping!'
        } else {
            return 'You have all the necessary ingredients for this recipe! Time to get cooking!'
        }
    }
    // Determine the amount of missing ingredients still needed to cook a given meal, based on what’s in the user’s pantry.

    determineIngredientsNeeded() {
        // At this point I've pulled apart the ingredient ids and the amounts needed
        // I think we need to return a list of the ingredients needed with the amounts
        if (this.ingredientsNeeded.length > 0) {
            return this.ingredientsNeeded;
        } else {
            return 'You have all the necessary ingredients for this recipe! Time to get cooking!'
        }
    }

}

// User Stories
// As a user, I should be able to view what ingredients exist inside of my pantry.
// As a user, I should be able to check my list of recipes to cook and see if my pantry has enough ingredients to cook a meal.
// As a user, I should be told what ingredients are still needed if I don’t have enough ingredients in my pantry to cook the recipe.

export default Pantry;