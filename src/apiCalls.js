
const retrieveData = (path) => {
    return fetch(path)
        .then(response => checkForError(response))
        .catch(err => console.log(`User API Error: ${err.message}`));
}

const updateData = (path, data) => {
    return fetch(path, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
        .then(response => checkForError(response))
        .catch(err => console.log(err))
}



// const retrieveUserData = () => fetch('http://localhost:3001/api/v1/users')
//     .then(response => checkForError(response))
//     .catch(error => console.log(`User API Error: ${error.message}`));

//     retrieveIngredientsData: () => fetch('http://localhost:3001/api/v1/ingredients')
//         .then(response => this.checkForError(response))
//         .catch(error => console.log(`User API Error: ${error.message}`));

//     const retrieveRecipeData = () => fetch('http://localhost:3001/api/v1/recipes')
//         .then(response => this.checkForError(response))
//         .catch(error => console.log(`User API Error: ${error.message}`));



const checkForError = (response) => {
    if (!response.ok) {
        throw new Error('Something went wrong, please try again,')
    } else {
        return response.json()
    }
}


function getData() {
    return Promise.all([retrieveUserData(), retrieveIngredientsData(), retrieveRecipeData()])
}


export default { retrieveUserData, retrieveIngredientsData, retrieveRecipeData, checkForError, getData }