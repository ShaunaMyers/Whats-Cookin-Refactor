import { expect } from 'chai';
import Recipe from '../src/Recipe';
import { recipeData } from '../src/data/sample-recipe-data';
import Ingredient from '../src/Ingredient';
import { ingredientsData } from '../src/data/sample-ingredient-data';


describe('Recipe', function() {
  let recipe;
  let recipeInfo;
  let ingredient;
  let ingredientInfo;

  beforeEach(function() {
    recipeInfo = recipeData[0];
    recipe = new Recipe(recipeInfo, ingredientsData);
    ingredientInfo = ingredientsData[0];
    ingredient = new Ingredient(ingredientInfo);
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
    expect(recipe.ingredients[0].name).to.deep.eq('all purpose flour');
    expect(recipe.ingredients.length).to.eq(11);
  });
  
  it('should initialize with a list of instructions', function() {
    expect(recipe.instructions).to.be.an.an('array');
  });

  it.skip('should be able to return the names of the ingredients', function() {
    const result = recipe.returnIngredients();
    expect(result).to.be.an('array');
    expect(result[1].name).to.equal('baking soda');
  });

  it('should calculate the total cost of all of the ingredients', function() {
    expect(recipe.calculateIngredientsCost()).to.eq('9.00');
  });

  it('should return its directions/instructions', function() {
    const result = recipe.returnInstructions();
    expect(result).to.be.an('array');
    expect(result[1]).to.eql('Add egg and vanilla and mix until combined.')
  })

});
