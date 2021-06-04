import Recipe from './recipe';



let domUpdates = {

    // GENERATE A USER ON LOAD
    generateUser() {
        user = new User(users[Math.floor(Math.random() * users.length)]);
        let firstName = user.name.split(" ")[0];
        let welcomeMsg = `
          <div class="welcome-msg">
            <h1>Welcome ${firstName}!</h1>
          </div>`;
        document.querySelector(".banner-image").insertAdjacentHTML("afterbegin",
            welcomeMsg);
        this.findPantryInfo();
    },

    // CREATE RECIPE CARDS
    createCards() {
        recipeData.forEach(recipe => {
            let recipeInfo = new Recipe(recipe);
            let shortRecipeName = recipeInfo.name;
            recipes.push(recipeInfo);
            if (recipeInfo.name.length > 40) {
                shortRecipeName = recipeInfo.name.substring(0, 40) + "...";
            }
            this.addToDom(recipeInfo, shortRecipeName)
        });
    },

    addToDom(recipeInfo, shortRecipeName) {
        let cardHtml = `
          <div class="recipe-card" id=${recipeInfo.id}>
            <h3 maxlength="40">${shortRecipeName}</h3>
            <div class="card-photo-container">
              <img src=${recipeInfo.image} class="card-photo-preview" alt="${recipeInfo.name} recipe" title="${recipeInfo.name} recipe">
              <div class="text">
                <div>Click for Instructions</div>
              </div>
            </div>
            <h4>${recipeInfo.tags[0]}</h4>
            <img src="../images/apple-logo-outline.png" alt="unfilled apple icon" class="card-apple-icon">
          </div>`
        main.insertAdjacentHTML("beforeend", cardHtml);
    },

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

    findPantryInfo() {
        user.pantry.forEach(item => {
            let itemInfo = ingredientsData.find(ingredient => {
                return ingredient.id === item.ingredient;
            });
            let originalIngredient = pantryInfo.find(ingredient => {
                if (itemInfo) {
                    return ingredient.name === itemInfo.name;
                }
            });
            if (itemInfo && originalIngredient) {
                originalIngredient.count += item.amount;
            } else if (itemInfo) {
                pantryInfo.push({ name: itemInfo.name, count: item.amount });
            }
        });
        this.displayPantryInfo(pantryInfo.sort((a, b) => a.name.localeCompare(b.name)));
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






