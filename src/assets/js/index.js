import {form, searchbar, genreTitle, section2, section3, container_cards, bookTitle, bookDescription, container_loader} from './variables.js';
import '../scss/index.scss';
import axios from "axios";


import { getBooks } from './api3';
import { getDescription } from "./api3";

form.addEventListener('submit', (e) => {
    e.preventDefault();
    genreTitle.textContent = searchbar.value;
    section2.classList.remove('hide');

    bookTitle.textContent = '';
    bookDescription.textContent = 'Scegli un libro per conoscere la descrizione';
    getBooks(axios, container_cards, searchbar.value, container_loader, section2);
})

container_cards.addEventListener("click", doSmt, false);
function doSmt(e) {
    if((e.target !== e.currentTarget) && (e.target.className == 'card')) {
        section3.classList.remove('hide');
        section3.scrollIntoView({behavior: "smooth"});
        getDescription(e.target.id, bookTitle, bookDescription, axios, container_loader);
    }
    e.stopPropagation();
}

