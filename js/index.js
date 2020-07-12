document.addEventListener("DOMContentLoaded", () => {

    let monsterForm = document.querySelector('form.add-monster-form')
    let forwardBtn = document.querySelector('button#forward')
    let backBtn = document.querySelector('button#back')
    let page = 1

    function ce(element) {
        return document.createElement(element)
    }

    function fetchMonsters(page) {
        fetch(`http://localhost:3000/monsters/?_limit=50&_page=${page}`)
        .then(res => res.json())
        .then(displayMonsters)
    }

    function displayMonsters(monsters) {
        monsters.forEach(monster => createMonster(monster))
    }

    function createMonster(monster) {
        const container = document.getElementById('monster-container')
        const div = ce('div')
        div.className = 'card'

        const id = ce('h2')
        id.innerText = `Id: ${monster.id}`

        const name = ce('h2')
        name.innerText = `Name: ${monster.name}`

        const age = ce('h2')
        age.innerText = `Age: ${parseInt(monster.age, 10)}`

        const description = ce('p')
        description.innerText = `Description: ${monster.description}`

        div.append(id, name, age, description)
        container.append(div)
    }

    monsterForm.addEventListener('submit', () => {
        event.preventDefault()

        let name = event.target[0].value
        let age = event.target[1].value
        let description = event.target[2].value

        let configObj = {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                "name": name,
                "age": age,
                "description": description
            })
        }

        fetch('http://localhost:3000/monsters', configObj)
        .then(res => res.json())
        .then(newMonster => {
            createMonster(newMonster)
            monsterForm.reset()
        })
    })

    function pageUp() {
        page += 1
        if(page >= 1){
            const container = document.getElementById('monster-container')
            container.innerHTML = ""
            fetchMonsters(page)
        }
        else{
            window.alert('Page not valid!')
            page = 1
            fetchMonsters(page)
        }
    }

    forwardBtn.addEventListener('click', pageUp)

    function pageDown() {
        page -= 1
        if(page >= 1){
            const container = document.getElementById('monster-container')
            container.innerHTML = ""
            fetchMonsters(page)
        }
        else{
            window.alert('Page not valid!')
            page = 1
            fetchMonsters(page)
        }
    }

    backBtn.addEventListener('click', pageDown)



    fetchMonsters(page)
})