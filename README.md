## Title: Refactor-Tractor (What's Cookin / b)

A Front-End Project by: [Beth Meeker](https://github.com/Meekb) and [Shauna Myers](https://github.com/ShaunaMyers)

## Overview
  Refactor-Tractor is a paired project in which the goal is to refactor and build on top of an existing code base - the freshPicks recipe application - implementing best practices for accessibility, Sass, and Webpack. 

## Instructions for cloning
  You can view our deployed page here: https://shaunamyers.github.io/Whats-Cookin-Refactor/

## Functionality

   - Main Functionality and Features
     - User can navigate between the main page showing all recipes, their favorite recipes, and their pantry
     - Recipe Type area displays all recipe tags in the database, allowing recipe filter by tag
     - Search Bar allows the user to search the recipe database by recipe name, or by ingredient (single word searches only at the time of deployment)
     - User can favorite recipes by clicking the apple on the recipe card - the apple will turn green. Click again to remove the favorited status, and the apple          will return to an outline  
     - User can view their Pantry by clicking the recipe-page icon and can input data to add an ingredient to the Pantry
     - User can add an ingredient to their Pantry 

### Filter recipes by selecting recipe tags


![Whats-Cookin-Refactor-Tractor-gif](https://media.giphy.com/media/n2zmK45rocC0i5uVSl/giphy.gif)


   
### View the user Pantry

![Whats-Cookin-Refactor-Tractor-gif](https://media.giphy.com/media/M8p11iwT0jT6al49Yz/giphy.gif)




### Search for recipes

![Whats-Cookin-Refactor-Tractor-gif](https://media.giphy.com/media/MYmXvmLqrjpuT2nC1l/giphy.gif)


  
  * Architecture 
    * Five class files - Ingredient, Recipe, User, Pantry, and Cookbook
    * Five test files accompany each class using Mocha & Chai Should / Expect syntax
    * ARIA roles and attributes for user accessibility 
    * Network requests made using .fetch() to API endpoints
    * Sass imports utilizing variables, @mixins and @media queries


## Technologies
  1. HTML, CSS, and JavaScript
  2. Sass
  3. Webpack
  4. Mocha, Chai
  5. ESLint
  6. GitHub

## Contributors

[Beth Meeker](https://github.com/Meekb)  
[Shauna Myers](https://github.com/ShaunaMyers)

Project Manager: [Hannah Hudson](https://github.com/hannahhch)
  
Turing School of Software & Design https://github.com/turingschool-examples

## Resources
  1. [MDN Web Docs](https://developer.mozilla.org/en-US/)
  2. [Turing Refactor-Tractor](https://frontend.turing.edu/projects/module-2/refactor-tractor-wc.html)  
       * [What's Cookin / b](https://drive.google.com/file/d/1fcAh0wU73zZz8zujfrmpY9fBT3TM-deb/view)
