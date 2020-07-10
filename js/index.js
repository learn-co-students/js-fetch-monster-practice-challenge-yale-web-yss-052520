const url = "http://localhost:3000/monsters";
const limit = 50;
let page_num = 21;
let max_page;


document.addEventListener("DOMContentLoaded", () => {
    set_max_page();
    monster_container = qs("#monster-container");
    let forward_button = qs("#forward")
    let back_button = qs("#back")

    add_form(qs("#create-monster"))
    load_monsters();

    back_button.addEventListener("click", () => {
        if (page_num == 1){
            return;
        }
        monster_container.innerHTML = "";
        page_num = Math.max(1, page_num - 1);
        back_button.innerText = (page_num != 1) ? "<=" : ""
        load_monsters();
        forward_button.innerText = "=>"
    })

    forward_button.addEventListener("click", () => {
        if (page_num == max_page){
            return;
        }
        monster_container.innerHTML = "";
        page_num +=1;
        load_monsters();
        forward_button.innerText = (page_num != max_page) ? "=>" : ""
        back_button.innerText = "<="
    })


})

function set_max_page(){
    fetch(url)
    .then(resp => resp.json())
    .then(json => {max_page = Math.ceil(json.length / 50)});
}

function add_form(form_div_tag){
    let h2 = ce("h2");
    h2.innerText = "Create a Monster";

    let form = ce("form");
    form.id = "monster-form"

    let name = ce("input");
    name.type = "text";
    name.placeholder = "Monster Name";
    name.name = "name"

    let age = ce("input");
    age.type = "number";
    age.placeholder = "Monster's Age";
    age.name = "age"

    let desc = ce("input");
    desc.type = "text";
    desc.placeholder = "Description";
    desc.name = "bio"

    let btn = ce("input");
    btn.type = "submit";

    form.append(name, age, desc, btn);

    form_div_tag.append(h2, form);

    form.addEventListener("submit", () => {
        event.preventDefault();
        fetch(url, postObj(event))
        .then(resp => resp.json())
        .then(json => add_monster(json))
    })

}

function load_monsters(){
    let monsters = fetch(url+`?_limit=${limit}&_page=${page_num}`)
    .then(resp => resp.json())
    .then(json => add_to_DOM(json));
}

function add_to_DOM(monsters){
    for (const monster of monsters){
        add_monster(monster)
    }
}

function add_monster(monster){
    let div = ce("div");
    div.id = "monster";

    let h2 = ce("h2");
    h2.innerText = monster.name;

    let h3 = ce("h3");
    h3.innerText = `Age: ${monster.age}`;

    let h4 = ce("h4");
    h4.innerText = `Bio: ${monster.description}`;

    div.append(h2, h3, h4);
    monster_container.append(div);
}

function postObj(event){
    return {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
              name: event.target[0].value,
              age: event.target[1].value,
              description: event.target[2].value
            })
        }
}


function ce(item){
    return document.createElement(item);
}

function qs(item){
    return document.querySelector(item);
}
