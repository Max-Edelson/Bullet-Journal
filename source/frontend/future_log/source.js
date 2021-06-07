import {Item, Event, Task, Note} from '../../collection/Item.js';
import LocalStorage from '../../collection/LocalStorage.js';

//getting correct months to display
var d = new Date();
var month = new Array();
month[0] = "January";
month[1] = "February";
month[2] = "March";
month[3] = "April";
month[4] = "May";
month[5] = "June";
month[6] = "July";
month[7] = "August";
month[8] = "September";
month[9] = "October";
month[10] = "November";
month[11] = "December";
month[12] = "January"; //give more incase we start with Dec
month[13] = "February";
month[14] = "March";
month[15] = "April";
month[16] = "May";
var month1 = month[d.getMonth()];
var month2 = month[d.getMonth()+1];
var month3 = month[d.getMonth()+2];
var month4 = month[d.getMonth()+3];
var month5 = month[d.getMonth()+4];
var month6 = month[d.getMonth()+5];

// getting the innerHTML of the month headers
let monthNames = document.getElementsByClassName('month_header');
// update month headers to correct ones
for (var i = 0; i < monthNames.length; i++) {
    monthNames[i].innerHTML = month[d.getMonth()+i];
}

var currMonth = null;

// get where to add each entry (which month)
var addEntries = document.getElementsByClassName('add_entries');

/////////
//MODAL//
/////////
// Get the modal
var modal = document.getElementById("myModal");

// Get the button that opens the modal
var btn1 = document.getElementById("new_item1");
var btn2 = document.getElementById("new_item2");
var btn3 = document.getElementById("new_item3");
var btn4 = document.getElementById("new_item4");
var btn5 = document.getElementById("new_item5");
var btn6 = document.getElementById("new_item6");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks on the new item button, open the modal for input
btn1.onclick = function() {
    modal.style.display = "block";
    currMonth = monthNames[0].innerHTML;
}
btn2.onclick = function() {
    modal.style.display = "block";
    currMonth = monthNames[1].innerHTML;
}
btn3.onclick = function() {
    modal.style.display = "block";
    currMonth = monthNames[2].innerHTML;
}
btn4.onclick = function() {
    modal.style.display = "block";
    currMonth = monthNames[3].innerHTML;
}
btn5.onclick = function() {
    modal.style.display = "block";
    currMonth = monthNames[4].innerHTML;
}
btn6.onclick = function() {
    modal.style.display = "block";
    currMonth = monthNames[5].innerHTML;
}

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
    modal.style.display = "none";
    currMonth = null;
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}

//////////
// Form //
//////////

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
// let customLogSelect = document.querySelector('.customLogs');
// let customDataList = document.querySelector('#customOptions');

let monthlyDes = document.querySelector('#MonthlyDes');
let customDes = document.querySelector('#CustomDes');

let currMainItem = "note";
let currSubItem = "note";

// let addToCustom = false;

let date = new Date();

// add entries in storage to the webpage
entries.forEach((data) => {
    createEntryFromData(data);
});
/*

*/
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
    newEntry.setAttribute('inCustom', false);
    newEntry.setAttribute('inFuture', true);
    newEntry.setAttribute('futureMonth', currMonth);
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
        addToCustom: newEntry.getAttribute('inCustom'),
        addToFuture: newEntry.getAttribute('inFuture'),
        futureMonth: newEntry.getAttribute('futureMonth')
    };

    storage.create(data);

    // add new entry to the webpage
    for (var i = 0; i < monthNames.length; i++) {
        // if the month matches a month header
        if (data.futureMonth === monthNames[i].innerHTML) {
            // check if will exceed max 8 entries
            var count = $(addEntries[i]).children().length;
            if (count < 8) {
                // add new entry to the webpage
                addEntries[i].appendChild(newEntry);
            }
        }
    }

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
    //addToMonthly(true);
    currMainItem = "event";
    setElementsHidden('event-specific', false);
    setElementsHidden('task-specific', true);
})

