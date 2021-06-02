const retrieveUserData = () => fetch('http://localhost:3001/api/v1/users')
    .then(response => checkForError(response))
    .catch(error => console.log(`User API Error: ${error.message}`));
