export async function getBooks(axios, wrapperResults, input, container_loader, section2) {
    try
    {
        console.log('entrato nel getbooks');
        wrapperResults.innerHTML = '';
        section2.scrollIntoView({behavior: "smooth"});
        setTimeout(() => {
            container_loader.classList.remove('hide');
        }, 500);

        input = clearInput(input);
         
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
        bookTitle.textContent = '';
        bookDescription.textContent = '';
        container_loader.classList.remove('hide');
        let response = await axios.get(`https://openlibrary.org${key}.json`)
        .catch(function (error) {
            console.log(error);
            wrapperResults.innerHTML = "<p>There might be an Error...<br>Check your internet connection and try again</p>";
          });;
        const title = response?.data?.title ?? 'non trovato';
        const description = response?.data?.description ?? 'non trovato';
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

function clearInput(input) {
    let cInput = input.split(" ");

    console.log(cInput[0]);

    return cInput[0];
}