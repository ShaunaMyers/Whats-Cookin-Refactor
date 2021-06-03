import { expect } from 'chai';
import Pantry from '../src/pantry';
import sampleUsers from '../src/data/sample-users-data';
import recipeData from '../src/data/recipe-data';
import Recipe from '../src/recipe';


describe('Pantry Class', () => {
  let pantry1, pantry2, recipe1, recipe2;

  beforeEach(() => {
    pantry1 = new Pantry(sampleUsers[0].pantry);
    pantry2 = new Pantry(sampleUsers[1].pantry);
    recipe1 = new Recipe(recipeData[0]);
    recipe2 = new Recipe(recipeData[1]);
  });

  it('Should be a function', () => {
    expect(Pantry).to.be.a('function');
  });

  it('Should be instance of Pantry', () => {
    expect(pantry1).to.be.an.instanceof(Pantry);
    expect(pantry2).to.be.an.instanceof(Pantry);
  });

  it('Should store a user\'s pantry contents', () => {
    expect(pantry1.contents).to.eql(sampleUsers[0].pantry);
  });

  it("should store a user's ingredient amounts and id's", () => {
    pantry1.evaluateUsersPantry();
    expect(pantry1.pantryIngredients).to.deep.equal([11477, 93820, 11297, 11547, 1082047, 1032050, 20081, 11215, 10514037]);

    pantry2.evaluateUsersPantry();
    expect(pantry2.pantryAmounts).to.deep.equal([1.5, 0.5, 1, 0.5, 3, 0.5, 0.5, 24, 2, 0.5, 0.5]);
  });

  it('Should determine if a user\'s pantry has enough ingredients to cook a recipe', () => {

    expect(pantry1.evaluateUsersIngredients(recipe1)).to.equal('You do not have enough ingredients to cook this meal. Time to go shopping!');

    expect(pantry2.evaluateUsersIngredients(recipe1)).to.equal('You have all the necessary ingredients for this recipe! Time to get cooking!');
  })

  it('Should determine the ingredients a user will need', () => {

    pantry1.evaluateUsersIngredients(recipe1);

    expect(pantry1.determineIngredientsNeeded()).to.eql([{ id: 18372, amount: 0.5 }, { id: 1123, amount: 1 }, { id: 19335, amount: 0.5 }, { id: 19206, amount: 3 }, { id: 19334, amount: 0.5 }, { id: 2047, amount: 0.5 }, { id: 1012047, amount: 24 }, { id: 10019903, amount: 2 }, { id: 1145, amount: 0.5 }, { id: 2050, amount: 0.5 }]);

    pantry2.evaluateUsersIngredients(recipe1);

    expect(pantry2.determineIngredientsNeeded()).to.equal('You have all the necessary ingredients for this recipe! Time to get cooking!');
  });

  it("should remove ingredients used in a recipe from the pantry", () => {
    pantry2.evaluateUsersPantry(recipe1);

    pantry2.cookMeal(recipe1);

    expect(pantry2.pantryAmounts).to.deep.equal([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
  });
})