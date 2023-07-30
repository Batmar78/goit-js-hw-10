import axios from "axios";
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { fetchBreeds, fetchCatByBreed } from "./cat-api";

axios.defaults.headers.common["x-api-key"] = "live_SrdRs6FoQE4ieaTlJFUjw3DEORVGo9Zy1ZwdJFuuaIWVL7YLLnhj1hZ5ZUzJCOwa";



const refs = {
    select: document.querySelector('.breed-select'),
    catInfo: document.querySelector('.cat-info'),
    eror: document.querySelector('.error')
    
};

refs.eror.classList.add('visually-hidden');
// refs.eror.style.opacity = "0";



fetchBreeds().then(cats => {
    
    for (let i = 0; i < cats.length; i += 1) {
        const option = document.createElement('option');
        option.value = cats[i].id;
        option.textContent = cats[i].name;
        refs.select.append(option);
        
    }

}).catch(eror => Notify.failure(refs.eror.textContent));

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
         
    }).catch(err => Notify.failure(refs.eror.textContent));
    
};

function createMarkup(img, data) {
    
    const { name, description, temperament } = data;
    const markup =  
        `<img class="cat-img" src="${img}" alt="${name}" width="250" height="200">
        <div class="cat-container">
            <h2 class="cat-name" >${name}</h2>
            <p class="cat-description" >${description}</p>
            <h4>Temperament:</h4>
            <p>${temperament}</p>    
        </div>`;
    
    refs.catInfo.style.display = "flex";
    refs.catInfo.style.gap = "20px";
    
    
    return markup;
}; 


    
