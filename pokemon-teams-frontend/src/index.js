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
    addPokeBtn.innerText = "Add Pokemon"

    let ul = document.createElement('ul')
    
    trainer.pokemons.forEach(pokemon => {
        let li = document.createElement('li')
        li.innerHTML = `${pokemon.nickname} (${pokemon.species}) `

        let releaseBtn = document.createElement('button')
        releaseBtn.setAttribute('class', 'release')
        releaseBtn.setAttribute('data-pokemon-id', pokemon.id)
        releaseBtn.innerText = 'Release'
    
        ul.append(li)
        li.append(releaseBtn)
       
    })
    trainerContainer.append(divCard)
    divCard.append(p, addPokeBtn, ul)
}


document.addEventListener('DOMContentLoaded', () => {
    fetchTrainers().then(trainers => {
        trainers.forEach(trainer => {
            console.log(trainer)
            renderTeams(trainer)
        })
    })
})