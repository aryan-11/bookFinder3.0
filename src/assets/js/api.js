export async function getBooks(axios, wrapperResults, input, container_loader) {
    try
    {
        console.log('entrato nel getbooks');
        wrapperResults.innerHTML = '';
        container_loader.classList.remove('hide');

        let result = await axios.get(`https://openlibrary.org/subjects/${input.toLowerCase()}.json`)
        .catch(function (error) {
            console.log(error);
            wrapperResults.innerHTML = "<p>There might be an Error...<br>Check your internet connection and try again</p>";
          });

        container_loader.classList.add('hide');

        const works = result?.data?.works ?? 'non trovato';
        works.forEach(element => {
            wrapperResults.innerHTML += 
            `
                <div class="card" id="${element.key}">
                    <p class="title">${element.title}</p>
                    <p class="author">${element.authors[0].name}</p>
                </div>
                `;
        });
    }
    catch{
        (e) => {
            alert(e);
        }

    }
    
}

export async function getDescription(key, bookTitle, bookDescription, axios, container_loader) {
    try {
        // console.log('entrato nel getDescription');
        bookTitle.textContent = '';
        bookDescription.textContent = '';
        container_loader.classList.remove('hide');
        // console.log(key);
        let response = await axios.get(`https://openlibrary.org${key}.json`);
        // let title =  _.get(response, 'data.title', 'titolo non trovato');
        const title = response?.data?.title ?? 'non trovato';
        // console.log(title);
        // let description = _.get(response, 'data.description', 'Book description not found');
        const description = response?.data?.description ?? 'non trovato';
        // console.log(description);
        container_loader.classList.add('hide');

        bookTitle.textContent = title;
        bookDescription.textContent = description;
    }
    catch {
        (e) => {
            alert(e);
        }
    }
}