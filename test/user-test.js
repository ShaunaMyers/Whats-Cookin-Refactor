import { expect } from 'chai';

import User from '../src/User';
import { users } from '../src/data/users-data';
import { recipeData } from '../src/data/recipe-data';

let user;
let userInfo;
let recipe;

describe('User', () => {

  beforeEach(() => {
    userInfo = users[0];
    user = new User(userInfo);

    recipe = {name: 'Chicken Parm', type: ['italian', 'dinner']};
  });

  it('should be an instance of User', () => {
    expect(user).to.be.an.instanceof(User);
  });

  it('should initialize with an id', () => {
    expect(user.id).to.eq(1);
  });

  it('should initialize with a name', () => {
    expect(user.name).to.eq('Saige O\'Kon');
  });

  it('should initialize with a pantry', () => {
    expect(user.pantry[0].ingredient).to.eq(11477); 
  });

  it('should initialize with an empty favoriteRecipes array', () => {
    expect(user.favoriteRecipes).to.deep.equal([]);
  });

  it('should initialize with an empty recipesToCook array', () => {
    expect(user.recipesToCook).to.deep.equal([]);
  });

  it('should be able to save a recipe to favoriteRecipes', () => {
    user.saveRecipe(recipe);
    expect(user.favoriteRecipes[0].name).to.equal('Chicken Parm');
  });

  it('should be able to remove recipes from favoriteRecipes', () => {
    user.saveRecipe(recipeData[0]);
    user.saveRecipe(recipeData[1]);
    user.saveRecipe(recipeData[2]);
    user.removeRecipe(recipeData[0]);

    expect(user.favoriteRecipes[0]).to.deep.equal(recipeData[1]);
  })

  it('should be able to decide to cook a recipe', () => {
    user.decideToCook(recipe);
    expect(user.recipesToCook[0].name).to.equal('Chicken Parm');
  });

  it('should not be able to add duplicate recipes to recipesToCook', () => {
    user.decideToCook(recipeData[0]);
    user.decideToCook(recipeData[0]);

    expect(user.recipesToCook.length).to.equal(1);
  });  

  describe('filtering and searching favorited recipes', () => {
    beforeEach(() => {
      user.saveRecipe(recipeData[0]);
      user.saveRecipe(recipeData[1]);
    });

    it('should be able to filter through favoriteRecipes by one tag', () => {
      expect(user.filterRecipes('snack'))
        .to.deep.equal([recipeData[0]]);
    });

    it('should be able to filter favoriteRecipes by multiple tags', () => {
      user.saveRecipe(recipeData[7]);

      expect(user.filterRecipes(['snack', 'antipasti']))
        .to.deep.equal([recipeData[0], recipeData[7]]);
    });

    it('should be able to search favoriteRecipes by name', () => {
      expect(user.searchForRecipe('cookie')).to.deep.equal([recipeData[0]]);
    });

    it(`should be able to search favoriteRecipes,
              without regard to capitalization`, () => {
      expect(user.searchForRecipe('PUDDING')).to.deep.equal([recipeData[0]]);
    });

    it('should be able to search favoriteRecipes by ingredient', () => {
      expect(user.searchForRecipe('apple slices'))
        .to.deep.equal([recipeData[1]]);
    });
  });
});
