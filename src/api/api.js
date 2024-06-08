export const searchUserRequest = async (doc) => {
    return await fetch('http://localhost:4000/api/search', {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(doc)
    });
}

export const registerUserRequest = async (doc) => {
    return await fetch('http://localhost:4000/api/register', {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(doc)
    });
}

export const getUsersRequest = async (doc) => {
    return await fetch('http://localhost:4000/api/users', {
        method: 'GET',
        headers: {
            "Content-Type": "application/json",
        }
    });
}
