const BASE_URL = "http://localhost:3000"
const TRAINERS_URL = `${BASE_URL}/trainers`
const POKEMONS_URL = `${BASE_URL}/pokemons`

const trainerContainer = document.getElementById('trainer-container')

const parseJSON = response => response.json()

function fetchTrainers() {
    return fetch(TRAINERS_URL)
        .then(parseJSON)
}



function renderTeams(trainer) {
    let divCard = document.createElement('div')
    divCard.setAttribute('class', 'card')
    divCard.setAttribute('data-id', trainer.id)

    let p = document.createElement('p')
    p.innerHTML = `${trainer.name}`

    let addPokeBtn = document.createElement('button')
    addPokeBtn.setAttribute('data-id', trainer.id)
    addPokeBtn.setAttribute('class', 'add-pokemon-btn')
    addPokeBtn.innerText = "Add Pokemon"
    addPokeBtn.addEventListener('click', addPokemonHandler)

    let ul = document.createElement('ul')
    
    trainer.pokemons.forEach(pokemon => {
        addToTeam.call(ul, pokemon)
       
    })
    trainerContainer.append(divCard)
    divCard.append(p, addPokeBtn, ul)
}

function addPokemonHandler(e){
   console.log(this.dataset.id)
   fetch(POKEMONS_URL, {
       method: 'POST',
       headers: {
           'Content-Type': 'application/json'
       },
       body: JSON.stringify({
           trainer_id: this.dataset.id
       })
   }
    ).then(parseJSON)
    .then(pokemon => {
        addToTeam.call(this.parentElement.querySelector('ul'), pokemon)
    })
}

function addToTeam(pokemon){
    let li = document.createElement('li')
        li.innerHTML = `${pokemon.nickname} (${pokemon.species}) `

        let releaseBtn = document.createElement('button')
        releaseBtn.setAttribute('class', 'release')
        releaseBtn.setAttribute('data-pokemon-id', pokemon.id)
        releaseBtn.innerText = 'Release'
        releaseBtn.addEventListener('click', event => releasePokemon(event, pokemon))
    
        this.append(li)
        li.append(releaseBtn)
}

function releasePokemon(event, pokemon) {
    fetch(`${POKEMONS_URL}/${pokemon.id}`,{
        method: 'DELETE'
    })
    .then( () => { event.target.parentNode.parentElement.removeChild(event.target.parentNode) } )
    .catch( error => console.log );
}




document.addEventListener('DOMContentLoaded', () => {
    fetchTrainers().then(trainers => {
        trainers.forEach(trainer => {
           // console.log(trainer)
            renderTeams(trainer)
        })
    })
})