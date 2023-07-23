import axios from "axios";

axios.defaults.headers.common["x-api-key"] = "live_SrdRs6FoQE4ieaTlJFUjw3DEORVGo9Zy1ZwdJFuuaIWVL7YLLnhj1hZ5ZUzJCOwa";


const BASE_URL = 'https://api.thecatapi.com/v1/';

function fetchBreeds() {
    return fetch(`${BASE_URL}breeds`).then(resp => {
        if (!resp.ok) {
            throw new Error(resp.statusText);
        }
        return resp.json();
    });

};

function fetchCatByBreed(breedId) {
    return fetch(`${BASE_URL}images/search?breed_ids=${breedId}`).then(resp => {
        if (!resp.ok) {
            throw new Error(resp.statusText);
        }
        return resp.json();
    });
};

export { fetchBreeds, fetchCatByBreed };