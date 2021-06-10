// import LocalStorage from '../../collection/LocalStorage.js';

// let storage = new LocalStorage(); // create new instance of local storage
// let entries = storage.entries; // get list of entries 

// add entries in storage to the webpage
// entries.forEach((data) => {
//     createEntryFromData(data);
// });

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
function togglePopup1(){
    document.getElementById("popup-1").classList.toggle("active");
}
function togglePopup2(){
    document.getElementById("popup-2").classList.toggle("active");
}
function togglePopup3(){
    document.getElementById("popup-3").classList.toggle("active");
}


// TASKS
let addBtn1 = document.querySelector('.addBtn1');
showEntries("task");
// showNotes();
addBtn1.addEventListener('click', function (e) {
    e.preventDefault();

    let addText = document.querySelector('#taskInput').value;
    let description1 = document.querySelector("#description1").value
    let date1 = document.querySelector("#date1").value

    let notes = localStorage.getItem('notes');
    if (notes == null) {
        notesObj = []
    }
    else {
        notesObj = JSON.parse(notes)
    }
    notesObj.push([addText,description1,date1]);
    localStorage.setItem('notes', JSON.stringify(notesObj))
    addText.value = '';
    description1.value = '';
    date1.value = '';
    console.log(notesObj);
    showEntries("task");
    // showNotes();
})


// EVENTS
let addBtn2 = document.querySelector('.addBtn2');
showEntries("event");
// showTodos();
addBtn2.addEventListener('click', function (e) {
    let addText2 = document.querySelector('#eventInput').value;
    let description2 = document.querySelector('#description2').value;
    let date2 = document.querySelector("#date2").value;
    let todos = localStorage.getItem('todos');
    if (todos == null) {
        todosObj = []
    }
    else {
        todosObj = JSON.parse(todos)
    }
    todosObj.push([addText2,description2,date2]);
    localStorage.setItem('todos', JSON.stringify(todosObj))
    addText2.value = '';
    description2.value = '';
    date2.value = '';
    console.log(todosObj);
    showEntries("event");
    // showTodos();
});


// NOTES
let addBtn3 = document.querySelector('.addBtn3');
showEntries("note");
// showNewtodo();
addBtn3.addEventListener('click', function (e) {
    let addText3 = document.querySelector('#noteInput').value;
    let description3 = document.querySelector('#description3').value;
    let newtodo = localStorage.getItem('newtodo');
    if (newtodo == null) {
        newtodoObj = []
    }
    else {
        newtodoObj = JSON.parse(newtodo)
    }
    newtodoObj.push([addText3,description3]);
    localStorage.setItem('newtodo', JSON.stringify(newtodoObj))
    addText3.value = '';
    description3.value = '';
    console.log(newtodoObj);
    showEntries("note");
    // showNewtodo();
})


// SHOW ENTRIES IN RESPECTIVE SECTION
function showEntries(mode) {
    let entries;
    let listType, itemType;

    // show tasks
    if (mode == "task") {
        entries = localStorage.getItem('notes');
        entryObj = JSON.parse(entries) || []; 
        listType = 'taskLi';
        itemType = 'taskUl';
    }
    // show events
    if (mode == "event") {
        entries = localStorage.getItem('todos');
        entryObj = JSON.parse(entries) || []; 
        listType = 'eventLi';
        itemType = 'eventUl';
    }
    // show tasks
    if (mode == "note") {
        entries = localStorage.getItem('newtodo');
        entryObj = JSON.parse(entries) || []; 
        listType = 'noteLi';
        itemType = 'noteUl';
    }

    // entry template
    let html = '';
    entryObj.forEach(function(element, index) {
        html +=
            `<li class=${listType}>
            <div class="liMainWrap">
            <h3>${element[0]}</h3>
            <p>${element[1]}</p>
            <ul class="mouseover">
            <li>
            <span class="ellips"><i class="fas fa-ellipsis-h"></i></span>
            <ul>
            <div class="deleteOption optionSelect" id='${index}' onclick='deleteEntry("${mode}", this.id)''><span style="padding:0 !important">delete</span><i class="fas fa-trash"></i></div>
            <div class="editOption optionSelect" id="editBtn" onclick='editEntry("${mode}")'><span style="padding:0 !important">edit</span><i class="fas fa-pen"></i></div>
            </ul>
            </li>
            </ul>
            </div>
            </li>`;
    });
    let listElement = document.getElementById(itemType);
    if (mode == "task") {
        listElement.innerHTML = html + `<li onclick="togglePopup1()" style="list-style: none;"><span><i class="fas fa-plus" style="margin-right: 10px;"></i>New Item</span></li>`;
    }
    if (mode == "event") {
        listElement.innerHTML = html + `<li onclick="togglePopup2()" style="list-style: none;"><span><i class="fas fa-plus" style="margin-right: 10px;"></i>New Item</span></li>`;
    }
    if (mode == "note") {
        listElement.innerHTML = html + `<li onclick="togglePopup3()" style="list-style: none;"><span><i class="fas fa-plus" style="margin-right: 10px;"></i>New Item</span></li>`;
    }
}


// DELETE POPUP 
function deleteEntry(mode, index){
    Confirm.open({
        title: `<i class="fas fa-info-circle"></i>`,
        message: `<h3>Are you sure you want to delete this entry?</h3><p>You can't undo this action</p>`,
        onok: () => {
            console.log('this is del', index);
            let entries;

            // delete task
            if (mode == 'task') {
                console.log('task deleted', index);
                entries = localStorage.getItem('notes');
                entryObj = JSON.parse(entries) || []; 
                entryObj.splice(index, 1);
                localStorage.setItem('notes', JSON.stringify(entryObj));
                showEntries(mode);
                // showNotes();
            }

            // delete event
            if (mode == "event") {
                entries = localStorage.getItem('todos');
                entryObj = JSON.parse(entries) || []; 
                entryObj.splice(index, 1);
                localStorage.setItem('todos', JSON.stringify(entryObj));
                showEntries(mode);
                // showTodos();
            }

            // delete note
            if (mode == "note") {
                entries = localStorage.getItem('newtodo');
                entryObj = JSON.parse(entries) || []; 
                entryObj.splice(index, 1);
                localStorage.setItem('newtodo', JSON.stringify(entryObj));
                showEntries(mode);
                // showNewtodo();
            }
        }
    });
}

// DECIDE WHICH POPUP TO ACTIVATE FOR EDIT BUTTON
function editEntry(mode) {
    if (mode == 'task') {
        togglePopup1();
    }
    if (mode == 'event') {
        togglePopup2();
    }
    if (mode == 'note') {
        togglePopup3();
    }
}


const dateMeta = document.getElementById("date");
const today = new Date();
// const options = {weekday : "long", month:"short", day:"numeric"};
dateMeta.innerHTML = today.toLocaleDateString("en-US")