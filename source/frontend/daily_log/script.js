import {Item, Event, Task, Note} from '../../collection/Item.js';
import LocalStorage from '../../collection/LocalStorage.js';

// CURRENT DATE
let dateMeta = document.getElementById("date");
let today = new Date();
let dateString = today.toLocaleDateString("en-US");
// const options = {weekday : "long", month:"short", day:"numeric"};
dateMeta.innerHTML = dateString;


// last day and next day functionality
let lastDay = document.getElementById("lastDay");
let nextDay = document.getElementById("nextDay");

lastDay.onclick = function() {
    var yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);
    today = yesterday;
    dateString = today.toLocaleDateString("en-US");
    dateMeta.innerHTML = dateString;
    //var html = '';
    entries.forEach((data) => {
        showEntries(data); 
    }); 
}

nextDay.onclick = function() {
    var tmw = new Date(today);
    tmw.setDate(tmw.getDate() + 1);
    today = tmw;
    dateString = today.toLocaleDateString("en-US");
    dateMeta.innerHTML = dateString;
    // var html = '';
    entries.forEach((data) => {
        showEntries(data);
    });
    
}

let storage = new LocalStorage(); // create new instance of local storage
let entries = storage.entries; // get list of entries 

// POPUP TEMPLATE FOR DELETE
const Confirm = {
    open (options) {
        options = Object.assign({}, {
            title: '',
            message: '',
            okText: 'Confirm',
            cancelText: 'Cancel',
            onok: function () {},
            oncancel: function () {}
        }, options);
        
        const html = `
            <div class="confirm">
                <div class="confirm__window">
                    <div class="confirm__titlebar">
                        <span class="confirm__title">${options.title}</span>
                    </div>
                    <div class="confirm__content">${options.message}</div>
                    <div class="confirm__buttons">
                        <button class="confirm__button confirm__button--cancel">${options.cancelText}</button>
                        <button class="confirm__button confirm__button--ok confirm__button--fill">${options.okText}</button>
                    </div>
                </div>
            </div>
        `;

        const template = document.createElement('template');
        template.innerHTML = html;

        // Elements
        const confirmEl = template.content.querySelector('.confirm');
        const btnOk = template.content.querySelector('.confirm__button--ok');
        const btnCancel = template.content.querySelector('.confirm__button--cancel');

        confirmEl.addEventListener('click', e => {
            if (e.target === confirmEl) {
                options.oncancel();
                this._close(confirmEl);
            }
        });

        btnOk.addEventListener('click', () => {
            options.onok();
            this._close(confirmEl);
        });

        [btnCancel].forEach(el => {
            el.addEventListener('click', () => {
                options.oncancel();
                this._close(confirmEl);
            });
        });

        document.body.appendChild(template.content);
    },

    _close (confirmEl) {
        confirmEl.classList.add('confirm--close');

        confirmEl.addEventListener('animationend', () => {
            document.body.removeChild(confirmEl);
        });
    }
};


// TOGGLE POPUPS
// function togglePopup1(){
//     document.getElementById("popup-1").classList.toggle("active");
// }
// function togglePopup2(){
//     document.getElementById("popup-2").classList.toggle("active");
// }
// function togglePopup3(){
//     document.getElementById("popup-3").classList.toggle("active");
// }

let addTaskPopup = document.getElementById("popup-1");
let addEventPopup = document.getElementById("popup-2");
let addNotePopup = document.getElementById("popup-3");

let newTaskBtn = document.getElementById("newTask");
let newEventBtn = document.getElementById("newEvent");
let newNoteBtn = document.getElementById("newNote");

// open new task popup
newTaskBtn.onclick = function() {
    console.log('new task clicked');
    addTaskPopup.style.display = "block";
    addTaskPopup.classList.toggle("active");
}

// open new event popup
newEventBtn.onclick = function() {
    console.log('new event clicked');
    addEventPopup.style.display = "block";
    addEventPopup.classList.toggle("active");
}

// open new note popup
newNoteBtn.onclick = function() {
    console.log('new note clicked');
    addNotePopup.style.display = "block";
    addNotePopup.classList.toggle("active");
}

let popups = document.getElementsByClassName('popup1');

Array.from(popups).forEach((popup) => {
    let cancelBtn = popup.querySelector('.close-btn');

    cancelBtn.onclick = function() {
        // document.getElementById('description3').value='';
        // document.getElementById('subText').value='';
        // subSection.hidden = true;
        // subButton.hidden = false;
        console.log('cancel button clicked');
        popup.style.display = 'none';
        popup.classList.toggle("active");
    }
})

