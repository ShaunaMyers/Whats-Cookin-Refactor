import Recipe from './recipe';



let domUpdates = {





    function displayPantryInfo(pantry) {
        pantry.forEach(ingredient => {
            let ingredientHtml = `<li><input type="checkbox" class="pantry-checkbox" id="${ingredient.name}">
            <label for="${ingredient.name}">${ingredient.name}, ${ingredient.count}</label></li>`;
            document.querySelector(".pantry-list").insertAdjacentHTML("beforeend",
                ingredientHtml);
        });
    }
}

export default domUpdates;






