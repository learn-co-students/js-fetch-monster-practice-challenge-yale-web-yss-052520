function load_monsters(start, end){

    fetch("http://localhost:3000/monsters")
    .then(res => res.json())
    .then(res => add_monsters(res, start, end))
}
function add_monsters(res, start, end){
    const monster_container = document.querySelector("#monster-container")
    const monster_count = res.length
    // debugger
    monster_container.innerHTML = ""
    if (start < 1) {
        end = end + 1 - start
        start = 1
    }
    if (end > monster_count) {
        start -= end - monster_count
        end = monster_count
    }
    // debugger
    current_number = start
    console.log(start, end, monster_count)
    for (let count = start; count <= end; count++){
        add_monster(res[count - 1], count)
    }
}


function add_monster(monster, count){
    const monster_container = document.querySelector("#monster-container")
    let p = document.createElement("p")
    p.innerText = `${count} - Name: ${monster.name}. Age: ${monster.age}.\nDescription: ${monster.description}`
    monster_container.append(p)
}

function create_form(){
    const create_monster = document.querySelector("#create-monster")
    create_monster.innerHTML = `
        <form id="monster-form">
            <input type="text" placeholder="name"> 
            <input type="number" placeholder="age">
            <input type="text" placeholder="description">
            <button id="monster-submit"> Create Monster </button>
        </form>
    `
    add_listener_to_form()
}

function add_listener_to_form(){
    const monster_form = document.querySelector("#monster-form")
    const create_button = document.querySelector("#monster-submit")
    create_button.addEventListener("click", function(){
        event.preventDefault()
        const form_data = {
            name: monster_form[0].value,
            age: monster_form[1].value,
            description: monster_form[2].value
        }

        const configObj = {
            method: "POST",
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify(form_data)
        }
        fetch("http://localhost:3000/monsters", configObj)
        .then(res => res.json())
        .then(monster_form.reset())

    })
}

function create_buttons(){
    const button_back = document.querySelector("#back")
    const button_forward = document.querySelector("#forward")
    button_back.addEventListener("click", function(){
        event.preventDefault()
        load_monsters(current_number - 50 ,current_number-1)
        
    })
    button_forward.addEventListener("click", function(){
        event.preventDefault()
        load_monsters(current_number+50,current_number+99)
        
    })
}

var current_number = 1

load_monsters(current_number,current_number+49)
create_form()
create_buttons()
