document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("monster-form")
    const monstersList = document.getElementById("monster-container")
    const backButton = document.getElementById("back")
    const forwardButton = document.getElementById("forward")

    let pageMonsters = 1 

    function addMonster(monster) {
        const h3 = document.createElement('h3')
        h3.innerText = monster.name 

        const h4 = document.createElement('h4')
        h4.innerText = `Age: ${monster.age}`

        const p = document.createElement('p')
        p.innerText = monster.description

        monstersList.append(h3, h4, p)
    }

    form.addEventListener("submit", () => {
        event.preventDefault()
        const name = event.target[0].value 
        const age = event.target[1].value 
        const description = event.target[2].value 

        fetch("http://localhost:3000/monsters", {
            method: "POST", 
            headers: {
                "Content-Type": "application/json", 
                "Accept": "application/json"
            },
            body: JSON.stringify({
                name, 
                age, 
                description
            })
        })
        //It shouldn't display more than 50 per page right??
        // .then(response => response.json())    
        // .then(monster => addMonster(monster))
    })

    function getMonsters() {
        //brings you back to the top of the page
        document.body.scrollTop = document.documentElement.scrollTop = 0;
        fetch(`http://localhost:3000/monsters/?_limit=50&_page=${pageMonsters}`)
        .then(response => response.json())
        .then(function(monsters) {
            monstersList.innerHTML = ""
            monsters.forEach(monster => addMonster(monster))
        })
    }

    

    backButton.addEventListener("click", () => {
        if (pageMonsters <= 1) {
            alert("Aint no monsters here")
            return
        }
        pageMonsters--
        getMonsters()
    })

    forwardButton.addEventListener("click", () => {
        pageMonsters++ 
        getMonsters()
    })

    getMonsters()

})