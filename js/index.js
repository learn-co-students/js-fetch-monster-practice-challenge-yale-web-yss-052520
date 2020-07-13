document.addEventListener('DOMContentLoaded', () => {
    const url = 'http://localhost:3000/monsters/'
    const monsterContainer = document.querySelector('div#monster-container')
    const formContainer = document.querySelector('div#create-monster')

    createForm()
    let page = 1
    let num = 50
    fetchMonsters(num, page)
  

    function fetchMonsters(num, page){
        fetch(url + `?_limit=${num}&_page=${page}`)
        .then(res => res.json())
        .then(data => data.forEach(monster =>{addMonster(monster)}))
    }
 
    function addMonster(monster){
        const div = document.createElement('div')
        div.innerHTML = 
            `<h2>${monster.name}</h2>
            <h4>Age: ${monster.age}</h4>
            <p>Bio: ${monster.description}</p>`
        monsterContainer.append(div)
    } 

    function createForm(){
       const form = document.createElement('form') 
       form.id = 'monster-form'

       function createInput(value){
           const input = document.createElement('input') 
           input.id = `${value}`
           input.placeholder = `${value}...`
           return input
       }
       const btn = document.createElement('button') 
       btn.id = "create-monster"
       btn.innerText = 'Create'
    //    btn.addEventListener('click', () => {
    //        event.preventDefault()
    //        newMonster()
    //    })
       form.append(createInput('name'), createInput('age'), createInput('description'), btn)
       formContainer.append(form)
    }

   document.addEventListener('click', () => {
        const createBtn = document.querySelector('button#create-monster')
        const forwardBtn = document.querySelector('button#forward')
        const backBtn = document.querySelector('button#back')
        
        if (event.target == createBtn){
           event.preventDefault()
           newMonster()
           console.log("create")
       }
       else if (event.target == forwardBtn){
           if (monsterContainer.children.length < num){
               window.alert("Aint no monsters here")
           }
           else {
               page = page + 1
               monsterContainer.innerHTML = ''  // while (monsterContainer.children[0]){monsterContainer.removeChild(monsterContainer.children[0])}
               fetchMonsters(num, page)
           }
           
       }
       else if (event.target == backBtn){
           if (page > 1){
               page = page - 1
               monsterContainer.innerHTML = ''
               fetchMonsters(num, page)
           }
           else {
               window.alert("This is the first page!")
           } 
       }
   })

    const monsterForm = document.querySelector('form#monster-form')
    function newMonster(){
        const configObj = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: monsterForm.children[0].value,
                age: monsterForm.children[1].value,
                description: monsterForm.children[2].value
            })
        }
        fetch(url, configObj)
        .then(res => res.json())
        .then(data => addMonster(data))

        monsterForm.reset() 
    }   
})