
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
//         .catch(err => console.log(`User API Error: ${err.message}));
// }

const checkForError = (response) => {
    if (!response.ok) {
        throw new Error('Something went wrong, please try again,')
    } else {
        return response.json()
    }
}


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

// Is this the correct place for promise.all?
// I'm guessing I'll have to do this for the POST requests as well?

function getData() {
    return Promise.all([apiCalls.getUserData(), apiCalls.getIngredientsData(), apiCalls.getRecipeData()])
}

// Does checkForError need to be exported?

export default { apiCalls, getData, checkForError };