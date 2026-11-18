const body = document.body;
const loadingSpinnerRef = document.getElementById("loading-spinner");

let allPokemons = [];
let offset = 0;
const limit = 20;

function init() {
    fetchPokemonList();
}


function showLoadingSpinner() {
    body.classList.add("overflow-hidden");
    loadingSpinnerRef.classList.remove("d-none");
}

function hideLoadingSpinner() {
    body.classList.remove("overflow-hidden");
    loadingSpinnerRef.classList.add("d-none");
}

async function fetchPokemonList() {
    showLoadingSpinner();
    let loadMoreBtn = document.getElementById("loadMoreBtn");
    if (loadMoreBtn) loadMoreBtn.disabled = true;

    try {
        let url = `https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`;
        let response = await fetch(url);
        let data = await response.json();

        for (let i = 0; i < data.results.length; i++) {
            await fetchPokemonDetails(data.results[i].url);
        }

    } catch (error) {
        console.error("Loading Error:", error);
    } finally {
        hideLoadingSpinner();
        if (loadMoreBtn) loadMoreBtn.disabled = false;
    }
}
 
async function fetchPokemonDetails(url) {
    let response = await fetch(url);
    let pokemon = await response.json();

    allPokemons.push(pokemon);

    let index = allPokemons.length - 1;
    renderPokemon(pokemon, index);
}

function renderPokemon(pokemon, index) {
    let container = document.getElementById("pokemon-container");

    container.innerHTML += createPokemonCardTemplate(pokemon, index);
}


function openPokemonModal(index) {
    let dialog = document.getElementById("pokemonDialog");
    let pokemon = allPokemons[index];
    dialog.innerHTML = getPokemonDialogTemplate(pokemon, index);
    dialog.showModal();

    document.body.style.overflow = "hidden";
}


function closePokemonModal() {
    let dialog = document.getElementById("pokemonDialog");
    dialog.close();

    document.body.style.overflow = "auto";
}

let dialog = document.getElementById("pokemonDialog");

dialog.addEventListener('click', (event) => {
   
    if (event.target === dialog) {
        closePokemonModal();
    }
});


function loadMorePokemons() {
    offset += limit;
    fetchPokemonList();
}


function filterPokemons() {
    let search = document.getElementById("search-bar").value.toLowerCase();
    let container = document.getElementById("pokemon-container");
    container.innerHTML = "";

   
    if (search.length > 0) {
        if (loadMoreBtn) loadMoreBtn.classList.remove ("d-none");
    } else {
        if (loadMoreBtn) loadMoreBtn.classList.remove("d-none");
    }

    let foundCount = 0; 

    for (let i = 0; i < allPokemons.length; i++) { 
        if (allPokemons[i].name.toLowerCase().includes(search)) {
            renderPokemon(allPokemons[i], i);
            foundCount++;
        }
    }

    if (foundCount === 0) {
        container.innerHTML = `<div class="no-pokemon-box">
                <p class="no-pokemon-found" data-id="not-found">No Pokemon</p>
                <img src="img/no-pokemon.png" alt="No Pokemon found" class="no-pokemon-img">
            </div>`;
    }
}


function changePokemon(index, direction) {
    let newIndex = index + direction;
    if (newIndex >= 0 && newIndex < allPokemons.length) {
        openPokemonModal(newIndex);
    }
}




