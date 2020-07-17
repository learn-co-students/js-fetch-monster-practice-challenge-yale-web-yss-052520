

let pageNum = 1

document.addEventListener('DOMContentLoaded', () => {
    // Pre-Existing DOM Elements
    const monsterContainer = document.querySelector('div#monster-container')
    const formDiv = document.querySelector('div#create-monster')
    const leftButton = document.querySelector("#back")
    const rightButton = document.querySelector("#forward")


    fetchMonsters();
    createForm();


    leftButton.addEventListener('click', () => {
        pageNum-=1
        fetchMonsters();
    })
    rightButton.addEventListener('click', () => {
        pageNum+=1
        fetchMonsters();
    })


    function createForm(){
        const form = ce('form')

        const name = document.createElement('INPUT');
        name.setAttribute('type', 'text');
        name.setAttribute('name', 'name')
        name.setAttribute('placeholder', 'name')
        const age = document.createElement('INPUT');
        age.setAttribute('type', 'text')
        age.setAttribute('name', 'age')
        age.setAttribute('placeholder', 'age')
        const description = document.createElement('INPUT');
        description.setAttribute('type', 'text')
        description.setAttribute('name', 'description')
        description.setAttribute('placeholder', 'description')

        const submit = document.createElement('INPUT');
        submit.setAttribute('type', 'submit')
        submit.setAttribute('value', 'Create Monster')
        
        form.append(name, age, description, submit)

        formDiv.append(form)

        form.addEventListener('submit', () => {
            event.preventDefault()

            addMonster(event.target)

        })
    }

    function addMonster(target){
        configObj = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json"
            },
            body: JSON.stringify({
                "name": target.name.value,
                "age":    target.age.value,
                "description":  target.description.value
            })
        }

        fetch('http://localhost:3000/monsters/', configObj)
        .then(res => res.json())
        .then(monster => appendMonster(monster))
    }

    function fetchMonsters(){
        monsterContainer.innerHTML = ""
        fetch(`http://localhost:3000/monsters/?_limit=50&_page=${pageNum}`)
        .then(res => res.json())
        .then(monsters => monsters.forEach(monster => appendMonster(monster)))
    }

    function appendMonster(monster){

        const h2 = ce('h2')
        h2.innerText = monster.name

        const h3 = ce('h3')
        h3.innerText = monster.age

        const p = ce('p')
        p.innerText = monster.description

        monsterContainer.append(h2, h3, p)
    }


    function ce(ele){
        return document.createElement(ele)
    }
})