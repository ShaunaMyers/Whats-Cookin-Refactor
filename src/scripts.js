import apiCalls from './apiCalls';

import './css/base.scss';
import './css/styles.scss';

import User from './user';
import Recipe from './recipe';
import Cookbook from './Cookbook';
import domUpdates from './domUpdates';
import Pantry from './Pantry';

let allRecipesBtn = document.querySelector(".show-all-btn");
let filterBtn = document.querySelector(".filter-btn");
let fullRecipeInfo = document.querySelector(".recipe-instructions");
let main = document.querySelector("main");
let menuOpen = false;
let pantryBtn = document.querySelector(".my-pantry-btn");
let tags = [];
export default tags;

let savedRecipesBtn = document.querySelector(".saved-recipes-btn");
let searchBtn = document.querySelector(".search-btn");
let searchForm = document.querySelector("#search");
let searchInput = document.querySelector("#search-input");
let showPantryRecipes = document.querySelector(".show-pantry-recipes-btn");
// let tagList = document.querySelector(".tag-list");
let user, cookbook, ingredientsData, pantryInfo;


window.addEventListener("load", findTags);
allRecipesBtn.addEventListener("click", domUpdates.showAllRecipes);
filterBtn.addEventListener("click", findCheckedBoxes);
main.addEventListener("click", addToMyRecipes);
pantryBtn.addEventListener("click", domUpdates.toggleMenu);
savedRecipesBtn.addEventListener("click", domUpdates.showSavedRecipes);
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
      console.log(user);
      ingredientsData = promise[1];
      cookbook = new Cookbook(promise[2], promise[1]);
      pantryInfo = new Pantry(user.pantry)
      generateAllInfo(user, ingredientsData, pantryInfo, cookbook);
    })  
}

function generateAllInfo(user, ingredientsData, pantryInfo, cookbook) {
  findPantryInfo(user, ingredientsData, pantryInfo);
  domUpdates.displayUserGreeting(user);
  createCards(cookbook);
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

// LOAD COOKBOOK
function createCards(cookbook) {
  console.log('COOKBOOK', cookbook);
  cookbook.recipes.forEach(recipe => {
      let recipes = [];
      let recipeInfo = new Recipe(recipe);
      let shortRecipeName = recipeInfo.name;
      recipes.push(recipeInfo);
      if (recipeInfo.name.length > 40) {
          shortRecipeName = recipeInfo.name.substring(0, 40) + "...";
      }
      domUpdates.addCardsToDom(recipeInfo, shortRecipeName)
  });
}

// FILTER BY RECIPE TAGS
function findTags(recipe) {
  cookbook.recipes.forEach(recipe => {
    recipe.tags.forEach(tag => {
      if (!tags.includes(tag)) {
        tags.push(tag);
      }
    });
    return tags.sort();
  });
  domUpdates.listTags()
}

// function capitalize(words) {
//   return words.split(" ").map(word => {
//     return word.charAt(0).toUpperCase() + word.slice(1);
//   }).join(" ");
// }

function findCheckedBoxes() {
  let tagCheckboxes = document.querySelectorAll(".checked-tag");
  let checkboxInfo = Array.from(tagCheckboxes)
  let selectedTags = checkboxInfo.filter(box => {
    return box.checked;
  })
  findTaggedRecipes(selectedTags);
}

function findTaggedRecipes(selected) {
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
  });

  domUpdates.showAllRecipes();
  if (filteredResults.length > 0) {
    filterRecipes(filteredResults);
  }
}

function filterRecipes(filtered) {
  let foundRecipes = recipes.filter(recipe => {
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
    exitRecipe();
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
  domUpdates.showAllRecipes();
  let searchedRecipes = cookbook.recipes.filter(recipe => {
    return recipe.name.toLowerCase().includes(searchInput.value.toLowerCase());
  });
  filterNonSearched(createRecipeObject(searchedRecipes));
}

function filterNonSearched(filtered) {
  let found = recipes.filter(recipe => {
    let ids = filtered.map(f => f.id);
    return !ids.includes(recipe.id)
  })
  hideUnselectedRecipes(found);
}

function createRecipeObject(recipes) {
  recipes = recipes.map(recipe => new Recipe(recipe));
  return recipes
}

function findCheckedPantryBoxes() {
  let pantryCheckboxes = document.querySelectorAll(".pantry-checkbox");
  let pantryCheckboxInfo = Array.from(pantryCheckboxes)
  let selectedIngredients = pantryCheckboxInfo.filter(box => {
    return box.checked;
  })
  domUpdates.showAllRecipes();
  if (selectedIngredients.length > 0) {
    findRecipesWithCheckedIngredients(selectedIngredients);
  }
}

function findRecipesWithCheckedIngredients(selected) {
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