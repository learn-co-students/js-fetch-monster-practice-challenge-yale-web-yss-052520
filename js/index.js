// useful helpers
const qs = (e) => document.querySelector(e)
const ce = (e) => document.createElement(e)

const postURL = "http://localhost:3000/monsters"

let pageNumber = 1

function URL(){
    return `http://localhost:3000/monsters/?_limit=50&_page=${pageNumber}`
} 
//d

document.addEventListener("DOMContentLoaded", () => {
    // useful elements
    const createMonster = qs("div#create-monster")
    const monsterContainer = qs("div#monster-container")
    const backButton = qs("button#back")
    const forwardButton = qs("button#forward")
    //

    // builds monster form
    function createMonsterForm(){
        let newForm = ce("form")
        newForm.id = "monster-form"

        let nameInput = ce("input")
        nameInput.id = "name"
        nameInput.placeholder = "name..."

        let ageInput = ce("input")
        ageInput.id = "age"
        ageInput.placeholder = "age..."

        let descriptionInput = ce("input")
        descriptionInput.id = "description"
        descriptionInput.placeholder = "description..."

        let submitButton = ce("button")
        submitButton.innerText = "Submit"
        
        newForm.addEventListener("submit", (event) => {
            event.preventDefault()

            let configObj = {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Accept: "application/json"
                },
                body: JSON.stringify({
                    name: newForm.elements["name"].value,
                    age: newForm.elements["age"].value,
                    description: newForm.elements["description"].value
                })
            }

            fetch(postURL, configObj)
                .then(() => newForm.reset())
        })

        newForm.append(nameInput, ageInput, descriptionInput, submitButton)

        createMonster.appendChild(newForm)
    }
    //

    // loading monsters
    function fetchMonsters(url){
        fetch(url)
            .then(resp => resp.json())
            .then(monsters => renderMonsters(monsters))
            .catch(error => console.log(error))
    }

    function renderMonsters(monsters){
        for (monster of monsters) {
            renderMonster(monster)
        }
    }

    function renderMonster(monster){
        let monsterDiv = ce("div")

        let monsterName = ce("h2")
        monsterName.innerText = monster.name
        let monsterAge = ce("h4")
        monsterAge.innerText = "Age: " + monster.age
        let monsterDescription = ce("p")
        monsterDescription.innerText = "Bio: " + monster.description

        monsterDiv.append(monsterName, monsterAge, monsterDescription)
        monsterContainer.appendChild(monsterDiv)
    }
    //

    // Navigation functionality
    backButton.addEventListener("click", () => {
        monsterContainer.innerHTML = ""
        pageNumber -= 1
        fetchMonsters(URL())
    })

    forwardButton.addEventListener("click", () => {
        monsterContainer.innerHTML = ""
        pageNumber += 1
        fetchMonsters(URL())
    })
    //

    // Loadup functionality
    function onLoad(){
        createMonsterForm()
        fetchMonsters(URL())
    }

    onLoad()
    //
})