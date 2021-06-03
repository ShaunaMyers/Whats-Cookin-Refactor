class Pantry {
    constructor(pantryData) {
        this.contents = pantryData;
        this.pantryIngredients = [];
        this.pantryAmounts = [];
        // this.recipeIngredients = [];
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
        this.evaluateUsersPantry();
        let difference;
        recipe.ingredients.forEach(ingredient => {
            let currentIngredient = this.pantryIngredients.indexOf(ingredient.id);
            if (!this.pantryIngredients.includes(ingredient.id)) {
                this.ingredientsNeeded.push({
                    name: ingredient.id,
                    amount: ingredient.quantity.amount
                })
            } else if (ingredient.quantity.amount >
                this.pantryAmounts[currentIngredient]) {
                difference = ingredient.quantity.amount -
                    this.pantryAmounts[currentIngredient];
                this.ingredientsNeeded.push({
                    name: ingredient.id,
                    amount: difference
                })
            }
        });

        if (this.ingredientsNeeded.length > 0) {
            return 'You do not have enough ingredients to cook this meal. Time to go shopping!'
        } else {
            return this.determineIngredientsNeeded();
        }
    }
    // Determine the amount of missing ingredients still needed to cook a given meal, based on what’s in the user’s pantry.

    determineIngredientsNeeded() {
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