const BASE_URL = "http://localhost:3000"
const TRAINERS_URL = `${BASE_URL}/trainers`
const POKEMONS_URL = `${BASE_URL}/pokemons`

console.log("%c Welcome to pokèmon trainers!", "color: yellow; -webkit-text-stroke-width: 1px; -webkit-text-stroke-color: blue;  font-size: 50px;");
const trainersContainer = document.querySelector('main');

// First we need to get our trainers and their pokemon:
fetch(TRAINERS_URL)
.then(resp => resp.json())
.then(trainers => {
  // For each trainer we want to create some HTML and then append 
  // it to the DOM
  trainers.forEach(renderTrainer);
});

function renderTrainer(trainer){
  const html = `
    <div class="card" data-id=${trainer.id}><p>${trainer.name}</p>
      <button data-trainer-id=${trainer.id}>Add Pokemon</button>
      <ul data-trainer-ul=${trainer.id}></ul>
    </div>`;

    // Find our specific trainer ul by using the dataset attribute
    trainersContainer.insertAdjacentHTML('beforeend', html);
    const trainerUl = document.querySelector(`[data-trainer-ul='${trainer.id}']`)
    trainer.pokemons.forEach(pokemon => renderPokemon(pokemon, trainerUl));
}; 

function renderPokemon(pokemon, trainerUl){
  // Now we want to generate the HTML for each pokemon 
  const html = `
        <li>
          ${pokemon.nickname} (${pokemon.species}) 
          <button class="release" data-pokemon-id=${pokemon.id}>
            Release
          </button>
        </li>`;
  // Now we want to generate the HTML for each pokemon 
  trainerUl.insertAdjacentHTML('beforeend', html);
};

// EVENT DELEGATOR
trainersContainer.addEventListener('click', (e) => {
  if(e.target.innerText === "Add Pokemon"){
    const trainerUl = e.target.nextElementSibling
    const trainerId = e.target.dataset.trainerId;

    if(trainerUl.children.length < 6){
      fetch(POKEMONS_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json'
        },
        body: JSON.stringify({
          "trainer_id": trainerId
        })
      })
      .then(resp => resp.json())
      .then(pokemon => renderPokemon(pokemon, trainerUl))
    };
  };

  if(e.target.classList.contains("release")){
    const pokemonId = e.target.dataset.pokemonId;
    fetch(`${POKEMONS_URL}/${pokemonId}`, {
      method: 'DELETE'
    })
    .then(resp => resp.json())
    .then(pokemon => e.target.parentElement.remove());
  };
});

