import apiCalls from './apiCalls';

import './css/base.scss';
import './css/styles.scss';

import User from './user';
import Recipe from './recipe';
import Cookbook from './Cookbook';
import domUpdates from './domUpdates';
import Pantry from './Pantry';

let addIngredientBtn = document.querySelector(".add-ing-btn");
let allRecipesBtn = document.querySelector(".show-all-btn");
let filterBtn = document.querySelector(".filter-btn");
let fullRecipeInfo = document.querySelector(".recipe-instructions");
let main = document.querySelector("main");
let pantryBtn = document.querySelector(".my-pantry-btn");
let savedRecipesBtn = document.querySelector(".saved-recipes-btn");
let searchBtn = document.querySelector(".search-btn");
let searchForm = document.querySelector("#search");
let searchInput = document.querySelector("#search-input");
let showPantryRecipes = document.querySelector(".show-pantry-recipes-btn");
let user, cookbook, ingredientsData, pantryInfo;
let allTags;




window.addEventListener("load", findTags);
addIngredientBtn.addEventListener("click", addIngToPantry)
allRecipesBtn.addEventListener("click", function () {
  domUpdates.showAllRecipes(cookbook);
});
filterBtn.addEventListener("click", findCheckedBoxes);
main.addEventListener("click", addToMyRecipes);
pantryBtn.addEventListener("click", domUpdates.toggleMenu);
savedRecipesBtn.addEventListener("click", function () {
  domUpdates.showSavedRecipes(cookbook, user);
});
searchBtn.addEventListener("click", searchRecipes);
showPantryRecipes.addEventListener("click", findCheckedPantryBoxes);
searchForm.addEventListener("submit", pressEnterSearch);



// GENERATE A USER ON LOAD

window.onload = onStartUp()

function onStartUp() {
  apiCalls.getData()
    .then((promise) => {
      console.log(promise)
      user = new User(promise[0][(Math.floor(Math.random() * promise[0].length) + 1)]);
      ingredientsData = promise[1];
      cookbook = new Cookbook(promise[2], promise[1]);
      pantryInfo = new Pantry(user.pantry)
      generateAllInfo(user, ingredientsData, pantryInfo, cookbook);
    })
}

function generateAllInfo(user, ingredientsData, pantryInfo, cookbook) {
  findPantryInfo(user, ingredientsData, pantryInfo);
  domUpdates.displayUserGreeting(user);
  // domUpdates.displayPantryInfo();
  domUpdates.createCards(cookbook);
  console.log(findTags());
  console.log(cookbook);
}

function findPantryInfo(user, ingredientsData, pantryInfo) {
  user.pantry.forEach(item => {
    let itemInfo = ingredientsData.find(ingredient => {
      return ingredient.id === item.ingredient;
    });
    let originalIngredient = pantryInfo.pantryIngredients.find(ingredient => {
      if (itemInfo) {
        return ingredient.name === itemInfo.name;
      }
    });
    if (itemInfo && originalIngredient) {
      originalIngredient.count += item.amount;
    } else if (itemInfo) {
      pantryInfo.pantryIngredients.push({ name: itemInfo.name, count: item.amount });
    }
  });
  domUpdates.displayPantryInfo(pantryInfo.pantryIngredients.sort((a, b) => a.name.localeCompare(b.name)));
}

function addIngToPantry(event) {
  event.preventDefault();
  console.log(user);
  let ingToAdd = domUpdates.captureInputValue();
  console.log(user.pantry)
  if (!user.pantry.includes(ingToAdd)) {
    user.pantry.push(ingToAdd);
  }
  console.log(user.pantry)
  domUpdates.displayPantryInfo();
}

// FILTER BY RECIPE TAGS
function findTags() {
  allTags = [];
  cookbook.recipes.forEach(recipe => {
    recipe.tags.forEach(tag => {
      if (!allTags.includes(tag)) {
        allTags.push(tag);
      }
    });
    console.log(allTags.sort())
    return allTags.sort();
  });
  domUpdates.listTags(allTags)
}

