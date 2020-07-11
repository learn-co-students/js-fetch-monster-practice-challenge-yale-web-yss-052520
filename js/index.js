document.addEventListener('DOMContentLoaded', () => {
    const monsterListDiv = document.getElementById('monster-container')
    const newMonsterDiv = document.getElementById('create-monster')
    const forwardButton = document.getElementById('forward')
    const backButton = document.getElementById('back')
    let page = 1
    // const monsterList = document.createElement('ul')

    function addMonster(monster) {
        const monsterDiv = document.createElement('div')
        monsterDiv.className = 'monster-item'
        const nameTag = document.createElement('h2')
        nameTag.className = 'monster-name'
        nameTag.innerText = monster.name
        const ageTag = document.createElement('h4')
        ageTag.className = 'monster-age'
        ageTag.innerText = "Age: " + monster.age
        const descTag = document.createElement('p')
        descTag.className = 'monster-description'
        descTag.innerText = "Bio: " + monster.description

        monsterDiv.append(nameTag, ageTag, descTag)
        monsterListDiv.append(monsterDiv)
    }

    function loadMonsters(monsters) {
        monsters.forEach(monster => addMonster(monster))
    }

    function createMonsterForm() {
        const monsterForm = document.createElement('form')
        const nameInput = document.createElement('input')
        nameInput.id = 'name'
        nameInput.placeholder = 'name...'
        const ageInput = document.createElement('input')
        ageInput.id = 'age'
        ageInput.placeholder = 'age...'
        const descInput = document.createElement('input')
        descInput.id = 'description'
        descInput.placeholder = 'description...'
        const createButton = document.createElement('button')
        createButton.innerText = 'Create'

        monsterForm.append(nameInput, ageInput, descInput, createButton)
        newMonsterDiv.append(monsterForm)
        return createButton
    }

    function createNewMonster(params) {
        fetch('http://localhost:3000/monsters', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json"
            },
            body: JSON.stringify({
                name: params[0],
                age: params[1],
                description: params[2]
            })
        })
        // .then(res => res.json())
        // .then(monster => {return monster})
    }

    function getNewMonsterInfo() {
        const name = document.getElementById('name').value
        const age = document.getElementById('age').value
        const desc = document.getElementById('desc').value

        return [name, age, desc]
    }

    function pageBackTest() {
        return page === 1 ? false : page - 1
    }
    
    function moveBackward() {
        const newPage = pageBackTest()
        // debugger
        if (!newPage) {
            alert('No Monsters Here!')
        } else {
            page = newPage
            getRequest()
        }
    }
    
    function moveForward() {
        page++
        getRequest()
    }


    function getRequest() {
        monsterListDiv.innerHTML = ""
        fetch(`http://localhost:3000/monsters/?_limit=50&_page=${page}`)
            .then(res => res.json())
            .then(monsters => loadMonsters(monsters))
    }

    getRequest()
    
    const createButton = createMonsterForm()
    createButton.addEventListener('click', () => {
        // console.log('Hi')
        monsterParams = getNewMonsterInfo()
        createNewMonster(monsterParams)
        createButton.parentElement.reset()
    })
    
    backButton.addEventListener('click', moveBackward)
    forwardButton.addEventListener('click', moveForward)

})