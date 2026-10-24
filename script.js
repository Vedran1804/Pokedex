let allPokemons = [];

async function fetchPokemonList() {
    let url = "https://pokeapi.co/api/v2/pokemon?limit=20";
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

function renderPokemon(pokemon) {
    let container = document.getElementById("pokemon-container");

    container.innerHTML += `
       <div class="pokemon-card"> <p>#${pokemon.id}</p>
       <img src="${pokemon.sprites.front_default}" alt="${pokemon.name}">
       <h2>${pokemon.name}</h2>
       </div>`;
}

fetchPokemonList();