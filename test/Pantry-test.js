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
        pantry2.evaluateUsersPantry();
        expect(pantry1.pantryIngredients).to.deep.equal([11477, 93820, 11297, 11547, 1082047, 1032050, 20081, 11215, 10514037]);
        expect(pantry2.pantryAmounts).to.deep.equal([5, 3, 5, 1, 4, 4, 1, 2, 1, 1, 3]);
    });

    it('Should determine if a user\'s pantry has enough ingredients to cook a recipe', () => {

        pantry1.evaluateUsersPantry();
        expect(pantry1.evaluateUsersIngredients(recipe1)).to.equal('You do not have enough ingredients to cook this meal. Time to go shopping!');

        pantry2.evaluateUsersPantry();
        expect(pantry2.evaluateUsersIngredients(recipe1)).to.equal('You have all the necessary ingredients for this recipe! Time to get cooking!');
    })

    it.only('Should determine the ingredients a user will need', () => {

        pantry1.evaluateUsersPantry();
        pantry1.evaluateUsersIngredients(recipe1);

        expect(pantry1.determineIngredientsNeeded()).to.eql([11477, 93820, 11297, 11547, 1082047, 1032050, 11215, 10514037]);

        pantry2.evaluateUsersPantry();
        pantry2.evaluateUsersIngredients(recipe1);

        expect(pantry2.determineIngredientsNeeded()).to.equal('You have all the necessary ingredients for this recipe! Time to get cooking!');

    })
})