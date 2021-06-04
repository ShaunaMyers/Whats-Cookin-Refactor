import Recipe from './recipe';



let domUpdates = {

    showWelcomeBanner() {
        document.querySelector(".welcome-msg").style.display = "flex";
        document.querySelector(".my-recipes-banner").style.display = "none";
    },


    showAllRecipes() {
        recipes.forEach(recipe => {
            let domRecipe = document.getElementById(`${recipe.id}`);
            domRecipe.style.display = "block";
        });
        this.showWelcomeBanner();
    },


    displayPantryInfo(pantry) {
        pantry.forEach(ingredient => {
            let ingredientHtml = `<li><input type="checkbox" class="pantry-checkbox" id="${ingredient.name}">
            <label for="${ingredient.name}">${ingredient.name}, ${ingredient.count}</label></li>`;
            document.querySelector(".pantry-list").insertAdjacentHTML("beforeend",
                ingredientHtml);
        });
    },

    findCheckedPantryBoxes() {
        let pantryCheckboxes = document.querySelectorAll(".pantry-checkbox");
        let pantryCheckboxInfo = Array.from(pantryCheckboxes)
        let selectedIngredients = pantryCheckboxInfo.filter(box => {
            return box.checked;
        })
        this.showAllRecipes();
        if (selectedIngredients.length > 0) {
            this.findRecipesWithCheckedIngredients(selectedIngredients);
        }
    },

    findRecipesWithCheckedIngredients(selected) {
        let recipeChecker = (arr, target) => target.every(v => arr.includes(v));
        let ingredientNames = selected.map(item => {
            return item.id;
        })
        recipes.forEach(recipe => {
            let allRecipeIngredients = [];
            recipe.ingredients.forEach(ingredient => {
                allRecipeIngredients.push(ingredient.name);
            });
            if (!recipeChecker(allRecipeIngredients, ingredientNames)) {
                let domRecipe = document.getElementById(`${recipe.id}`);
                domRecipe.style.display = "none";
            }
        })
    }
}

export default domUpdates;






