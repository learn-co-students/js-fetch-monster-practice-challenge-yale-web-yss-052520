let page = 1
let numMonsters = 0


function qs(el) {
    return document.querySelector(el)
}

function ce(el) {
    return document.createElement(el)
}

const url = 'http://localhost:3000/monsters'

const monsterContainer = qs('div#monster-container')
const monsterForm = ce('form')

const backBtn = qs('button#back')
const forwardBtn = qs('button#forward')

backBtn.addEventListener("click", () => {
    if (page <=1) { return }
    page--
    console.log(page)
    chooseFifty()
})

forwardBtn.addEventListener("click", () => {
    if (page*50 > numMonsters) { return }
    page++
    console.log(page)
    chooseFifty()
})


function createMonster() {
    const newMonster = {
        name: monsterForm[0].value,
        age: monsterForm[1].value,
        description: monsterForm[2].value
    }
    const configObj = {
        method:"POST",
        headers:{
            "Content-Type":"application/json",
            "Accept":"application/json"
        },
        body: JSON.stringify(newMonster)
    }
    monsterForm.reset()
    fetch(url, configObj).then(res => res.json()).then(json => listMonster(json))
}

monsterForm.append(ce('input'), ce('input'), ce('textarea'), ce('input'))
monsterForm[0].placeholder = "Name"
monsterForm[0].type = "Text"
monsterForm[1].placeholder = "Age"
monsterForm[1].type = "Text"
monsterForm[2].placeholder = "Description"
monsterForm[3].type = "submit"
monsterForm[3].innerText = "Add Monster"
qs('div#create-monster').append(monsterForm)

monsterForm.addEventListener("submit", (e) =>  { 
    e.preventDefault()
    createMonster()
})

function listMonster(monster) {
    const div = ce('div')

    const h2 = ce('h2')
    h2.innerHTML = `<strong>Name: </strong>${monster.name}`
    
    const h4 = ce('h4')
    h4.innerHTML = `<strong>Age: </strong>${monster.age}`
    
    const p = ce('p')
    p.innerHTML = `<strong>Description: </strong>${monster.description}`

    div.append(h2, h4, p)
    monsterContainer.append(div)
    
}

function listMonsters(monsters) {
    for (const monster of monsters) {
        listMonster(monster)
    }
}

function chooseFifty() {
    fetch(url).then(res => res.json()).then(json => {
        monsterContainer.innerHTML=null
        numMonsters = json.length
        listMonsters(json.slice((page*50), (page*50+50))) 
    })
}

chooseFifty()

