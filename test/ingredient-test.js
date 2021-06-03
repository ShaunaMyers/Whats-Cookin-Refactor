import { expect } from 'chai';
import Ingredient from '../src/ingredient';
import { ingredientsData } from '../src/data/ingredient-data';

describe('Ingredient', () => {
    let ingredient;

    beforeEach(() => {
        ingredient = new Ingredient(ingredientsData[0])
    });

    it('Should be a function', () => {
        expect(Ingredient).to.be.a('function');
    });

    it('Should be an instance of Ingredient', () => {
        expect(ingredient).to.be.an.instanceOf(Ingredient);
    });

    it('Should have an id', () => {
        expect(ingredient.id).to.equal(20081);
    });

    it('Should have a name', () => {
        expect(ingredient.name).to.equal('wheat flour');
    });

    it('Should have a total cost in cents', () => {
        expect(ingredient.costInCents).to.equal(142);
    });


});