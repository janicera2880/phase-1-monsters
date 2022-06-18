//First Declare Global Variable
let page = 1;
//Build Dom Interface Variable
const createMonster = document.getElementById('create-monster');
const form = document.querySelector('form');
const monsterContainer = document.getElementById('monster-container');
const backButton = document.getElementById('back');
const forwardbutton = document.getElementById('forward');

//Add Event Listeners
form.addEventListener('submit', e => addMonster(e));
backButton.addEventListener("click", e => pageBack (e));
forwardbutton.addEventListener("click", e => pageForward (e));

//Display The First Set Of Monsters

printMonsters();
//Create function to advance a page
function pageForward() {
    page ++;
    printMonsters();
  }

  //Function to go back to a page

  function backButton() {
    page > 1 ? page -- : console.log('You are already on page 1');
    printMonsters();
  }
  //Function to fetch and then print monster list
  function printMonsters() {
    fetch(`http://localhost:3000/monsters/?_limit=50&_page=${page}`, {

    })
    .then(response => response.json())
    .then(json => publish(json));
  }
  //Function to loop through all monsters returned by search
  function publish(monsters) {
    monsterContainer.replaceChildren();
    for (monster of monsters) {
        appendMonsters(monster);
    }
  }
  //Funcrion to Add New Monster to the DOM
  function appendMonsters(object) {
    let newDiv = document.createElement('div');
    let newH2 = document.createElement('h2');
    newH2.textContent = object.name;
    let newH4 = document.createElement('h4');
    newH4.textContent = 'Age:' + object.age;
    let newP = document.createElement('p');
    newP.textContent = 'Bio:' + object.description;
    newDiv.appendChild(newH2);
    newDiv.appendChild(newH4);
    newP.appendChild(newP);
    monsterContainer.appendChild(newDiv);
  }
  // Function to submit user-provided monster to database
function addMonster(e) {
    e.preventDefault();
    const submitName = e.target.name.value;
    const submitAge = e.target.age.value;
    const submitDescription = e.target.description.value;
    fetch('http://localhost:3000/monsters', {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify({
        name: submitName,
        age: submitAge,
        description: submitDescription,
      }),
    })
    form.reset();
  } 