// TASKS
let saveTaskBtn = document.querySelector('.addBtn1');
// showEntries("task");
saveTaskBtn.addEventListener('click', function(e) {
    e.preventDefault();
    console.log('save task clicked');

    let taskTitle = document.querySelector('#taskInput').value;
    let taskDesc = document.querySelector("#description1").value;
    let taskDate = document.querySelector("#date1").value;
    // let deadlineTime = document.querySelector("timeInput1").value;

    // create main item with input values of text and deadline
    let mainItem = new Task(taskTitle, '', taskDate);

    // create new entry element
    let newEntry = document.createElement('journal-entry');
    newEntry.setAttribute('dateMade', dateString);
    newEntry.setAttribute('timeMade', "");
    newEntry.setAttribute('dateSet', dateString);
    newEntry.setAttribute('inCustom', false);
    newEntry.setAttribute('inFuture', false);
    newEntry.setAttribute('futureMonth', "");
    newEntry.setAttribute('startTime', "");
    newEntry.setAttribute('endTime', "");
    newEntry.setAttribute('taskTime', "");
    newEntry.setAttribute('customName', "");
    newEntry.mainItem = mainItem;
    
    // if add subitem was selected, add sub item attribute to new entry
    let subItem;
    // if(subSection.hidden === false){
    //     subItem = new Note(subnote.value, '');
    //     newEntry.subItem = subItem;
    // }

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
        taskTime: newEntry.getAttribute('taskTime'),
        customName: newEntry.getAttribute('customName')
    };

    storage.create(data);

    showEntries(data);

    // return to default state
    addTaskPopup.style.display = 'none';
    addTaskPopup.classList.toggle("active");

    document.querySelector('#taskInput').value = '';
    document.querySelector("#description1").value = '';
    document.querySelector("#date1").value = '';
});


// EVENTS
let saveEventBtn = document.querySelector('.addBtn2');
// showEntries("event");
saveEventBtn.addEventListener('click', function(e) {
    e.preventDefault();
    console.log('save event clicked');

    let eventTitle = document.querySelector('#eventInput').value;
    let eventDesc = document.querySelector('#description2').value;
    let eventDate = document.querySelector("#date2").value;

    // create main item with input values of text and deadline
    let mainItem = new Event('', '', eventTitle, eventDate);

    // create new entry element
    let newEntry = document.createElement('journal-entry');
    newEntry.setAttribute('dateMade', dateString);
    newEntry.setAttribute('timeMade', "");
    newEntry.setAttribute('dateSet', dateString);
    newEntry.setAttribute('inCustom', false);
    newEntry.setAttribute('inFuture', false);
    newEntry.setAttribute('futureMonth', "");
    newEntry.setAttribute('startTime', "");
    newEntry.setAttribute('endTime', "");
    newEntry.setAttribute('taskTime', "");
    newEntry.setAttribute('customName', "");
    newEntry.mainItem = mainItem;
    
    // if add subitem was selected, add sub item attribute to new entry
    let subItem;
    // if(subSection.hidden === false){
    //     subItem = new Note(subnote.value, '');
    //     newEntry.subItem = subItem;
    // }

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
        taskTime: newEntry.getAttribute('taskTime'),
        customName: newEntry.getAttribute('customName')
    };

    storage.create(data);

    showEntries(data);

    // return to default state
    addEventPopup.style.display = 'none';
    addEventPopup.classList.toggle("active");

    document.querySelector('#eventInput').value = '';
    document.querySelector("#description2").value = '';
    document.querySelector("#date2").value = '';
});


// NOTES
let saveNoteBtn = document.querySelector('.addBtn3');
// showEntries("note");
saveNoteBtn.addEventListener('click', function(e) {
    let noteTitle = document.querySelector('#noteInput').value;
    let noteDesc = document.querySelector('#description3').value;

    // create main item with input values of text and deadline
    let mainItem = new Note(noteTitle, '');

    // create new entry element
    let newEntry = document.createElement('journal-entry');
    newEntry.setAttribute('dateMade', dateString);
    newEntry.setAttribute('timeMade', "");
    newEntry.setAttribute('dateSet', dateString);
    newEntry.setAttribute('inCustom', false);
    newEntry.setAttribute('inFuture', false);
    newEntry.setAttribute('futureMonth', "");
    newEntry.setAttribute('startTime', "");
    newEntry.setAttribute('endTime', "");
    newEntry.setAttribute('taskTime', "");
    newEntry.setAttribute('customName', "");
    newEntry.mainItem = mainItem;
    
    // if add subitem was selected, add sub item attribute to new entry
    let subItem;
    // if(subSection.hidden === false){
    //     subItem = new Note(subnote.value, '');
    //     newEntry.subItem = subItem;
    // }

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
        taskTime: newEntry.getAttribute('taskTime'),
        customName: newEntry.getAttribute('customName')
    };

    storage.create(data);

    showEntries(data);

    // return to default state
    addNotePopup.style.display = 'none';
    addNotePopup.classList.toggle("active");

    document.querySelector('#noteInput').value = '';
    document.querySelector("#description3").value = '';
})

