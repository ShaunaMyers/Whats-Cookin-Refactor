import Recipe from './recipe';
import './images/apple-logo.png';
import './images/apple-logo-outline.png';
import './images/cookbook.png';
import './images/green-apples.jpg';
import './images/search.png';
import './images/seasoning.png';
import './images/pancakes.jpg';

let fullRecipeInfo = document.querySelector(".recipe-instructions");
let main = document.querySelector("main");
let menuOpen = false;
// let pantryInput = document.querySelector("pantry-input");
let tagList = document.querySelector(".tag-list");

import ingredientsData from './data/sample-ingredient-data';

// let recipes = [];
 
let domUpdates = {

    changeARIAChkd(event) {
        event.preventDefault();
        let el = event.target.closest("input")
            if (el.getAttribute("aria-checked", "false")) {
            el.setAttribute("aria-checked", "true");
        } else if (el.getAttribute("aria-checked", "true")) {
            el.setAttribute("aria-checked", "false");
        }
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

    // CREATE RECIPE CARDS
    createCards(cookbook) {
        let recipeCollection;
        if (cookbook.recipes) {
            recipeCollection = cookbook.recipes
        } else {
            recipeCollection = cookbook;
            main.innerHTML = " ";
        }
        recipeCollection.forEach(recipe => {
            let recipes = [];
            let recipeInfo = new Recipe(recipe);
            let shortRecipeName = recipeInfo.name;
            recipes.push(recipeInfo);
            if (recipeInfo.name.length > 40) {
                shortRecipeName = recipeInfo.name.substring(0, 40) + "...";
            }
            this.addCardsToDom(recipeInfo, shortRecipeName)
        });
    },

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
    listTags(allTags) {
        allTags.forEach(tag => {
            tagList.insertAdjacentHTML("beforeend", `<li><input type="checkbox" role="checkbox" aria-checked="false" class="checked-tag" id="${tag}">
            <label for="${tag}">${domUpdates.capitalize(tag)}</label></li>`);
        });
    },


    capitalize(words) {
        return words.split(" ").map(word => {
            return word.charAt(0).toUpperCase() + word.slice(1);
        }).join(" ");
    },

    filterRecipes(filtered) {
        let foundRecipes = recipes.filter(recipe => {
            return !filtered.includes(recipe);
        });
        hideUnselectedRecipes(foundRecipes)
    },

    hideUnselectedRecipes(foundRecipes) {
        foundRecipes.forEach(recipe => {
            let domRecipe = document.getElementById(`${recipe.id}`);
            domRecipe.style.display = "none";
        });
    },

    // FAVORITE RECIPE FUNCTIONALITY
    addToMyRecipes(event) {
        if (event.target.className === "card-apple-icon") {
            let cardId = parseInt(event.target.closest(".recipe-card").id)
            if (!user.favoriteRecipes.includes(cardId)) {
                event.target.src = "../images/apple-logo.png";
                user.saveRecipe(cardId);
            } else {
                event.target.src = "../images/apple-logo-outline.png";
                user.removeRecipe(cardId);
            }
        } else if (event.target.id === "exit-recipe-btn") {
            exitRecipe();
        } else if (isDescendant(event.target.closest(".recipe-card"), event.target)) {
            openRecipeInfo(event);
        }
    },

    isDescendant(parent, child) {
        let node = child;
        while (node !== null) {
            if (node === parent) {
                return true;
            }
            node = node.parentNode;
        }
        return false;
    },

    showSavedRecipes(cookbook, user) {
        let unsavedRecipes = cookbook.recipes.filter(recipe => {
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
          <p>${domUpdates.capitalize(ingredients)}</p>`
        fullRecipeInfo.insertAdjacentHTML("beforeend", recipeTitle);
    },

    addRecipeImage(recipe) {
        document.getElementById("recipe-title").style.backgroundImage = `url(${recipe.image})`;
    },

    generateIngredients(recipe) {
        let theseIngs;
        return theseIngs = recipe.ingredients.map(i => {
            ingredientsData.forEach(data => {
                if (data.id === i.id) {
                    i.name = data.name;
                }
            })
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

    // SEARCH RECIPES
    pressEnterSearch(event) {
        event.preventDefault();
        searchRecipes();
    },

    filterNonSearched(filtered) {
        let found = recipes.filter(recipe => {
            let ids = filtered.map(f => f.id);
            return !ids.includes(recipe.id)
        })
        hideUnselectedRecipes(found);
    },

    createRecipeObject(recipes) {
        recipes = recipes.map(recipe => new Recipe(recipe));
        return recipes
    },

    toggleMenu() {
        var menuDropdown = document.querySelector(".drop-menu");
        menuOpen = !menuOpen;
        if (menuOpen) {
            menuDropdown.style.display = "block";
        } else {
            menuDropdown.style.display = "none";
        }
    },

    showAllRecipes(cookbook) {
        cookbook.recipes.forEach(recipe => {
            let domRecipe = document.getElementById(`${recipe.id}`);
            domRecipe.style.display = "block";
        });
        this.showWelcomeBanner();
    },

    // CREATE AND USE PANTRY
    displayPantryInfo(pantry) {
        document.querySelector(".pantry-list").innerHTML = ' ';
        pantry.forEach(ingredient => {
            let ingredientHtml = `<li><input type="checkbox" role="checkbox" aria-checked="false" class="checked-tag pantry-checkbox" id="${ingredient.name}">
            <label for="${ingredient.name}">${domUpdates.capitalize(ingredient.name)}, ${ingredient.count}</label></li>`;
            document.querySelector(".pantry-list").insertAdjacentHTML("beforeend",
                ingredientHtml);
        });
    },

    captureInputValue() {
        let pantryIngName = document.getElementById("pantryIngName").value.toLowerCase();
        let pantryIngQuanity = parseInt(document.getElementById("pantryIngQuantity").value.toLowerCase());
        let ingredientId = Date.now();

        if (!pantryIngName || !pantryIngQuanity) {
            return;
        } else {
            this.displayAddIngredientError(false);
            let pantryInput = { estimatedCostInCents: 255, id: ingredientId, name: pantryIngName };
            return [pantryInput, pantryIngQuanity];
        }
    },

    displayAddIngredientError(inputFieldValues) {
        let addIngredientError = document.getElementById('addIngError');
        if (inputFieldValues) {
            addIngredientError.classList.remove('hidden');
        } else {
            addIngredientError.classList.add('hidden');
        }
    }
}

export default domUpdates;






