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
      <div class="modal-header">
      <span class="close-btn" onclick="closePokemonModal()">X</span>
      <p>#${pokemon.id}</p>
      </div>
      <div class="pokemon-data">
      <img src="${image}" alt="${name}">
      <h2>${name}</h2>
      </div>
      <div class="pokemon-stats">
      <p>Height:${pokemon.height} m</p>
      <p>Weight: ${pokemon.weight} kg</p>
      <p>Defense: ${pokemon.stats.find((s) => s.stat.name === "defense").base_stat}</p>
      <p>Attack: ${pokemon.stats.find((s) => s.stat.name === "attack").base_stat}</p>
      </div>
      `;
}