// function capitalize(words) {
//   return words.split(" ").map(word => {
//     return word.charAt(0).toUpperCase() + word.slice(1);
//   }).join(" ");
// }


function findCheckedBoxes() {
  let tagCheckboxes = Array.from(document.querySelectorAll(".checked-tag"));
  let selectedTags = tagCheckboxes.filter(box => {
    return box.checked;
  })

  let filteredResults = cookbook.filterByTags(selectedTags);

  displayAndHideRecipes(cookbook, filteredResults)
}

function displayAndHideRecipes(cookbook, filteredResults) {
  domUpdates.showAllRecipes(cookbook);

  if (filteredResults.length > 0) {
    filterRecipes(filteredResults);
  }
}

function filterRecipes(filtered) {
  let foundRecipes = cookbook.recipes.filter(recipe => {
    return !filtered.includes(recipe);
  });
  domUpdates.hideUnselectedRecipes(foundRecipes)
}

// FAVORITE RECIPE FUNCTIONALITY
function addToMyRecipes(event) {
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
    domUpdates.exitRecipe();
  } else if (isDescendant(event.target.closest(".recipe-card"), event.target)) {
    openRecipeModal(event);
  }
}

function isDescendant(parent, child) {
  let node = child;
  while (node !== null) {
    if (node === parent) {
      return true;
    }
    node = node.parentNode;
  }
  return false;
}

// CREATE RECIPE INSTRUCTIONS

function openRecipeModal(event) {
  fullRecipeInfo.style.display = "inline";
  let recipeId = event.path.find(e => e.id).id;
  let recipe = cookbook.recipes.find(recipe => recipe.id === Number(recipeId));
  domUpdates.generateRecipeTitle(recipe, domUpdates.generateIngredients(recipe));
  domUpdates.addRecipeImage(recipe);
  domUpdates.generateInstructions(recipe);
  domUpdates.openRecipeInfo();
}

// SEARCH RECIPES

function pressEnterSearch(event) {
  event.preventDefault();
  searchRecipes();
}

function searchRecipes() {
  domUpdates.showAllRecipes(cookbook);
  let searchText = searchInput.value;
  let searchedRecipes = cookbook.searchForRecipe(searchText, ingredientsData);
  filterNonSearched(createRecipeObject(searchedRecipes));
}

function filterNonSearched(filtered) {
  let found = cookbook.recipes.filter(recipe => {
    let ids = filtered.map(f => f.id);
    return !ids.includes(recipe.id)
  })
  domUpdates.hideUnselectedRecipes(found);
}

function createRecipeObject(recipes) {
  recipes = recipes.map(recipe => new Recipe(recipe, ingredientsData));
  return recipes;
}

function findCheckedPantryBoxes() {
  let pantryCheckboxes = document.querySelectorAll(".pantry-checkbox");
  let pantryCheckboxInfo = Array.from(pantryCheckboxes)
  let selectedIngredients = pantryCheckboxInfo.filter(box => {
    return box.checked;
  })
  domUpdates.showAllRecipes(cookbook);
  if (selectedIngredients.length > 0) {
    findIdsOfCheckedIngredients(selectedIngredients);
  }
}

function findIdsOfCheckedIngredients(selected) {
  let ingredientHTMLIds = selected.map(item => {
    return item.id;
  })

  let ingredientIds = [];

  ingredientsData.forEach(item => {
    if (ingredientHTMLIds.includes(item.name)) {
      ingredientIds.push(item.id)
    }
  })
  findRecipesWithCheckedIngredients(ingredientIds)
}

function findRecipesWithCheckedIngredients(ingredientIds) {
  let domRecipesCollection = []
  cookbook.recipes.forEach(recipe => {

    let recipeIngredientIds = recipe.ingredients.map(ingredient => {
      return ingredient.id;
    })

    if (recipeChecker(recipeIngredientIds, ingredientIds)) {
      domRecipesCollection.push(recipe);
    }
  })
  domUpdates.createCards(domRecipesCollection);
}

function recipeChecker(recipeIngredientIds, selectedIds) {
  return selectedIds.every(id => recipeIngredientIds.includes(id));
}
