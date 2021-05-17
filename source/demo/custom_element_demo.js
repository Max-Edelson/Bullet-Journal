import {Item, Event, Task, Note} from '../collection/Item.js';

let form = document.querySelector('#entry-form');
let note = document.querySelector('#entry-content');
let subnote = document.querySelector('#subentry-content');
let subButton = document.querySelector("[type='button']");
let subLabel = document.querySelector('#sublabel');
let subBreak = document.querySelector('#sub-break');


form.addEventListener('submit', (e) => {
    e.preventDefault();

    console.log("Form Submitted");
    let mainItem = new Note(note.value, '');
    let newEntry = document.createElement('journal-entry');
    newEntry.mainItem = mainItem;
    console.log(mainItem);

    if(subnote.hidden == false){
        let subItem = new Note(subnote.value, '');
        newEntry.subItem = subItem;
        console.log(subItem);
    }

    
    console.log(newEntry);
    let main = document.querySelector('main');
    main.appendChild(newEntry);

    subButton.hidden = false;
    subnote.hidden = true;
    subLabel.hidden = true;
    subBreak.hidden = true;
});

subButton.addEventListener('click', (e) => {
    subButton.hidden = true;
    subnote.hidden = false;
    subLabel.hidden = false;
    subBreak.hidden = false;
});