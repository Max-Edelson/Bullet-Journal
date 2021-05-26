import {Item, Event, Task, Note} from '../collection/Item.js';
import LocalStorage from './LS-demo/LocalStorage.js';

let storage = new LocalStorage();
let entries = storage.entries; // get list of entries 
let custom = storage.custom; // get list of entries 

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

let editButton = document.querySelector('#edit-btn');
let deleteButton = document.querySelector('#dlt-btn');

let customButton = document.querySelector('#customButton');
let customLogSelect = document.querySelector('.customLogs');
let customDataList = document.querySelector('#customOptions');

let monthlyDes = document.querySelector('#MonthlyDes');
let customDes = document.querySelector('#CustomDes');

let currMainItem = "note";
let currSubItem = "note";

let addToCustom = false;

let date = new Date();

// add entries in storage to the webpage
entries.forEach((data) => {
    createEntryFromData(data);
});

custom.forEach((data) => {
    createEntryFromData(data);
});

// edit button
// editButton.addEventListener('click', () => {
//     storage.update(data);
// });

// //delete button
// deleteButton.addEventListener('click', () => {
//     storage.update(data);
// });

form.addEventListener('submit', (e) => {
    e.preventDefault();

    // create main item for new entry
    let mainItem;
    if (currMainItem == "note"){
        mainItem = new Note(note.value, '');
    }
    else if (currMainItem == "event"){
        mainItem = new Event(note.value, '', eventTitle.value, eventDate.value);
    }
    else{
        mainItem = new Task(note.value, '', taskDeadline.value);
    }
    
    //create new entry element
    let newEntry = document.createElement('journal-entry');
    newEntry.setAttribute('dateMade', date.toDateString());
    newEntry.setAttribute('timeMade', date.toTimeString());
    newEntry.setAttribute('dateSet', eventDate.value);
    newEntry.setAttribute('inCustom', addToCustom);
    newEntry.mainItem = mainItem;
    
    // if add subitem was selected, add sub item attribute to new entry
    let subItem;
    if(subSection.hidden == false){
        
        if (currSubItem == "note"){
            subItem = new Note(subnote.value, '');
        }
        else if (currSubItem == "event"){
            subItem = new Event(subnote.value, '', subeventTitle.value, subeventDate.value);
        }
        else{
            subItem = new Task(subnote.value, '', subtaskDeadline.value);
        }
        
        newEntry.subItem = subItem;
    }

    const data = {
        main: mainItem,
        sub: subItem,
        date: newEntry.getAttribute('dateMade'),
        time: newEntry.getAttribute('timeMade'),
        dateSet: newEntry.getAttribute('dateSet'),
        addToCustom: newEntry.getAttribute('inCustom')
    };

    storage.create(data);

    // add new entry to the webpage
    let main = document.querySelector('main');
    main.appendChild(newEntry);

    // change page to default state
    subButton.hidden = false;
    subSection.hidden = true;
    currMainItem = "note";
    currSubItem = "note";
    //customLogSelect.hidden = true;
    setElementsHidden('event-specific', true);
    setElementsHidden('task-specific', true);
    setElementsHidden('subevent-specific', true);
    setElementsHidden('subtask-specific', true);
});

subButton.addEventListener('click', () => {
    subSection.hidden = false;
    subButton.hidden = true;
});

eventButton.addEventListener('click', () => {
    addToMonthly(true);
    currMainItem = "event";
    setElementsHidden('event-specific', false);
    setElementsHidden('task-specific', true);
})

taskButton.addEventListener('click', () => {
    addToMonthly(true);
    currMainItem = "task";
    setElementsHidden('event-specific', true);
    setElementsHidden('task-specific', false);
})

noteButton.addEventListener('click', () => {
    addToMonthly(true);
    currMainItem = "note";
    noteButton.hidden = false;
    setElementsHidden('event-specific', true);
    setElementsHidden('task-specific', true);
})

subeventButton.addEventListener('click', () => {
    addToMonthly(true);
    currSubItem = "event";
    setElementsHidden('subevent-specific', false);
    setElementsHidden('subtask-specific', true);
})

subtaskButton.addEventListener('click', () => {
    addToMonthly(true);
    currSubItem = "task";
    setElementsHidden('subevent-specific', true);
    setElementsHidden('subtask-specific', false);
})

subnoteButton.addEventListener('click', () => {
    addToMonthly(true);
    currSubItem = "note";
    noteButton.hidden = false;
    setElementsHidden('subevent-specific', true);
    setElementsHidden('subtask-specific', true);
})

customButton.addEventListener('click', () => {
    if (customButton.checked == true) {
        addToMonthly(false);
    }
    if (customButton.checked == false) {
        addToMonthly(true);
    }
    currSubItem = "note";
    currMainItem = "note";
    setElementsHidden('event-specific', true);
    setElementsHidden('task-specific', true);
    setElementsHidden('subevent-specific', true);
    setElementsHidden('subtask-specific', true);
});

function setElementsHidden(className, newHiddenVal){
    let eventElements = document.getElementsByClassName(className);
    let eventElement;
    for(eventElement of eventElements){
        eventElement.hidden = newHiddenVal;
    }
};

function addToMonthly(newBool){
    monthlyDes.hidden = !newBool;
    customDes.hidden = newBool;
   // customLogSelect.hidden = newBool;
    addToCustom = !newBool;
}

function createEntryFromData(data){
    let newEntry = document.createElement('journal-entry');
    newEntry.setAttribute('dateMade', data.date);
    newEntry.setAttribute('timeMade', data.time);
    newEntry.setAttribute('inCustom', data.addToCustom);
    newEntry.mainItem = data.main;
    if(data.sub != undefined){
        newEntry.subItem = data.sub;
    }  

    // add new entry to the webpage
    let main = document.querySelector('main');
    main.appendChild(newEntry);
}