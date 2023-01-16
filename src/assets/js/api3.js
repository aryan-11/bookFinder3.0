export async function getBooks(axios, wrapperResults, input, container_loader, section2) {
    try {
        console.debug('entered getbooks');
        wrapperResults.innerHTML = '';
        section2.scrollIntoView({behavior: "smooth"});
        container_loader.classList.remove('hide');

        const baseUrl = 'https://openlibrary.org/subjects/';
        input = clearInput(input);

        let timeoutPromise = new Promise((_, reject) => {
            setTimeout(() => {
                reject(new Error("API call took too long to complete."));
            }, 12000);
        });
        let resultPromise = axios.get(`${baseUrl}${input.toLowerCase()}.json`);
        
        let result = await Promise.race([timeoutPromise, resultPromise]);
        container_loader.classList.add('hide');


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
        console.debug(e);
        container_loader.classList.add('hide');
        launchError(e);

    }
}


export async function getDescription(key, bookTitle, bookDescription, axios, container_loader) {
    try {
        console.log('entered getDescription');
        bookTitle.textContent = '';
        bookDescription.textContent = '';
        container_loader.classList.remove('hide');

        let timeoutPromise = new Promise((_, reject) => {
            setTimeout(() => {
                reject(new Error("API call took too long to complete."));
            }, 12000);
        });

        let response = await axios.get(`https://openlibrary.org${key}.json`);

        let result = await Promise.race([timeoutPromise, response]);

        const title = result?.data?.title ?? 'Titolo non trovato';
        let description = result?.data?.description ?? 'Descrizione non trovata';
        console.log(description);
        
        if (typeof description === 'object' && description.hasOwnProperty('value')) {
            // description = description.value;
            description = description.value;
            console.log(description);
        }

        container_loader.classList.add('hide');

        bookTitle.textContent = title;  
        bookDescription.textContent = description;
    } catch(e) {
        console.debug(e);
        container_loader.classList.add('hide');
        launchError(e);
    }
}


function clearInput(input) {
    let cInput = input.split(" ");
    return cInput[0];
}

function launchError(e) {
    // console.debug(e);
    
    if (e.message === "API call took too long to complete.") {
        console.debug("Error: API call took too long to complete.");
    } else if (e.message === "No results found."){
        console.debug("Error: No results found.");
    } else {

        switch (e.constructor) {
            case TypeError:
                console.debug("TypeError:", e.message);
                break;
            case ReferenceError:
                console.debug("ReferenceError:", e.message);
                break;
            case SyntaxError:
                console.debug("SyntaxError:", e.message);
                break;
            case Error:
                if (e.message === "works is not an array.") {
                    console.debug("Error: works is not an array.");
                } else {
                    console.debug("Error:", e.message);
                }
                break;
            default:
                console.debug(e);
                break;
        }
    }
}