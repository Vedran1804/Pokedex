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

function getPokemonDialogTemplate(pokemon, index) {
    let name = pokemon.name.toUpperCase();
    let image = pokemon.sprites.front_default;

    let mainType = pokemon.types[0].type.name;

    let typesHTML = '';
    for (let i = 0; i < pokemon.types.length; i++) {
        let typeName = pokemon.types[i].type.name;
        typesHTML += `<span class="pokemon-type ${typeName}">${typeName}</span>`;
    }

    return `
      <div class="pokemon-dialog ${mainType}">
      <div class="modal-header">
      <span class="close-btn" onclick="closePokemonModal()">X</span>
      <p>#${pokemon.id}</p>
      </div>
      <div class="pokemon-data">
      <div class="dialog-change">
      <button data-id="prev-button" class="dialog-arrow-btn" onclick="changePokemon(${index}, -1)" aria-label="Previous pokemon">
         <img src="img/arrow-left.png" alt="Previous">
      </button>
      <img src="${image}" alt="${name}">
      <button data-id="next-button" class="dialog-arrow-btn" onclick="changePokemon(${index}, 1)" aria-label="Next pokemon">
          <img src="img/arrow-right.png" alt="Next">
      </button>
      </div>
      <h2>${name}</h2>

      
      <div class="types-container">
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

function getBackToTopCardTemplate() {
    return `
    <button class="back-to-top-card" onclick="scrollToTop()" role="button" aria-label="Back to top">
        <img src="img/arrow-up.png" alt="top">
    </button>
    `;
}

function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}