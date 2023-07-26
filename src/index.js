import axios from "axios";
import { fetchBreeds, fetchCatByBreed } from "./cat-api";

axios.defaults.headers.common["x-api-key"] = "live_SrdRs6FoQE4ieaTlJFUjw3DEORVGo9Zy1ZwdJFuuaIWVL7YLLnhj1hZ5ZUzJCOwa";

const refs = {
    select: document.querySelector('.breed-select'),
    catInfo: document.querySelector('.cat-info'),
    
};

fetchBreeds().then(cats => {
    
    for (let i = 0; i < cats.length; i += 1) {
        const option = document.createElement('option');
        option.value = cats[i].id;
        option.textContent = cats[i].name;
        refs.select.append(option);
        
    }

}).catch(err => console.log(err));

refs.select.addEventListener('change', onChange);

function onChange() {
    
    let id = refs.select.value;
   
    fetchCatByBreed(id).then(cat => {
        
        console.log(cat)
        let img = cat[0].url;
        console.log(img)
        fetchBreeds()
            .then(cats => {
                const cat = cats.find(cat => cat.id === id); 
                return cat;  
            })
            .then(data => (refs.catInfo.innerHTML = createMarkup(img, data)))
         
    }).catch(err => console.log(err));
    
};

function createMarkup(img, data) {
    
    const { name, description, temperament } = data;
    const markup =  
        `<img class="cat-img" src="${img}" alt="${name}" width="250">
        <div class="cat-container">
            <h2 class="cat-name" >${name}</h2>
            <p class="cat-description" >${description}</p>
            <p class="cat-temperament">
                <span class="cat-temperament-title" > Temperament: </span>
                ${temperament}</p>
        </div>`;
    
    refs.catInfo.style.display = "flex";
    refs.catInfo.style.gap = "20px";
    
    return markup;
}; 


    
