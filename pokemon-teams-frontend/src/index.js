const BASE_URL = "http://127.0.0.1:3000/"
const TRAINERS_URL = `${BASE_URL}/trainers`
const POKEMONS_URL = `${BASE_URL}/pokemons`

document.addEventListener('DOMContentLoaded', () => {
    fetch(TRAINERS_URL)
    .then(res=>res.json())
    .then(json =>{
        renderTrainers(json)
    })

    function renderTrainers(trainers){
        console.log(trainers)
    }
})