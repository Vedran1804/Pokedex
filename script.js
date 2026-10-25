let allPokemons = [];

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

    renderPokemon(pokemon);
}

function renderPokemon(pokemon, index) {
    let container = document.getElementById("pokemon-container");

    container.innerHTML += createPokemonCardTemplate(pokemon, index);
}



function openModal(pokemonId) {
    let dialog = document.getElementById("pokemonDialog");
    let pokemon = allPokemons[index];

    dialog.innerHTML = getPokemonDialogTemplate(pokemon);
    dialog.showModal();
}


function closeModal() {
    let dialog = document.getElementById("pokemonDialog");
    dialog.close();
}

fetchPokemonList();