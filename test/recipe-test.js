import { expect } from 'chai';
import Recipe from '../src/recipe';
import { recipeData } from '../src/data/recipe-data';
// import { ingredientsData } from '..src/data/ingredient-data';

describe('Recipe', function() {
  let recipe;
  let recipeInfo;
  // let ingredient;
  // let ingredientInfo;

  beforeEach(function() {
    recipeInfo = recipeData[0];
    recipe = new Recipe(recipeInfo);
    // ingredientInfo = ingredientsData[0];
    // ingredient = new Ingredient(ingredientInfo);
  });

  it('is a function', function() {
    expect(Recipe).to.be.a('function');
  });

  it('should be an instance of Recipe', function() {
    expect(recipe).to.be.an.instanceof(Recipe);
  });

  it('should initialize with an id', function() {
    expect(recipe.id).to.eq(595736);
  });

  it('should initialize with an name', function() {
    expect(recipe.name).to.eq('Loaded Chocolate Chip Pudding Cookie Cups');
  });

  it('should initialize with an image', function() {
    expect(recipe.image).to.eq('https://spoonacular.com/recipeImages/595736-556x370.jpg');
  });

  it('should initialize with a set of tags', function() {
    expect(recipe.tags.length).to.eql(6);
    expect(recipe.tags[0]).to.eql('antipasti');
  })

  it('should initialize with an array of ingredients', function() {
    const ingredient = {
      "id": 20081,
      "name": "all purpose flour",
      "quantity": {
        "amount": 1.5,
        "unit": "c"
      }
    }
    expect(recipe.ingredients[0]).to.deep.eq(ingredient);
  });
  
  it('should initialize with a list of instructions', function() {
    expect(recipe.instructions).to.be.an.an('array')
  });

  //test for method to list ingredient names

  it.skip('should calculate the total cost of all of the ingredients', function() {
    expect(recipe.calculateIngredientsCost()).to.eq();
  });

  it('should return its directions/instructions', function() {
    expect(recipe.returnInstructions()).to.eq(recipe.instructions);
  })

});
