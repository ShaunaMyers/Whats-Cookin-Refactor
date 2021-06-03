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

    it.only('Should determine if a user\'s pantry has enough ingredients to cook a recipe', () => {
        expect(pantry1.evaluateUsersPantry(recipe1)).to.equal('You do not have enough ingredients to cook this meal.');
    })
})