// entry template
var html = '';
// SHOW ENTRIES IN RESPECTIVE SECTION
function showEntries(data) {
    let listType, itemType, itemClass, titleType, entryTitle;
    console.log(data.token);

    // show tasks
    if (data.main.type === "task") {
        itemType = '.taskLi';
        listType = '.taskUl';
        itemClass = '#task';
        titleType = '.taskTitle';
        entryTitle = data.main.text;
    }
    // show events
    if (data.main.type === "event") {
        itemType = '.eventLi';
        listType = '.eventUl';
        itemClass = '#event';
        titleType = '.eventTitle';
        entryTitle = data.main.title;
    }
    // show notes
    if (data.main.type === "note") {
        itemType = '.noteLi';
        listType = '.noteUl';
        itemClass = '#note';
        titleType = '.noteTitle';
        entryTitle = data.main.text;
    }

    console.log(dateString);
    // if it belongs to the current date
    console.log(dateMeta.innerHTML);

    let container = document.querySelector(listType);
    // console.log(container);
    let template = document.querySelector(itemClass);
    // console.log(template);
    let clone = template.content.cloneNode(true);
    let task = clone.querySelector(itemType);
    let title = clone.querySelector(titleType);
    // console.log(title);

    // console.log(entryTitle);
    title.innerHTML = entryTitle;

    let deleteBtn = clone.querySelector('.deleteOption');
    let editBtn = clone.querySelector('.editOption');

    deleteBtn.addEventListener('click', () => {
        storage.delete(data);
        // deleteEntry(data);
        task.remove();
    });

    editBtn.addEventListener('click', () => {
        console.log('edit button');
        editEntry(data);
    })

    console.log(typeof data.dateSet);
    console.log(typeof dateString);
    if (data.dateSet === dateString) {
        // title.innerHTML = entryTitle;
        container.appendChild(clone);
    };
    
};

// DELETE POPUP 
function deleteEntry(data){
    Confirm.open({
        title: `<i class="fas fa-info-circle"></i>`,
        message: `<h3>Are you sure you want to delete this entry?</h3><p>You can't undo this action</p>`,
        onok: () => {
            console.log('this is del', data);

            storage.delete(data);
            // showEntries(data);
            
            // // delete task
            // if (mode == 'task') {
            //     console.log('task deleted', index);
            //     entries = localStorage.getItem('notes');
            //     entryObj = JSON.parse(entries) || []; 
            //     entryObj.splice(index, 1);
            //     localStorage.setItem('notes', JSON.stringify(entryObj));
            //     showEntries(mode);
            //     // showNotes();
            // }

            // // delete event
            // if (mode == "event") {
            //     entries = localStorage.getItem('todos');
            //     entryObj = JSON.parse(entries) || []; 
            //     entryObj.splice(index, 1);
            //     localStorage.setItem('todos', JSON.stringify(entryObj));
            //     showEntries(mode);
            //     // showTodos();
            // }

            // // delete note
            // if (mode == "note") {
            //     entries = localStorage.getItem('newtodo');
            //     entryObj = JSON.parse(entries) || []; 
            //     entryObj.splice(index, 1);
            //     localStorage.setItem('newtodo', JSON.stringify(entryObj));
            //     showEntries(mode);
            //     // showNewtodo();
            // }
        }
    });
}

// let editTaskPopup = document.getElementById("popup-4");
// let editEventPopup = document.getElementById("popup-5");
// let editNotePopup = document.getElementById("popup-6");
// console.log(editTaskPopup);

// // DECIDE WHICH POPUP TO ACTIVATE FOR EDIT BUTTON
// function editEntry(data) {
//     if (data.main.type == 'task') {
//         editTaskPopup.classList.toggle("active");
//         editTaskPopup.style.display = "block";
//         editTaskPopup.getElementsByClassName("date")[0].value = data.main.deadline;
//         editTaskPopup.getElementsByClassName('description')[0].value = data.main.text;


//     }
//     if (data.main.type == 'event') {
//         editEventPopup.classList.toggle("active");
//         editEventPopup.style.display = "block";
//         editEventPopup.getElementsByClassName("mainInput")[0].value = data.main.title;
//         editEventPopup.getElementsByClassName("date")[0].value = data.main.date;
//         editEventPopup.getElementsByClassName('description')[0].value = data.main.text;
//     }
//     if (data.main.type == 'note') {
//         editNotePopup.classList.toggle("active");
//         editNotePopup.style.display = "block";
//         editNotePopup.getElementsByClassName('description')[0].value = data.main.text;
//     }
// };

// let saveEditTaskBtn = document.querySelector('.addBtn4');
// let saveEditEventBtn = document.querySelector('.addBtn5');
// let saveEditNoteBtn = document.querySelector('.addBtn6');

// KEEP DISPLAYING THE ENTRIES
entries.forEach((data) => {
    showEntries(data);
});

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
    li.innerHTML = "<img src='create.png' alt='Create Icon'><button id='custom_add'>New Log</button>"
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
