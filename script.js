const body = document.body;
const loadingSpinnerRef = document.getElementById("loading-spinner");
const loadMoreBtn = document.getElementById("loadMoreBtn");

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

function renderPokemonList(pokemonList) {
    for (let i = 0; i < pokemonList.length; i++) {
        renderPokemon(pokemonList[i], i);
    }
}

function openPokemonModal(index) {
    let dialog = document.getElementById("pokemonDialog");
    let pokemon = currentPokemons[index];
    if (!pokemon) return;

    let name = pokemon.name.toUpperCase();
    let image = pokemon.sprites.front_default;
    let mainType = pokemon.types[0].type.name;

    let typesHTML = "";
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

dialog.addEventListener("click", (event) => {
    if (event.target === dialog) {
        closePokemonModal();
    }
});

function loadMorePokemons() {
    offset += limit;
    fetchPokemonList();
}

function filterPokemons() {
    let search = document.getElementById("search-bar").value.trim().toLowerCase();
    let container = document.getElementById("pokemon-container");
    container.innerHTML = "";

    if (search.length < 3) {
        if (loadMoreBtn) loadMoreBtn.classList.remove("d-none");
        currentPokemons = allPokemons;
        renderPokemonList(currentPokemons);
        return;
    }

    if (loadMoreBtn) loadMoreBtn.classList.add("d-none");

    let filteredPokemons = [];

    for (let i = 0; i < allPokemons.length; i++) {
        if (allPokemons[i].name.toLowerCase().includes(search)) {
            filteredPokemons.push(allPokemons[i]);
        }
    }

    if (filteredPokemons.length === 0) {
        currentPokemons = [];
        container.innerHTML = getNoPokemonTemplate();
        return;
    }

    currentPokemons = filteredPokemons;
    renderPokemonList(currentPokemons);
}

function changePokemon(index, direction) {
    let total = currentPokemons.length;
    if (total === 0) return;

    let newIndex = index + direction;

    if (newIndex >= total) {
        newIndex = 0;
    } else if (newIndex < 0) {
        newIndex = total - 1;
    }

    openPokemonModal(newIndex);
}

function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
}