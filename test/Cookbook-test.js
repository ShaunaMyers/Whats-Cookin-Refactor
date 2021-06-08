import { expect } from 'chai';


import { recipeData } from '../src/data/sample-recipe-data';
import { ingredientsData } from '../src/data/sample-ingredient-data';
import Cookbook from '../src/cookbook.js';

let cookbook;

describe('Cookbook', () => {
  beforeEach(() => {
    cookbook = new Cookbook(recipeData, ingredientsData);
  });

  it('should be an instance of Cookbook', () => {
    expect(cookbook).to.be.an.instanceof(Cookbook);
  });

  it('should store all the recipe data', () => {
    expect(cookbook.recipes.length).to.equal(8);
  });

  it('should store all the ingredient data', () => {
    expect(cookbook.ingredients.length).to.equal(247);
  });

  it('should filter recipes by one tag', () => {
    expect(cookbook.filterByTags(['snack']))
      .to.deep.equal([recipeData[0], recipeData[7]]);
  });

  it('should filter recipes by multiple tags', () => {
    expect(cookbook.filterByTags(['snack', 'sauce']))
      .to.deep.equal([recipeData[0], recipeData[7], recipeData[2]]);
  });

  it.only('should allow the user to search recipes by name', () => {
    expect(cookbook.searchForRecipe('wing')).to.deep.equal([recipeData[2]]);
  });

  it('should allow the user to search recipes by ingredient', () => {
    expect(cookbook.searchForRecipe('apples'))
      .to.deep.equal([recipeData[1]]);
  });

  it(`should be able to search recipes,
              without regard to capitalization`, () => {
    expect(cookbook.searchForRecipe('PUDDING')).to.deep.equal([recipeData[0]]);
  });
});