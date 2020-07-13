
document.addEventListener('DOMContentLoaded', function(){

    const container = document.querySelector('div#monster-container')
    const backButton = document.querySelector('button#back')
    const forButton = document.querySelector('button#forward')

    function addMonster(monster){
        const monsterName = document.createElement('h3')
        monsterName.innerText = monster.name + ", age: " + monster.age + ", id:" + monster.id
        const monsterDesc = document.createElement('p')
        monsterDesc.innerText = monster.description 

        const card = document.createElement('div.card')
        card.id = monster.id 
        card.appendChild(monsterName)
        card.appendChild(monsterDesc) 
        container.append(card)  
    } 

    function loadFiftyMonsters(num){
        const topBound = parseInt(num) + 50
        container.innerHTML = "" 
        for (num; num < topBound; num++){
            fetch("http://localhost:3000/monsters/"+num) 
            .then(res => res.json()) 
            .then (monster => { 
                addMonster(monster)
            }) 
        }  
    } 
    
    loadFiftyMonsters(backButton.className) 

    backButton.addEventListener('click', function(){
        let lowBound = parseInt(forButton.className) 
        if (lowBound != 0){
            loadFiftyMonsters(lowBound) 
            backButton.className = parseInt(backButton.className) - 50 
            forButton.className =  parseInt(forButton.className) - 50 
        }
    }) 

    forButton.addEventListener('click', function(){
        let lowBound = parseInt(forButton.className) + 50 
        loadFiftyMonsters(lowBound) 
        backButton.className = parseInt(backButton.className) + 50 
        forButton.className =  parseInt(forButton.className) + 50 
    })

    const newMonsterForm = document.querySelector('form#make-monster')
    newMonsterForm.addEventListener('submit', function() {
        event.preventDefault() 

        const newMonsterName = document.querySelector('input#name').value
        const newMonsterAge = document.querySelector('input#age').value 
        const newMonsterDesc = document.querySelector('input#description').value 
        const configObj = {
            method: 'POST', 
            headers: {
                'Content-type': 'application/json',
                'Accept': 'application/json' 
            },
            body: JSON.stringify({
                name: newMonsterName,
                age: newMonsterAge,
                description: newMonsterDesc 
            }) 
        }
        fetch("http://localhost:3000/monsters", configObj)
        .then(res => res.json())
        .then(monster => addMonster(monster)) 
        newMonsterForm.reset() 
    }) 
})

