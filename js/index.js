// {<body>
//     <h1>Monstr Inc.</h1>
//     <div id='create-monster'></div>
//     <div id='monster-container'></div>
//     <button id="back"><=</button>
//     <button id="forward">=></button>
//     <script src='js/index.js'></script>
// </body>}

// helper functions
function ce(element){
    return document.createElement(element)
}

function qs(selector){
    return document.querySelector(selector)
}

// collect necessary html items
const mc = qs("#monster-container")
const formDiv = qs("#create-monster")
let page = 1

// GET monsters
function fetchMonsters(page){
    fetch(`http://localhost:3000/monsters/?_limit=50&_page=${page}`)
    .then(res => res.json())
    // .then(data => console.log(data))
    .then(showMonsters)
    // .then(data => data.forEach(monster =>displayMonster(monster)))
}

// iterate through array of monsters
function showMonsters(monsters){
    // debugger
    monsters.forEach(monster => displayMonster(monster))
}

// display single monster 
function displayMonster(monster){
    // gives each monster their own div
    const div = ce("div")

    const name = ce("h2")
    name.innerText = `Name: ${monster.name}`

    const age = ce('h4')
    age.innerText = `Age: ${monster.age}`

    const description = ce("p")
    description.innerText = `Description: ${monster.description}`

    div.append(name, age, description)
    mc.append(div)
}   

// was inside moster form, but needed global scope
const mF = ce("form")

// monster form
function monsterForm(){
    mF.id = "monster-form"

    const title = ce("h2")
    title.innerText = "Create a Monster!"

    const nameInput = ce("input")
    nameInput.id = "name"
    nameInput.placeholder = "Name..."

    const ageInput = ce("input")
    ageInput.id = "age"
    ageInput.placeholder = "Age..."

    const descInput = ce("input")
    descInput.id = "description"
    descInput.placeholder = "Description..."

    const createBtn = ce("submit")
    createBtn.innerText = "Create Monster"

    // it's not appending to the screen... not sure why
    mF.append(title, nameInput, ageInput, descInput, createBtn)
    formDiv.appendChild(mF)
}

mF.addEventListener("submit", () => {
    event.preventDefault

    let n = event.target[0].value
    let a = event.target[1].value
    let d = event.target[2].value

    let configObj = {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
            "Accept":"application/json"
        },
        body: JSON.stringify({
            name: n,
            age: a,
            description: d
        })
    }

    fetch('http://localhost:3000/monsters', configObj)
    .then(res => res.json())
    .then(newMonster => {
        displayMonster(newMonster)
        mF.reset()
    })
})

// nav functions
let forwardBtn = qs('#forward')
let backBtn = qs('#back')
const pageNum = qs("h4#pageNum")
pageNum.innerText = `You're on page ${page}`
forwardBtn.addEventListener('click', pageUp)
backBtn.addEventListener('click', pageDown)

function pageUp() {
    page += 1
    if(page >= 1){
        mc.innerHTML = ""
        fetchMonsters(page)
    }
    else{
        window.alert("N more monsters! Back to page 1!")
        page = 1
        fetchMonsters(page)
    }
}

function pageDown() {
    page -= 1
    if(page >= 1){
        mc.innerHTML = ""
        fetchMonsters(page)
    }
    else{
        window.alert('Page not valid!')
        page = 1
        fetchMonsters(page)
    }
}


fetchMonsters(page)