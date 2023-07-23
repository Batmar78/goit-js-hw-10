import axios from "axios";
import { fetchBreeds, fetchCatByBreed } from "./cat-api";

axios.defaults.headers.common["x-api-key"] = "live_SrdRs6FoQE4ieaTlJFUjw3DEORVGo9Zy1ZwdJFuuaIWVL7YLLnhj1hZ5ZUzJCOwa";

const refs = {
    select: document.querySelector('.breed-select'),
    catInfo: document.querySelector('.cat-info')
};




// const BASE_URL = 'https://api.thecatapi.com/v1/';



fetchBreeds().then(cats => {
    // console.log(cats);
    for (let i = 0; i < cats.length; i += 1) {
        const option = document.createElement('option');
        option.value = cats[i].id;
        option.text = cats[i].name;
        refs.select.append(option);
    }
    
// console.log(cats[i].name)

}).catch(err => console.log(err));

refs.select.addEventListener('change', onChange);

function onChange() {
    let id = refs.select.value;
   
    fetchCatByBreed(id).then(cat => {
        
        let img = cat[0].url;
        // console.log(img)
        
        fetchBreeds().then(cats => {
            const cat = cats.find(cat => cat.id === id);
            // console.log(cat);
            // console.log(cat.name);
            // console.log(cat.description);
            // console.log(cat.temperament);
            // console.log(refs.catInfo);
            // console.log(createMarkup(cat));
            // const { name, description, temperament } = cat;
            return cat;
    }).then((data) => (refs.catInfo.innerHTML = createMarkup(data)))
        
    }).catch(err => console.log(err));
    
};

function createMarkup(obj) {
    // const { name, description, temperament } = obj;
    return markup = (({ name, description, temperament }) =>
        `<h2>${name}</h2>
         <p>${description}</p>
         <p>Temperament:${temperament}</p>`).join('')
    
    // return markup;
} 
    
