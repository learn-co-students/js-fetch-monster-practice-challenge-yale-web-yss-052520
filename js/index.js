document.addEventListener("DOMContentLoaded", function (){ 

    function ce(element) {
        return document.createElement(element)
    }

    function qs(selector) {
        return document.querySelector(selector)
    }

    const monsterContainer = qs("#monster-container")
    const URL = "http://localhost:3000/monsters"
    const monsterForm = document.getElementById("monster-form")

    const forwardBtn = qs('#forward')
    const backBtn = qs ('#back')


    let number = 50
    let page = 1
    
    function fetchMonsters (number, page) {
        fetch(URL + `?_limit=${number}&_page=${page}`)
        .then(res => res.json())
        .then(monsters => monsters.forEach(monster => displayMonsters(monster)))
    }

    function displayMonsters(monster) {

    let div = ce("div")
    div.className = "monster"

    let name = ce("h1")
    name.innerText = monster.name

    let age = ce("p")
    age.innerText = "Age: " + monster.age

    let bio = ce("p2")
    bio.innerText = "Bio: " + monster.description

    div.append(name, age, bio)
    monsterContainer.append(div)
    }

    monsterForm.addEventListener("submit", () => {
        event.preventDefault()
        const name = event.target[0].value
        const age = event.target[1].value
        const desc = event.target[2].value

        fetch(URL, {
            method: 'POST', 
            headers: { 
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                name,
                age,
                desc
            })
        })
        .then(res => res.json())
        .then(monster => displayMonsters(monster))
        monsterForm.reset()
    })

    forwardBtn.addEventListener("click", () => {
        page++ 
        monsterContainer.innerHTML = ''
        fetchMonsters(number, page)
    })

    backBtn.addEventListener("click", () => {
        if (page > 1)
        page--
        monsterContainer.innerHTML = ''
        fetchMonsters(number, page)
    })


    fetchMonsters()
})
