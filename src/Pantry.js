class Pantry {
    constructor(pantryData) {
        this.contents = pantryData;
        this.pantryIngredients = [];
        this.pantryAmounts = [];
        this.ingredientsNeeded = [];
    }

    evaluateUsersPantry() {
        this.pantryIngredients = this.contents.map(item => item.ingredient);
        this.pantryAmounts = this.contents.map(item => item.amount);
    }

    evaluateUsersIngredients(recipe) {
        this.evaluateUsersPantry();
        let difference;
        recipe.ingredients.forEach(ingredient => {
            let currentIngredient = this.pantryIngredients.indexOf(ingredient.id);
            if (!this.pantryIngredients.includes(ingredient.id)) {
                this.ingredientsNeeded.push({
                    id: ingredient.id,
                    amount: ingredient.quantity.amount
                })
            } else if (ingredient.quantity.amount >
                this.pantryAmounts[currentIngredient]) {
                difference = ingredient.quantity.amount -
                    this.pantryAmounts[currentIngredient];
                this.ingredientsNeeded.push({
                    id: ingredient.id,
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

    determineIngredientsNeeded() {
        if (this.ingredientsNeeded.length > 0) {
            return this.ingredientsNeeded;
        } else {
            return 'You have all the necessary ingredients for this recipe! Time to get cooking!'
        }
    }

    cookMeal(recipe) {
        if (this.determineIngredientsNeeded() !==
            'You have all the necessary ingredients for this recipe! Time to get cooking!') {
            return 'You do not have enough ingredients to cook this meal. Time to go shopping!'
        } else {
            recipe.ingredients.forEach(ingredient => {
                let currentIngredient = this.pantryIngredients.indexOf(ingredient.id);
                this.pantryAmounts[currentIngredient] -= ingredient.quantity.amount;
            });
        }
    }
}

export default Pantry;