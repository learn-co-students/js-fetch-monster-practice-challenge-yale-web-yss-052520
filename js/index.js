document.addEventListener('DOMContentLoaded', function(){

    function qs(selector){
        return document.querySelector(selector)
    }
    function ce(element){
        return document.createElement(element)
    }
    const url = "http://localhost:3000/monsters"
    const monsterForm = qs("#create-monster")
    const monsterContainer = qs("#monster-container")
    const forwardBtn = qs('#forward')
    const backBtn = qs('#back') 
    let number = 50
    let page = 1

    function getMonsters(number, page){
        fetch(url + `?_limit=${number}&_page=${page}`)
        .then(response => response.json())
        .then(info => info.forEach(monster =>{addMonster(monster)}))
    }

    function addMonster(monster){
        const div = ce("div")
        div.className = "monster"

        const name = ce("p")
        name.innerText = "Name: " + monster.name 

        const age = ce("p")
        age.innerText = "Age: " + monster.age 

        const desc = ce("p2")
        desc.innerText = "Description: " + monster.description

        div.append(name, age, desc) 
        monsterContainer.append(div)
    }

    monsterForm.addEventListener('submit', () => {
        event.preventDefault()
        const name = event.target[0].value
        const age = event.target[1].value
        const desc = event.target[2].value

        const configObj = {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                "name": name,
                "age": age,
                "description": desc
            })
        }
        fetch(url, configObj)
        .then(res => res.json())
        .then(info => addMonster(data))
    })

    forwardBtn.addEventListener("click", () => {
        page++ 
        getMonsters()
    })

    backBtn.addEventListener("click", () => {
        if (page <= 1) {
            alert("No monsters created")
            return
        }
        page--
        getMonsters()
    })
    getMonsters()
})