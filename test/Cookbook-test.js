import {expect} from 'chai';


import { recipeData } from '../src/data/testData.js';
import { ingredientsData } from '../src/testData/ingredients';
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
    expect(cookbook.recipes.length).to.be(31);
  });

  it('should store all the ingredient data', () => {
    expect(cookbook.ingredients.length).to.be(63);
  });

  it('should filter recipes by one tag', () => {
    expect(cookbook.filterByTags('snack'))
      .to.deep.equal([recipeData[0]]);
  });

  it('should filter recipes by multiple tags', () => {
    expect(cookbook.filterByTags(['snack', 'antipasti']))
      .to.deep.equal([recipeData[0], recipeData[7]]);
  });

  it('should allow the user to search recipes by name', () => {
    expect(cookbook.searchForRecipe('cookie')).to.deep.equal([recipeData[0]]);
  });

  it('should allow the user to search recipes by ingredient', () => {
    expect(cookbook.searchForRecipe('apple slices'))
      .to.deep.equal([recipeData[1]]);
  });

  it(`should be able to search favoriteRecipes,
              without regard to capitalization`, () => {
    expect(cookbook.searchForRecipe('PUDDING')).to.deep.equal([recipeData[0]]);
  });
});