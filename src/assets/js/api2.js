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
         
        let result = await axios.get(`https://openlibrary.org/subjects/${input.toLowerCase()}.json`);
        container_loader.classList.add('hide');
        
        const works = result?.data?.works ?? 'non trovato';

        if(!Array.isArray(works)) throw new Error("works is not an array.");

        works.forEach(element => {
            wrapperResults.innerHTML += 
            `
                <div class="card" id="${element.key}">
                    <p class="title">${element.title}</p>
                    <p class="author">${element.authors[0].name}</p>
                </div>
                `;
        });
    } catch(e) {
        console.log(e);
        container_loader.classList.add('hide');

        launchError(e);
    }
}

function clearInput(input) {
    let cInput = input.split(" ");

    console.log(cInput[0]);

    return cInput[0];
}

function launchError(error) {
    if (error instanceof TypeError) {
        console.log("TypeError:", error.message);
      } else if (error instanceof ReferenceError) {
        console.log("ReferenceError:", error.message);
      } else if (error instanceof SyntaxError) {
        console.log("SyntaxError:", error.message);
      } else if (error.message === "works is not an array."){
        console.log("Error: works is not an array.")
      } else {
        console.log("Error:", error.message);
      }
}