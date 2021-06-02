const retrieveUserData = () => fetch('http://localhost:3001/api/v1/users')
    .then(response => checkForError(response))
    .catch(error => console.log(`User API Error: ${error.message}`));

const retrieveIngredientData = () => fetch('http://localhost:3001/api/v1/ingredients')
    .then(response => checkForError(response))
    .catch(error => console.log(`User API Error: ${error.message}`));

const retrieveRecipeData = () => fetch('http://localhost:3001/api/v1/recipes')
    .then(response => checkForError(response))
    .catch(error => console.log(`User API Error: ${error.message}`));
