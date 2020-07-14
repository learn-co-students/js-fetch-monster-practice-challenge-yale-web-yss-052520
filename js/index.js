const creationDiv = document.querySelector("div#create-monster")
const monsterList = document.querySelector("div#monster-container")
const backButton = document.querySelector("button#back")
const forwardButton = document.querySelector("button#forward")
let rangeStart = 0
let range = 50

let formHeader = document.createElement("h2")
  formHeader.innerText = "Create new monster"
let nameLabel = document.createElement("label")
  nameLabel.innerText = "Name:"
let monsterForm = document.createElement("form")
let monsterName = document.createElement("input")
  monsterName.setAttribute('type', 'text')
let ageLabel = document.createElement("label")
  ageLabel.innerText = "Age:"
let monsterAge = document.createElement("input")
  monsterAge.setAttribute('type', 'number')
let descLabel = document.createElement("label")
  descLabel.innerText = "Description:"
let monsterDesc = document.createElement("input")
  monsterDesc.setAttribute('type', 'textarea')
let monsterSubmit = document.createElement("input")
  monsterSubmit.setAttribute('type', 'submit')

monsterForm.append(formHeader, nameLabel, monsterName, ageLabel, monsterAge, descLabel, monsterDesc, monsterSubmit)

creationDiv.append(monsterForm)

monsterForm.addEventListener('submit', (e) => {
  e.preventDefault()

  let configObj = {
    method: "POST",
    headers: { //metadata. make sure 'headers' is plural.
      "Content-Type": "application/json",
      Accept: "application/json"
    },
    body: JSON.stringify({
      name: monsterForm[0].value,
      age: monsterForm[1].value,
      description: monsterForm[2].value
    })
  }

  fetch('http://localhost:3000/monsters', configObj)
  .then(res => res.json)
  .then(console.log)
  .then(() => {
    monsterForm.reset()
  })

  
})



function showMonsters(rangeStart){
  
  monsterList.innerHTML = ""

  fetch("http://localhost:3000/monsters")
  .then(res => res.json())
  .then(monsters => {
    monsters.slice(rangeStart, rangeStart + range).forEach(monster => {
      addMonster(monster)
    })
  })

}

function addMonster(monster){

  div = document.createElement('div')
  
  nm = document.createElement('h2')
  nm.innerText = monster.name

  age = document.createElement('h5')
  age.innerText = `Age: ${monster.age}`

  desc = document.createElement('p')
  desc.innerText = monster.description

  div.append(nm, age, desc)

  monsterList.append(div)

}

backButton.addEventListener('click', () => {
  if (rangeStart >= range){
    rangeStart = rangeStart - range
    showMonsters(rangeStart)
  } else {
    alert("No monsters this way...")
  }
})

forwardButton.addEventListener('click', () => {
  rangeStart = rangeStart + range
  showMonsters(rangeStart)
})

showMonsters(rangeStart)