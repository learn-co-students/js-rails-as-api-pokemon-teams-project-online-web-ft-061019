const BASE_URL = "http://localhost:3000"
const TRAINERS_URL = `${BASE_URL}/trainers`
const POKEMONS_URL = `${BASE_URL}/pokemons`

// main
    // div
        // create card for each trainer
            // p
                // display trainer name
            // button
                // have an "Add Pokemon" button
                // adds pokemon - max 6
            // li
                // lists pokemon
                // #nickname(#name)
                // button.release
                    // have a "Release Button"

document.addEventListener('DOMContentLoaded', function() {
    getTrainers()
})

function getTrainers() {
    fetch(TRAINERS_URL)
    .then(resp => resp.json())
    .then(trainers => {trainers.forEach(trainer => renderTrainer(trainer))}) //renderAllTrainers(trainers))
    .catch(error => console.log(error))
}

function renderTrainer(trainer) {

    const main = document.querySelector("main")
    const div = document.createElement("div")
    const trainerPokemons = trainer.pokemons

    div.className = "card"
    div.setAttribute("trainer-id", trainer.id)
    
    const p = document.createElement("p")
        p.innerText = trainer.name
    
    const button = document.createElement("button")
        button.setAttribute("trainer-id", trainer.id)
        button.innerText = "Add Pokemon"
        // need to add click

    const ul = document.createElement("ul")
        trainerPokemons.forEach(pokemon => {
            const li = document.createElement("li")
                li.innerText = `${pokemon.nickname}(${pokemon.species})`

            const buttonRelease = document.createElement("button")
                buttonRelease.setAttribute("pokemon-id", pokemon.id)
                buttonRelease.className = "release"
                buttonRelease.innerText = "Release"
                // need to add click
            ul.appendChild(li)
            li.append(buttonRelease)
        })

    main.append(div)
    div.append(p, button, ul)
    
       
}

