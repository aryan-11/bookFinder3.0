export async function getBooks(axios, wrapperResults, input, container_loader, section2) {
    try {
        wrapperResults.innerHTML = '';
        section2.scrollIntoView({behavior: "smooth"});
        container_loader.classList.remove('hide');

        const baseUrl = 'https://openlibrary.org/subjects/';
        input = clearInput(input);

        const timeoutPromise = new Promise((_, reject) => {
            setTimeout(() => {
                reject(new Error("API call took too long to complete."));
            }, 12000);
        });
        let resultPromise = axios.get(`${baseUrl}${input.toLowerCase()}.json`);
        
        let result = await Promise.race([timeoutPromise, resultPromise]);

        const works = result?.data?.works ?? 'not found';

        if(!Array.isArray(works)) throw new Error("works is not an array.");
        
        if(works.length === 0) {
            throw new Error("No results found.")
        }

        const worksData = works.map((element) => {
            return {
                key: element.key,
                title: element.title,
                author: element.authors[0].name
            }
        });

        wrapperResults.innerHTML += worksData.map(({key, title, author}) => 
            `<div class="card" id="${key}">
                <p class="title">${title}</p>
                <p class="author">${author}</p>
            </div>`
        ).join("");

    } catch(e) {
        launchError(e);
        wrapperResults.innerHTML = "Sorry, there was an error retrieving the information. Please check your internet connection and try again later.";
    } finally {
        container_loader.classList.add('hide');
    }
}


export async function getDescription(key, bookTitle, bookDescription, axios, container_loader) {
    try {
        console.log(key);
        bookTitle.textContent = '';
        bookDescription.textContent = '';
        container_loader.classList.remove('hide');

        let timeoutPromise = new Promise((_, reject) => {
            setTimeout(() => {
                reject(new Error("API call took too long to complete."));
            }, 12000);
        }).catch(e => {
            bookDescription.innerHTML = "Sorry, the request took too long to complete. Please check your internet connection and try again later.";
        });

        let response = await axios.get(`https://openlibrary.org${key}.json`);

        let result = await Promise.race([timeoutPromise, response]);

        const title = result?.data?.title ?? 'Titolo non trovato';
        let description = result?.data?.description ?? 'Descrizione non trovata';
        
        if (typeof description === 'object' && description.hasOwnProperty('value')) {
            description = description.value;
        }

        bookTitle.textContent = title;  
        bookDescription.textContent = description;
    } catch(e) {
        launchError(e);
        bookDescription.innerHTML = "Sorry, there was an error retrieving the information. Please check your internet connection and try again later.";
    } finally {
        container_loader.classList.add('hide');
    }
}


// 

function clearInput(input) {

    input = input.trim();
    input = input.replace(/\s+/g, '_');
    return input;
}

function launchError(e) {
    if (e.message === "API call took too long to complete.") {
        console.log("Error: API call took too long to complete.");
    } else if (e.message === "No results found."){
        console.log("Error: No results found.");
    } else {

        switch (e.constructor) {
            case TypeError:
                console.log("TypeError:", e.message);
                break;
            case ReferenceError:
                console.log("ReferenceError:", e.message);
                break;
            case SyntaxError:
                console.log("SyntaxError:", e.message);
                break;
            case Error:
                if (e.message === "works is not an array.") {
                    console.log("Error: works is not an array.");
                } else {
                    console.log("Error:", e.message);
                }
                break;
            default:
                console.log(e);
                break;
        }
    }
}