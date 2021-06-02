
const retrieveData = (path) => {
    return fetch(path)
        .then(response => checkForError(response))
        .catch(err => console.log(`User API Error: ${err.message}`));
}

// const updateData = (path, data) => {
//     return fetch(path, {
//         method: 'POST',
//         headers: {
//             'Content-Type': 'application/json'
//         },
//         body: JSON.stringify(data)
//     })
//         .then(response => checkForError(response))
//         .catch(err => console.log(err))
// }

const checkForError = (response) => {
    if (!response.ok) {
        throw new Error('Something went wrong, please try again,')
    } else {
        return response.json()
    }
}

// Would promise.all end up wherever we're calling all these functions?

const apiCalls = {

    getUserData: () => {
        return retrieveData('http://localhost:3001/api/v1/users');
    },

    getIngredientsData: () => {
        return retrieveData('http://localhost:3001/api/v1/ingredients');
    },

    getRecipeData: () => {
        return retrieveData('http://localhost:3001/api/v1/recipes');
    },

}

export default apiCalls;