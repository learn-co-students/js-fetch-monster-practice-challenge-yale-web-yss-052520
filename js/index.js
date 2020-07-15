document.addEventListener("DOMContentLoaded", () => {
    function qs(selector){
        return document.querySelector(selector)
    }
    
      function ce(element){
        return document.createElement(element)
    }

    let monsterlist = qs("ul#monsters")
    let number = 2
    function getMonsters(number=2){
        monsterlist.innerHTML = ""
        return fetch(`http://localhost:3000/monsters/?_limit=20&_page=${number}`)
        .then(res => res.json())
        .then(monsters => showMonsters(monsters))
}

function showMonsters(monsters){
        monsters.forEach(monster => {
            addMonster(monster)
        })
}


function addMonster(monster){
    let h2 = ce('h2')
    h2.innerText = monster.name

    let agep = ce("p")
    agep.innerText = monster.age

    let p = ce("p")
    p.innerText = monster.description
    
    
    monsterlist.append(h2, agep, p)    
}

getMonsters()

let backBtn = qs("button#back")
let forwardBtn = qs("button#forward")

backBtn.addEventListener("click", () => {
    number = number - 1
    getMonsters(number)
    return number
})

forwardBtn.addEventListener("click", () => {
    number = number + 1
    getMonsters(number)
    return number
})



})