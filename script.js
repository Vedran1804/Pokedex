const body = document.body;
const loadingSpinnerRef = document.getElementById("loading-spinner");

let allPokemons = [];
let offset = 0;
const limit = 20;
let currentPokemons = [];

function init() {
    fetchPokemonList();
}

function delay(ms) {
    return new Promise(function (resolve) {
        setTimeout(resolve, ms);
    });
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
            await delay(80);
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
    currentPokemons = allPokemons;

    let index = allPokemons.length - 1;
    renderPokemon(pokemon, index);
}


function renderPokemon(pokemon, index) {
    let container = document.getElementById("pokemon-container");
    let name = pokemon.name.toUpperCase();
    let image = pokemon.sprites.front_default;
    let mainType = pokemon.types[0].type.name;

    container.innerHTML += createPokemonCardTemplate(pokemon, index, name, image, mainType);
}

function openPokemonModal(index) {
    let dialog = document.getElementById("pokemonDialog");
    let pokemon = currentPokemons[index];
    if (!pokemon) return;

    let name = pokemon.name.toUpperCase();
    let image = pokemon.sprites.front_default;
    let mainType = pokemon.types[0].type.name;

    let typesHTML = '';
    for (let i = 0; i < pokemon.types.length; i++) {
        let typeName = pokemon.types[i].type.name;
        typesHTML += `<span class="pokemon-type ${typeName}">${typeName}</span>`;
    }

    dialog.innerHTML = getPokemonDialogTemplate(pokemon, index, name, image, mainType, typesHTML);
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
        if (loadMoreBtn) loadMoreBtn.classList.add ("d-none");
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
    let total = allPokemons.length;

    if (newIndex >= total) {
        newIndex = 0;
    } else if (newIndex < 0) {
        newIndex = total - 1;
    }

    openPokemonModal(newIndex);
}

let currentPokemonIndex = 0; 
let currentPokemonsList = []; 

function nextPokemon() {
    currentPokemonIndex++;
    
    
    if (currentPokemonIndex >= currentPokemonsList.length) {
        currentPokemonIndex = 0;
    }
    
    renderModal(currentPokemonsList[currentPokemonIndex]);
}

function prevPokemon() {
    currentPokemonIndex--;
    
  
    if (currentPokemonIndex < 0) {
        currentPokemonIndex = currentPokemonsList.length - 1;
    }
    
    renderModal(currentPokemonsList[currentPokemonIndex]);
}


function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
}

