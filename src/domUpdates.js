import Recipe from './recipe';
import User from './user';
import tags from './scripts';
import './images/apple-logo.png';
import './images/apple-logo-outline.png';
import './images/cookbook.png';
import './images/green-apples.jpg';
import './images/search.png';
import './images/seasoning.png';
import './images/pancakes.jpg';

let main = document.querySelector("main");
let tagList = document.querySelector(".tag-list");
let fullRecipeInfo = document.querySelector(".recipe-instructions");

// i dont think we should have any imports if dom/data separated fully. will cont to work on this....


let domUpdates = {

    // GENERATE USER ON LOAD
    generateAllInfo(user, ingredientsData, pantryInfo, cookbook) {
        this.findPantryInfo(user, ingredientsData, pantryInfo);
        this.displayUserGreeting(user);
        this.createCards(cookbook);
    },

    displayUserGreeting(user) {
        let firstName = user.name.split(" ")[0];
        let welcomeMsg = `
          <div class="welcome-msg">
            <h1>Welcome ${firstName}!</h1>
          </div>`;
        document.querySelector(".banner-image").insertAdjacentHTML("afterbegin",
            welcomeMsg);
    },

    // ADD RECIPE CARDS TO DOM
    addCardsToDom(recipeInfo, shortRecipeName) {
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

    // FILTER BY RECIPE TAGS
    listTags() {
        tags.forEach(tag => {
            let tagHtml = `<li><input type="checkbox" class="checked-tag" id="${tag}">
            <label for="${tag}">${tag}</label></li>`;
            tagList.insertAdjacentHTML("beforeend", tagHtml);
        });
    },

    hideUnselectedRecipes(foundRecipes) {
        foundRecipes.forEach(recipe => {
            let domRecipe = document.getElementById(`${recipe.id}`);
            domRecipe.style.display = "none";
        });
    },

    showSavedRecipes() {
        let recipes = user.favoriteRecipes;
        let unsavedRecipes = recipes.filter(recipe => {
            return !user.favoriteRecipes.includes(recipe.id);
        });
        unsavedRecipes.forEach(recipe => {
            let domRecipe = document.getElementById(`${recipe.id}`);
            domRecipe.style.display = "none";
        });
        this.showMyRecipesBanner();
    },

    // CREATE RECIPE INSTRUCTIONS
    openRecipeInfo(event) {
        fullRecipeInfo.insertAdjacentHTML("beforebegin", "<section id='overlay'></div>");
    },

    generateRecipeTitle(recipe, ingredients) {
        let recipeTitle = `
          <button id="exit-recipe-btn">X</button>
          <h3 id="recipe-title">${recipe.name}</h3>
          <h4>Ingredients</h4>
          <p>${ingredients}</p>`
        fullRecipeInfo.insertAdjacentHTML("beforeend", recipeTitle);
    },

    addRecipeImage(recipe) {
        document.getElementById("recipe-title").style.backgroundImage = `url(${recipe.image})`;
    },

    generateIngredients(recipe) {
        return recipe.ingredients.map(i => {
            return `${i.name} (${i.quantity.amount} ${i.quantity.unit})`
        }).join(", ");
    },

    generateInstructions(recipe) {
        let instructionsList = "";
        let instructions = recipe.instructions.map(i => {
            return i.instruction
        });
        instructions.forEach(i => {
            instructionsList += `<li>${i}</li>`
        });
        fullRecipeInfo.insertAdjacentHTML("beforeend", "<h4>Instructions</h4>");
        fullRecipeInfo.insertAdjacentHTML("beforeend", `<ol>${instructionsList}</ol>`);
    },

    exitRecipe() {
        while (fullRecipeInfo.firstChild &&
            fullRecipeInfo.removeChild(fullRecipeInfo.firstChild));
        fullRecipeInfo.style.display = "none";
        document.getElementById("overlay").remove();
    },

    // TOGGLE DISPLAYS
    showMyRecipesBanner() {
        document.querySelector(".welcome-msg").style.display = "none";
        document.querySelector(".my-recipes-banner").style.display = "block";
    },

    showWelcomeBanner() {
        document.querySelector(".welcome-msg").style.display = "flex";
        document.querySelector(".my-recipes-banner").style.display = "none";
    },

    toggleMenu() {
        var menuDropdown = document.querySelector(".drop-menu");
        console.log(this); // returns the button el - including this got the menuDropdown functioning
        this.menuOpen = !this.menuOpen;
        if (this.menuOpen) {
            menuDropdown.style.display = "block";
        } else {
            menuDropdown.style.display = "none";
        }
    },

    showAllRecipes() {
        recipes.forEach(recipe => {
            let domRecipe = document.getElementById(`${recipe.id}`);
            domRecipe.style.display = "block";
        });
        this.showWelcomeBanner();
    },

    // CREATE AND USE PANTRY
    // findPantryInfo(user, ingredientsData, pantryInfo) {
    //     user.pantry.forEach(item => {
    //         let itemInfo = ingredientsData.find(ingredient => {
    //             return ingredient.id === item.ingredient;
    //         });
    //         let originalIngredient = pantryInfo.pantryIngredients.find(ingredient => {
    //             if (itemInfo) {
    //                 return ingredient.name === itemInfo.name;
    //             }
    //         });
    //         if (itemInfo && originalIngredient) {
    //             originalIngredient.count += item.amount;
    //         } else if (itemInfo) {
    //             pantryInfo.pantryIngredients.push({ name: itemInfo.name, count: item.amount });
    //         }
    //     });
    //     this.displayPantryInfo(pantryInfo.pantryIngredients.sort((a, b) => a.name.localeCompare(b.name)));
    // },

    displayPantryInfo(pantry) {
        pantry.forEach(ingredient => {
            let ingredientHtml = `<li><input type="checkbox" class="pantry-checkbox" id="${ingredient.name}">
            <label for="${ingredient.name}">${ingredient.name}, ${ingredient.count}</label></li>`;
            document.querySelector(".pantry-list").insertAdjacentHTML("beforeend",
                ingredientHtml);
        });
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






