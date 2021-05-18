import {Item, Event, Task, Note} from '../collection/Item.js';

let form = document.querySelector('#entry-form');
let note = document.querySelector('#entry-content');
let subnote = document.querySelector('#subentry-content');
let subButton = document.querySelector("#subButton");
let subLabel = document.querySelector('#sublabel');
let subBreak = document.querySelector('#sub-break');
let subSection = document.querySelector('#sub-section');

let eventTitle = document.querySelector('#entry-title');
let eventDate = document.querySelector('#entry-date');
let subeventTitle = document.querySelector('#subentry-title');
let subeventDate = document.querySelector('#subentry-date');

let taskDeadline = document.querySelector('#deadline');
let subtaskDeadline = document.querySelector('#subdeadline');

let eventButton = document.querySelector('button.event');
let taskButton = document.querySelector('button.task');
let noteButton = document.querySelector('button.note');
let subeventButton = document.querySelector('button.subevent');
let subtaskButton = document.querySelector('button.subtask');
let subnoteButton = document.querySelector('button.subnote');

let currMainItem = "note";
let currSubItem = "note";

form.addEventListener('submit', (e) => {
    e.preventDefault();

    // console.log("Form Submitted");

    let mainItem;
    if(currMainItem == "note"){
        mainItem = new Note(note.value, '');
    }
    else if (currMainItem == "event"){
        mainItem = new Event(note.value, '', eventTitle.value, eventDate.value);
    }
    else{
        mainItem = new Task(note.value, '', taskDeadline.value);
    }
    
    let newEntry = document.createElement('journal-entry');
    newEntry.mainItem = mainItem;
    //console.log(mainItem);

    if(subSection.hidden == false){
        let subItem;
        if(currSubItem == "note"){
            subItem = new Note(subnote.value, '');
        }
        else if (currSubItem == "event"){
            subItem = new Event(subnote.value, '', subeventTitle.value, subeventDate.value);
        }
        else{
            subItem = new Task(subnote.value, '', subtaskDeadline.value);
        }
        
        
        newEntry.subItem = subItem;
        // console.log(subItem);
    }

    
    // console.log(newEntry);
    let main = document.querySelector('main');
    main.appendChild(newEntry);

    subButton.hidden = false;
    subSection.hidden = true;
    currMainItem = "note";
    currSubItem = "note";
    setElementsHidden('event-specific', true);
    setElementsHidden('task-specific', true);
    setElementsHidden('subevent-specific', true);
    setElementsHidden('subtask-specific', true);
});

subButton.addEventListener('click', (e) => {
    subSection.hidden = false;
    subButton.hidden = true;
});

eventButton.addEventListener('click', () => {
    currMainItem = "event";
    setElementsHidden('event-specific', false);
    setElementsHidden('task-specific', true);
})

taskButton.addEventListener('click', () => {
    currMainItem = "task";
    setElementsHidden('event-specific', true);
    setElementsHidden('task-specific', false);
})

noteButton.addEventListener('click', () => {
    currMainItem = "note";
    noteButton.hidden = false;
    setElementsHidden('event-specific', true);
    setElementsHidden('task-specific', true);
})

subeventButton.addEventListener('click', () => {
    currSubItem = "event";
    setElementsHidden('subevent-specific', false);
    setElementsHidden('subtask-specific', true);
})

subtaskButton.addEventListener('click', () => {
    currSubItem = "task";
    setElementsHidden('subevent-specific', true);
    setElementsHidden('subtask-specific', false);
})

subnoteButton.addEventListener('click', () => {
    currSubItem = "note";
    noteButton.hidden = false;
    setElementsHidden('subevent-specific', true);
    setElementsHidden('subtask-specific', true);
})

function setElementsHidden(className, newHiddenVal){
    let eventElements = document.getElementsByClassName(className);
    // console.log(eventElements);
    let eventElement;
    for(eventElement of eventElements){
        eventElement.hidden = newHiddenVal;
    }
}