import {Item, Event, Task, Note} from '../../../collection/Item.js';
import LocalStorage from '../../../collection/LocalStorage.js';

//get name of custom log
var cusTitle = document.querySelector(".logNavInfo h1").innerHTML;


/*
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
*/





let subSection = document.getElementById("sub-section");
let subButton = document.getElementById("subBtn");
let addBtn = document.getElementById('newitem');
let saveBtn = document.querySelector('.addBtn3');
let popup = document.getElementById("popup-3");
let cancelBtn = document.querySelector(".close-btn");
let note = document.querySelector('#description3');
let subnote = document.querySelector('#subText');

let storage = new LocalStorage(); 
let custom = storage.custom; // get list of custom entries



/*
* Open popup
*/
addBtn.onclick = function(){
    popup.style.display = "block";
    popup.classList.toggle("active");
    subSection.hidden = true;
    subButton.hidden = false;
}

/*
* Close popup
*/
// When the user clicks on cancel, close the modal
cancelBtn.onclick = function() {
    popup.style.display = "none";
    document.getElementById('description3').value='';
    document.getElementById('subText').value='';
    subSection.hidden = true;
    subButton.hidden = false;
}

/*
* Functionality for adding a subitem
*/
subButton.addEventListener('click', () => {
    subSection.hidden = false;
    subButton.hidden = true;
});

/*
* Functionality for submitting the entry
*/
saveBtn.addEventListener("click", (e) => {
    e.preventDefault();

    // create main item for new entry (note)
    let mainItem = new Note(note.value, '');
    
    
    //create new entry element
    let newEntry = document.createElement('journal-entry');
    newEntry.setAttribute('dateMade', "");
    newEntry.setAttribute('timeMade', "");
    newEntry.setAttribute('dateSet', "");
    newEntry.setAttribute('inCustom', true);
    newEntry.setAttribute('inFuture', false);
    newEntry.setAttribute('futureMonth', "");
    newEntry.setAttribute('startTime', "");
    newEntry.setAttribute('endTime', "");
    newEntry.setAttribute('taskTime', "");
    newEntry.setAttribute('customName', cusTitle);
    newEntry.mainItem = mainItem;
    
    // if add subitem was selected, add sub item attribute to new entry
    let subItem;
    if(subSection.hidden === false){
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
        taskTime: newEntry.getAttribute('taskTime'),
        customName: newEntry.getAttribute('customName')
    };

    storage.create(data);

    // add new entry to the webpage
    displayEntries(data);
    
    
    // change page to default state
    subButton.hidden = false;
    subSection.hidden = true;

    // change input boxes back to empty
    document.getElementById('description3').value='';
    document.getElementById('subText').value='';
});

/*
* Iterate through local storage to display the entries
*/
let htmlEntry = '';
function displayEntries(data) {
    // if it belongs to the curent custom log
    if (data.customName === cusTitle) {
        let noteText = data.main.text;
        let addEntries = document.querySelector('#noteUl');
        //if there is a subnote
        if (data.sub != undefined){
            let subNoteText = data.sub.text;
            htmlEntry +=   `<li class="noteLi">
                            <div class="liMainWrap">
                            <h3>•${noteText}</h3>
                            <p>-${subNoteText}</p>
                            <ul class="mouseover">
                            <li>
                            <span class="ellips"><i class="fas fa-ellipsis-h"></i></span>
                            <ul>
                            <div class="deleteOption optionSelect noteDelete" id='none' onclick='deleteNewtodo(this.id)'><span style="padding:0 !important">delete</span><i class="fas fa-trash"></i></div>
                            <div class="editOption optionSelect" id="editBtn"><span style="padding:0 !important">edit</span><i class="fas fa-pen"></i></div>
                            </ul>
                            </li>
                            </ul>
                            </div>
                            </li>`;
        }  
        //if there is no subnote
        else {
            htmlEntry +=   `<li class="noteLi">
                        <div class="liMainWrap">
                        <h3>•${noteText}</h3>
                        <ul class="mouseover">
                        <li>
                        <span class="ellips"><i class="fas fa-ellipsis-h"></i></span>
                        <ul>
                        <div class="deleteOption optionSelect noteDelete" id='none' onclick='deleteNewtodo(this.id)'><span style="padding:0 !important">delete</span><i class="fas fa-trash"></i></div>
                        <div class="editOption optionSelect" id="editBtn"><span style="padding:0 !important">edit</span><i class="fas fa-pen"></i></div>
                        </ul>
                        </li>
                        </ul>
                        </div>
                        </li>`;
        }
        
        addEntries.innerHTML = htmlEntry;
    }
}

/*
* Keep displaying the entries
*/
custom.forEach((data) => {
    displayEntries(data);
});

//storage.delete(data);

