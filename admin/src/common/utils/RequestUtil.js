const API_ROOT = "/api";

// Get the default headers of the request
const getHeaders = () => ({'content-type': 'application/json', 'Authorization': `Bearer ${localStorage.getItem("token")}`});

// Run a plain request with all default values
export const request = async (path, method = "GET", body = {}, headers = {}) => {
    return await fetch(API_ROOT + path, {
        headers: {...getHeaders(), ...headers}, method,
        body: method !== "GET" ? JSON.stringify(body) : undefined
    });
}

// Creates a new token / session
export const createSession = async (username, password) => {
    return (await request("/auth/login", "POST", {username, password})).headers.get("Authorization");
}

// Run a GET request and get the json of the response
export const jsonRequest = async (path, headers = {}) => {
    return (await request(path, "GET", null, headers)).json();
}

// Run a PUT request and post some values
export const putRequest = async (path, body, headers = {}) => {
    return await request(path, "PUT", body, headers);
}

// Run a POST request and post some values
export const postRequest = async (path, body, headers = {}) => {
    return await request(path, "POST", body, headers);
}

// Run a DELETE request and delete a resource
export const deleteRequest = async (path, body, headers = {}) => {
    return await request(path, "DELETE", body, headers);
}