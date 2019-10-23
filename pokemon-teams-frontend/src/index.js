const BASE_URL = "http://localhost:3000"
const TRAINERS_URL = `${BASE_URL}/trainers`
const POKEMONS_URL = `${BASE_URL}/pokemons`


document.addEventListener("DOMContentLoaded", function(){
    getTrainer()
})

function getTrainer(){
    fetch(TRAINERS_URL)
    .then(response => response.json())
    .then(trainers => {
        trainers.forEach(trainer => renderTrainer(trainer))
    })
    .catch(error => console.log(error))
}

function displayTrainer(trainer){
    div.className = "card"
    div.setAttribute("trainer-id", trainer.id)

    createElements()
    p.innerText = trainer.name

    button.setAttribute("trainer-id", trainer.id)
    button.innerText = "Add pokemon"

    let pokemons = trainer.pokemons
    pokemons.forEach(pokemon => {
        const li = document.createElement("li")
        li.innerText = `${pokemon.nickname}`
    })

    main.append(div)
    div.append(p, ul, button)
}

function createElements(){
    const p = document.createElement("p")
    const ul = document.createElement("ul")
    const button = document.createElement("button")
}