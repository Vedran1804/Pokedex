function createPokemonCardTemplate(pokemon, index) {
    let name = pokemon.name.toUpperCase();
    let image = pokemon.sprites.front_default;

    return `
    <button class="pokemon-card" data-id="card" role="button" aria-label="${name}" onclick="openPokemonModal(${index})">
    <img data-id="card-image" src="${image}" alt="${name}">
    <h2>${name}</h2>
    </button>
    `; 
}

function getPokemonDialogTemplate(pokemon) {
    let name = pokemon.name.toUpperCase();
    let image = pokemon.sprites.front_default;

    return `
      <span class="close-btn" onclick="closeModal()">&times;</span>
      <p>#${pokemon.id}</p>
      <img src="${image}" alt="${name}"
      <h2>${name}</h2>
      <p>Height: ${pokemon.height}</p>
      `;
}