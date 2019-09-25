const BASE_URL = "http://localhost:3000"
const TRAINERS_URL = `${BASE_URL}/trainers`
const POKEMONS_URL = `${BASE_URL}/pokemons`
const main = document.getElementsByTagName("main")[0]

function getAllTeams() {
   fetch(BASE_URL + "/trainers")
      .then(resp => resp.json())
      .then(trainers => displayAllTeams(trainers))
      .catch(error => console.log(error))
}

function displayAllTeams(trainersArr) {
   trainersArr.forEach(trainer => {
      const trainerPokemonsHTML = makeTrainerPokemonsHTML(trainer)
      const trainerCard = makeTrainerCard(trainer) 
      main.appendChild(trainerCard)

      function makeTrainerCard(trainerObj) {
         const newTrainerCard = document.createElement("div")
         newTrainerCard.className = "card"
         newTrainerCard.setAttribute("data-id", trainerObj.id)
         newTrainerCard.innerHTML = `<p>${trainerObj.name}</p>`
               
         const addPokemonBtn = document.createElement("button")
         addPokemonBtn.setAttribute("data-trainer-id", trainerObj.id)
         addPokemonBtn.textContent = "Add Pokemon"
         addPokemonBtn.addEventListener("click", addPokemonToTrainer)
         
         newTrainerCard.appendChild(addPokemonBtn)
         newTrainerCard.appendChild(trainerPokemonsHTML)
         return newTrainerCard 
      }
   })
}

function makeTrainerPokemonsHTML(trainerObj) {
   const pokemonsArr = trainerObj.pokemons
   const pokemonUl = document.createElement("ul")
   pokemonsArr.forEach(pokemon => {
      const singlePokemon = makeSinglePokemon(pokemon)
      pokemonUl.appendChild(singlePokemon)
   })
   return pokemonUl
}

function makeSinglePokemon(pokemon) {
   const singlePokemonLi = document.createElement("li")
      singlePokemonLi.innerHTML = `${pokemon.species} (${pokemon.nickname}) `

      const releasePokemonBtn = document.createElement("button")
      releasePokemonBtn.className = "release"
      releasePokemonBtn.setAttribute("data-pokemon-id", pokemon.id)
      releasePokemonBtn.textContent = "Release"
      releasePokemonBtn.addEventListener("click", releasePokemonFromTrainer)

      singlePokemonLi.appendChild(releasePokemonBtn)
      return singlePokemonLi
}

function addPokemonToTrainer(event) {
   //Only add to trainer if he doesn't have all his slots filled up -- so do it if trainerPokemonsArr.length <(8?) else do nothing. 
   //need to figure out the trainer's id -- go up three elements to get the div class="card" which contains the trainer attribute
   const trainerCard = this.parentElement
   const trainerId = trainerCard.getAttribute("data-id")
   const trainerPokemonsUl = trainerCard.getElementsByTagName("ul")[0]

   const postOptionsObj = {
      method: 'POST',
      headers: {
         'Content-Type': 'application/json',
         'Accept': 'application/json'
      },
      body: JSON.stringify({
         trainer_id: trainerId
      })
   }
      
   fetch(BASE_URL + "/pokemons", postOptionsObj)
      .then(resp => {
         if(resp.ok) {
            return resp.json()
         } else {
            throw Error(resp.statusText)
         }
      })
      .then(newPokemon => {
         newPokemonAddedActions(newPokemon)
      })
      .catch(error => console.log(error))

   function newPokemonAddedActions(newPokemonObj) {
      const newTrainerPokemon = makeSinglePokemon(newPokemonObj)
      trainerPokemonsUl.appendChild(newTrainerPokemon)
   }
}

function releasePokemonFromTrainer(event) {
   //Only add to trainer if he doesn't have all his slots filled up -- so do it if trainerPokemonsArr.length <(8?) else do nothing. 
   //need to figure out the trainer's id -- go up three elements to get the div class="card" which contains the trainer attribute
   
   const trainerCard = this.parentElement.parentElement.parentElement
   const trainerId = trainerCard.getAttribute("data-id")
   const pokemonLi = this.parentElement
   const pokemonId = this.getAttribute("data-pokemon-id")

   const deleteOptionsObj = {
      method: 'DELETE',
      headers: {
         'Content-Type': 'application/json',
         'Accept': 'application/json'
      },
      body: JSON.stringify({
         pokemon: {
            trainer_id: trainerId
         }
      })
   }
      
   fetch(BASE_URL + `/pokemons/${pokemonId}`, deleteOptionsObj)
      .then(resp => {
         if(resp.ok) {
            return resp.json()
         } else {
            throw Error(resp.statusText)
         }
      })
      .then(deletedPokemon => {
         deletePokemonActions()
      })
      .catch(error => console.log(error))

   function deletePokemonActions() {
      pokemonLi.remove()
      console.log("Pokemon deleted from Trainer Successfully")
   }
}

document.addEventListener("DOMContentLoaded", function() {
   getAllTeams()   
});