taskButton.addEventListener('click', () => {
    //addToMonthly(true);
    currMainItem = "task";
    setElementsHidden('event-specific', true);
    setElementsHidden('task-specific', false);
})

noteButton.addEventListener('click', () => {
    //addToMonthly(true);
    currMainItem = "note";
    noteButton.hidden = false;
    setElementsHidden('event-specific', true);
    setElementsHidden('task-specific', true);
})

subeventButton.addEventListener('click', () => {
    //addToMonthly(true);
    currSubItem = "event";
    setElementsHidden('subevent-specific', false);
    setElementsHidden('subtask-specific', true);
})

subtaskButton.addEventListener('click', () => {
    //addToMonthly(true);
    currSubItem = "task";
    setElementsHidden('subevent-specific', true);
    setElementsHidden('subtask-specific', false);
})

subnoteButton.addEventListener('click', () => {
    //addToMonthly(true);
    currSubItem = "note";
    noteButton.hidden = false;
    setElementsHidden('subevent-specific', true);
    setElementsHidden('subtask-specific', true);
})

// customButton.addEventListener('click', () => {
//     if (customButton.checked == true) {
//         addToMonthly(false);
//     }
//     if (customButton.checked == false) {
//         addToMonthly(true);
//     }
//     currSubItem = "note";
//     currMainItem = "note";
//     setElementsHidden('event-specific', true);
//     setElementsHidden('task-specific', true);
//     setElementsHidden('subevent-specific', true);
//     setElementsHidden('subtask-specific', true);
// });

function setElementsHidden(className, newHiddenVal){
    let eventElements = document.getElementsByClassName(className);
    let eventElement;
    for(eventElement of eventElements){
        eventElement.hidden = newHiddenVal;
    }
};
/*
function addToMonthly(newBool){
    monthlyDes.hidden = !newBool;
    customDes.hidden = newBool;
   // customLogSelect.hidden = newBool;
    addToCustom = !newBool;
}
*/



function createEntryFromData(data){
    // if data is in the future log
    if (data.addToFuture === "true") {
        let newEntry = document.createElement('journal-entry');
        newEntry.setAttribute('dateMade', data.date);
        newEntry.setAttribute('timeMade', data.time);
        newEntry.setAttribute('dateSet', data.dateSet);
        newEntry.setAttribute('inCustom', data.addToCustom);
        newEntry.setAttribute('inFuture', data.addToFuture);
        newEntry.setAttribute('futureMonth', data.futureMonth);
        newEntry.mainItem = data.main;
        if (data.sub != undefined){
            newEntry.subItem = data.sub;
        }  
        for (var i = 0; i < monthNames.length; i++) {
            // if the month matches a month header
            if (data.futureMonth === monthNames[i].innerHTML) {
                var count = $(addEntries[i]).children().length;
                if (count < 8) {
                    // add new entry to the webpage
                    addEntries[i].appendChild(newEntry);
                }
            }
        }
        
    }
    

    // add new entry to the webpage
    // let main = document.querySelector('main');
    // main.appendChild(newEntry);
}


///////////////////////////
// Sidebar functionality //
///////////////////////////
$(document).ready(function () {
    $("#sidebar").mCustomScrollbar({
        theme: "minimal"
    });

    $(function(){
        $('#sidebar').hover(function(){
            $('#sidebar, #content').toggleClass('active');
            $('#sidebarIcon').toggleClass('active');
            $('.collapse.in').toggleClass('in');
            $('a[aria-expanded=true]').attr('aria-expanded', 'false');
        },function(){
            $('#sidebar, #content').toggleClass('active');
            $('#sidebarIcon').toggleClass('active');
            $('.collapse.in').toggleClass('in');
            $('a[aria-expanded=true]').attr('aria-expanded', 'false');
        }).trigger('mouseleave');
        
        $('#sidebarIcon').hover(function(){
            $('#sidebar, #content').toggleClass('active');
            $('#sidebarIcon').toggleClass('active');
            $('.collapse.in').toggleClass('in');
            $('a[aria-expanded=true]').attr('aria-expanded', 'false');
        });
    });
});