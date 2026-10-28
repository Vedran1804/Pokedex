let allPokemons = [];
let offset = 0;
const limit = 15;


async function fetchPokemonList() {
    let url = "https://pokeapi.co/api/v2/pokemon?limit=21";
    let response = await fetch(url);
    let data = await response.json();

    for (let i = 0; i < data.results.length; i++) {
        await fetchPokemonDetails(data.results[i].url);
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

    dialog.innerHTML = getPokemonDialogTemplate(pokemon);
    dialog.showModal();
}


function closePokemonModal() {
    let dialog = document.getElementById("pokemonDialog");
    dialog.close();
}



fetchPokemonList();

function filterPokemons() {
    let search = document.getElementById("search-bar").value.toLowerCase();
    let container = document.getElementById("pokemon-container");
    container.innerHTML = "";

    for (let i = 0;  i < allPokemons.length; i++ ) { 
      if (allPokemons[i].name.toLowerCase().includes(search)) {
        renderPokemon(allPokemons[i], i);
      }
    }
}