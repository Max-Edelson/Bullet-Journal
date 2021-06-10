import {Item, Event, Task, Note} from '../collection/Item.js';
import LocalStorage from '../collection/LocalStorage.js';

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
    
}

let cancelBtn = document.querySelector(".cancel_button");
// When the user clicks on cancel, close the modal
cancelBtn.onclick = function() {
    modal.style.display = "none";
    subButton.hidden = false;
    subSection.hidden = true;
    currMainItem = "note";
    currSubItem = "note";
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
let submitBtn = document.querySelector('#save_button');
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

let startTime = document.querySelector('#startTime');
let endTime = document.querySelector('#endTime');
let taskTime = document.querySelector('#taskDeadline');

let editButton = document.querySelector('#edit-btn');
let deleteButton = document.querySelector('#dlt-btn');

let customButton = document.querySelector('#customButton');


let monthlyDes = document.querySelector('#MonthlyDes');
let customDes = document.querySelector('#CustomDes');

let currMainItem = "note";
let currSubItem = "note";


let date = new Date();

// add entries in storage to the webpage
entries.forEach((data) => {
    createEntryFromData(data);
});

submitBtn.addEventListener("click", (e) => {
    e.preventDefault();
    form.submit();

    // create main item for new entry
    let mainItem;
    if (currMainItem == "note"){
        mainItem = new Note(note.value, '');
    }
    else if (currMainItem == "event"){
        mainItem = new Event(note.value, '', eventTitle.value, eventDate.value, startTime.value, endTime.value);
    }
    else{
        mainItem = new Task(note.value, '', taskDeadline.value, taskTime.value);
    }
    
    for (var i = 0; i < 12; i++) {
        if (month[i] === currMonth) {
            date.setMonth(i);
            break;
        }
    }
    //create new entry element
    let newEntry = document.createElement('journal-entry');
    newEntry.setAttribute('dateMade', date.toLocaleDateString("en-US"));
    newEntry.setAttribute('timeMade', date.toTimeString());
    newEntry.setAttribute('dateSet', eventDate.value);
    newEntry.setAttribute('inCustom', false);
    newEntry.setAttribute('inFuture', true);
    newEntry.setAttribute('futureMonth', currMonth);
    newEntry.setAttribute('startTime', startTime.value);
    newEntry.setAttribute('endTime', endTime.value);
    newEntry.setAttribute('taskTime', taskTime.value);
    newEntry.mainItem = mainItem;
    
    // if add subitem was selected, add sub item attribute to new entry
    let subItem;
    if(subSection.hidden == false){
        subItem = new Note(subnote.value, '');
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
        futureMonth: newEntry.getAttribute('futureMonth'),
        startTime: newEntry.getAttribute('startTime'),
        endTime: newEntry.getAttribute('endTime'),
        taskTime: newEntry.getAttribute('taskTime')
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
    setElementsHidden('event-specific', true);
    setElementsHidden('task-specific', true);
    setElementsHidden('subevent-specific', true);
    setElementsHidden('subtask-specific', true);
    modal.style.display = "none";
});

subButton.addEventListener('click', () => {
    subSection.hidden = false;
    subButton.hidden = true;
});

eventButton.addEventListener('click', () => {
    currMainItem = "event";
    setElementsHidden('event-specific', false);
    setElementsHidden('task-specific', true);
    document.querySelector('#create-name').innerHTML = "Create New Event";
})

taskButton.addEventListener('click', () => {
    currMainItem = "task";
    setElementsHidden('event-specific', true);
    setElementsHidden('task-specific', false);
    document.querySelector('#create-name').innerHTML = "Create New Task";
})

noteButton.addEventListener('click', () => {
    currMainItem = "note";
    noteButton.hidden = false;
    setElementsHidden('event-specific', true);
    setElementsHidden('task-specific', true);
    document.querySelector('#create-name').innerHTML = "Create New Note";
})


function setElementsHidden(className, newHiddenVal){
    let eventElements = document.getElementsByClassName(className);
    let eventElement;
    for(eventElement of eventElements){
        eventElement.hidden = newHiddenVal;
    }
};

/*
* Displays the data on page
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
        newEntry.setAttribute('startTime', startTime.value);
        newEntry.setAttribute('endTime', endTime.value);
        newEntry.setAttribute('taskTime', taskTime.value);
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
    

}


///////////////////////////
// Sidebar functionality //
///////////////////////////

$('#sidebar, #content').addClass('active');
$('#sidebarIcon').addClass('active');

$(document).ready(function () {
    $("#sidebar").mCustomScrollbar({
        theme: "minimal"
    });

    $(function(){
        $('#sidebar').hover(function(){
            $('#sidebar, #content').removeClass('active');
            $('#sidebarIcon').removeClass('active');
            $('.collapse.in').removeClass('in');
            $('a[aria-expanded=true]').attr('aria-expanded', 'false');
        },function(){
            $('#sidebar, #content').addClass('active');
            $('#sidebarIcon').addClass('active');
            $('.collapse.in').addClass('in');
            $('a[aria-expanded=true]').attr('aria-expanded', 'false');
        }).trigger('mouseleave');
        
        $('#sidebarIcon').hover(function(){
            $('#sidebar, #content').removeClass('active');
            $('#sidebarIcon').removeClass('active');
            $('.collapse.in').removeClass('in');
            $('a[aria-expanded=true]').attr('aria-expanded', 'false');
        },function(){
            $('#sidebar, #content').addClass('active');
            $('#sidebarIcon').addClass('active');
            $('.collapse.in').addClass('in');
            $('a[aria-expanded=true]').attr('aria-expanded', 'false');
        }).trigger('mouseleave');
    });
});
//Adds custom log names and URLs to sidebar
let cusNames = storage.cusNames;

function updateNavbarLogs(cusNames) {
    let navBar_Logs = document.getElementById("pageSubmenu");
    navBar_Logs.innerHTML = "";
    cusNames.forEach((log) => {
        let li = document.createElement("li");
        li.innerHTML = "<a href='../custom_log/index.html#" + log + "'>" + log + "</a>"
        navBar_Logs.appendChild(li);
    });

    let li = document.createElement("li");
    li.innerHTML = "<img src='../create.png' alt='Create Icon'><button id='custom_add'>New Log</button>"
    navBar_Logs.appendChild(li);
}

updateNavbarLogs(cusNames);


$(window).on('hashchange',function(){ 
    window.location.reload(true); 
});

let addCustom = document.getElementById("new-custom");
let addCustomButton = document.getElementById("custom_add");
let addCustomCancel = document.getElementById("custom_cancel");
let addCustomAccept = document.getElementById("custom_save");

addCustomButton.onclick = function(){
    addCustom.hidden = false;
}

addCustomCancel.onclick = function() {
    document.getElementById('custom_name').value='';
    addCustom.hidden = true;
}

addCustomAccept.onclick = function() {
    storage.createLog(document.getElementById('custom_name').value);
    addCustom.hidden = true;

    updateNavbarLogs(storage.cusNames);

    document.getElementById('custom_name').value='';
    addCustomButton = document.getElementById("custom_add");
    addCustomButton.onclick = function(){
        addCustom.hidden = false;
    }
}
