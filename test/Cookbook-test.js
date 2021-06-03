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

  });

  it('Should store all the recipe data', () => {

  });

  it('should store all the ingredient data', () => {

  });

  it('should filter recipes by one tag', () => {

  });

  it('should filter recipes by multiple tags', () => {

  });

  it('should allow the user to search recipes by name', () => {

  });

  it('should allow the user to search recipes by ingredient', () => {

  });
})