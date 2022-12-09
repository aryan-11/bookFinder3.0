import {form, searchbar, genreTitle, section2, section3, container_cards, bookTitle, bookDescription, container_loader} from './variables.js';
import '../scss/index.scss';
import axios from "axios";


import { getBooks } from './api';
import { getDescription } from "./api";

form.addEventListener('submit', (e) => {
    e.preventDefault();
    genreTitle.textContent = searchbar.value;
    section2.classList.remove('hide');
    section2.scrollIntoView({behavior: "smooth"});

    getBooks(axios, container_cards, searchbar.value, container_loader);
})

container_cards.addEventListener("click", doSmt, false);
function doSmt(e) {
    if((e.target !== e.currentTarget) && (e.target.className == 'card')) {
        section3.classList.remove('hide');
        section3.scrollIntoView({behavior: "smooth"});
        getDescription(e.target.id, bookTitle, bookDescription, axios, container_loader);
    }
    // if((e.target !== e.currentTarget) && ((e.target.className == 'title') || (e.target.className == 'author') || (e.target.className == 'card'))) {
    //     section3.classList.remove('hide');
    //     section3.scrollIntoView({behavior: "smooth"});
    //     getDescription(e.target.id, title, description, axios);
    // }
    e.stopPropagation();
}

