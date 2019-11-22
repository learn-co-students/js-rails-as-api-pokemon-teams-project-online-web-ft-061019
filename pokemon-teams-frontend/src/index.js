const BASE_URL = "http://127.0.0.1:3000/"
const TRAINERS_URL = `${BASE_URL}/trainers`
const POKEMONS_URL = `${BASE_URL}/pokemons`
const main = document.getElementById('main')

document.addEventListener('DOMContentLoaded', () => {
    fetch(TRAINERS_URL)
    .then(res=>res.json())
    .then(json =>{
        renderTrainers(json)
    })

    function renderTrainers(trainers){
        console.log(trainers)
        for(let i=0; i<trainers.length; i++){
            let card = document.createElement('div')
            card.id = trainers[i].id
            card.className = "card"
            let p = document.createElement('p')
            p.innerText = trainers[i].name
            let btn = document.createElement('button')
            btn.innerText = 'Add Pokemon'
            btn.addEventListener('click', () => {console.log('clicked add pokemon button')})
            let ul = document.createElement('ul')
            trainers[i].pokemons.forEach(poke=> {
                let li = document.createElement('li')
                li.innerText = `${poke.nickname} (${poke.species})`
                let btn2 = document.createElement('button')
                btn2.id = poke.id
                btn2.innerText = 'Release'
                btn2.className = 'release'
                btn2.addEventListener('click', () => {releasePoke(poke)})
                li.appendChild(btn2)
                ul.appendChild(li)
            })
            card.appendChild(p)
            card.appendChild(btn)
            card.appendChild(ul)
            main.appendChild(card)
        }
    }

    function releasePoke(poke){
        console.log('clicked release')
    }
})