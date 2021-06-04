import Recipe from './recipe';
import User from './user';



let domUpdates = {

    displayUserGreeting(user) {
        let firstName = user.name.split(" ")[0];
        let welcomeMsg = `
          <div class="welcome-msg">
            <h1>Welcome ${firstName}!</h1>
          </div>`;
        document.querySelector(".banner-image").insertAdjacentHTML("afterbegin",
            welcomeMsg);
        // findPantryInfo();
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
            addToDom(recipeInfo, shortRecipeName)
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

    // FILTER BY RECIPE TAGS
    findTags() {
        let tags = [];
        recipeData.forEach(recipe => {
            recipe.tags.forEach(tag => {
                if (!tags.includes(tag)) {
                    tags.push(tag);
                }
            });
        });
        tags.sort();
        listTags(tags);
    },

    listTags(allTags) {
        allTags.forEach(tag => {
            let tagHtml = `<li><input type="checkbox" class="checked-tag" id="${tag}">
            <label for="${tag}">${capitalize(tag)}</label></li>`;
            tagList.insertAdjacentHTML("beforeend", tagHtml);
        });
    },

    capitalize(words) {
        return words.split(" ").map(word => {
            return word.charAt(0).toUpperCase() + word.slice(1);
        }).join(" ");
    },

    findCheckedBoxes() {
        let tagCheckboxes = document.querySelectorAll(".checked-tag");
        let checkboxInfo = Array.from(tagCheckboxes)
        let selectedTags = checkboxInfo.filter(box => {
            return box.checked;
        })
        findTaggedRecipes(selectedTags);
    },

    findTaggedRecipes(selected) {
        let filteredResults = [];
        selected.forEach(tag => {
            let allRecipes = recipes.filter(recipe => {
                return recipe.tags.includes(tag.id);
            });
            allRecipes.forEach(recipe => {
                if (!filteredResults.includes(recipe)) {
                    filteredResults.push(recipe);
                }
            })
        }),
            showAllRecipes();
        if (filteredResults.length > 0) {
            filterRecipes(filteredResults);
        }
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
    addToMyRecipes() {
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

    showSavedRecipes() {
        let unsavedRecipes = recipes.filter(recipe => {
            return !user.favoriteRecipes.includes(recipe.id);
        });
        unsavedRecipes.forEach(recipe => {
            let domRecipe = document.getElementById(`${recipe.id}`);
            domRecipe.style.display = "none";
        });
        showMyRecipesBanner();
    },

    // CREATE RECIPE INSTRUCTIONS
    openRecipeInfo(event) {
        fullRecipeInfo.style.display = "inline";
        let recipeId = event.path.find(e => e.id).id;
        let recipe = recipeData.find(recipe => recipe.id === Number(recipeId));
        generateRecipeTitle(recipe, generateIngredients(recipe));
        addRecipeImage(recipe);
        generateInstructions(recipe);
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
        return recipe && recipe.ingredients.map(i => {
            return `${capitalize(i.name)} (${i.quantity.amount} ${i.quantity.unit})`
        }).join(", ");
    },


    // Recipe method returnInstructions

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

    // moved to domUpdates but domUpdates is not connected to everything yet
    showWelcomeBanner() {
        document.querySelector(".welcome-msg").style.display = "flex";
        document.querySelector(".my-recipes-banner").style.display = "none";
    },

    // SEARCH RECIPES
    pressEnterSearch(event) {
        event.preventDefault();
        searchRecipes();
    },

    searchRecipes() {
        showAllRecipes();
        let searchedRecipes = recipeData.filter(recipe => {
            return recipe.name.toLowerCase().includes(searchInput.value.toLowerCase());
        });
        filterNonSearched(createRecipeObject(searchedRecipes));
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

    showAllRecipes() {
        recipes.forEach(recipe => {
            let domRecipe = document.getElementById(`${recipe.id}`);
            domRecipe.style.display = "block";
        });
        showWelcomeBanner();
    },

    // CREATE AND USE PANTRY
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
        displayPantryInfo(pantryInfo.sort((a, b) => a.name.localeCompare(b.name)));
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
        showAllRecipes();
        if (selectedIngredients.length > 0) {
            findRecipesWithCheckedIngredients(selectedIngredients);
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






