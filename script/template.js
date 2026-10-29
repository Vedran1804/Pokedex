function createPokemonCardTemplate(pokemon, index) {
    let name = pokemon.name.toUpperCase();
    let image = pokemon.sprites.front_default;

    let mainType = pokemon.types[0].type.name;

    return `
    <button class="pokemon-card ${mainType}" data-id="card" role="button" aria-label="${name}" onclick="openPokemonModal(${index})">
    <p>#${pokemon.id}</p>
    <img data-id="card-image" src="${image}" alt="${name}">
    <h2>${name}</h2>
    </button>
    `; 
}

function getPokemonDialogTemplate(pokemon) {
    let name = pokemon.name.toUpperCase();
    let image = pokemon.sprites.front_default;

    let typesHTML = '';
    for (let i = 0; i < pokemon.types.length; i++) {
        let typeName = pokemon.types[i].type.name;
        typesHTML += `<span class="pokemon-type ${typeName}">${typeName}</span>;`
    }

  

    return `
      <div class="modal-header">
      <span class="close-btn" onclick="closePokemonModal()">X</span>
      <p>#${pokemon.id}</p>
      </div>
      <div class="pokemon-data">
      <img src="${image}" alt="${name}">
      <h2>${name}</h2>
      <div class="types-container>
         ${typesHTML}
         </div>
      </div>
      <div class="pokemon-stats">
      <p>Height:${pokemon.height} m</p>
      <p>Weight: ${pokemon.weight} kg</p>
      <p>Defense: ${pokemon.stats.find((s) => s.stat.name === "defense").base_stat}</p>
      <p>Attack: ${pokemon.stats.find((s) => s.stat.name === "attack").base_stat}</p>
      <p>Speed: ${pokemon.stats.find((s) => s.stat.name === "speed").base_stat}</p>
      <p>HP: ${pokemon.stats.find((s) => s.stat.name === "hp").base_stat}</p>
      </div>
      `;
}