function togglePopup1(){
    document.getElementById("popup-1").classList.toggle("active");
}
function togglePopup2(){
    document.getElementById("popup-2").classList.toggle("active");
}
function togglePopup3(){
    document.getElementById("popup-3").classList.toggle("active");
}

let addBtn1 = document.querySelector('.addBtn1');
showNotes();
addBtn1.addEventListener('click', function (e) {
    let addText = document.querySelector('#taskInput');
    let notes = localStorage.getItem('notes');
    if (notes == null) {
        notesObj = []
    }
    else {
        notesObj = JSON.parse(notes)
    }
    notesObj.push(addText.value);
    localStorage.setItem('notes', JSON.stringify(notesObj))
    addText.value = '';
    console.log(notesObj);
    showNotes();
})

function showNotes() {
    let notes = localStorage.getItem('notes');
    if (notes == null) {
        notesObj = []
    }
    else {
        notesObj = JSON.parse(notes)
    }
    let html = '';
    notesObj.forEach(function (element, index) {
        html += /*`<div class="card my-2 mx-2 noteCard" style="width: 18rem;">
                    <div class="card-body">
                        <h5 class="card-title">Note ${index + 1}</h5>
                        <p class="card-text">${element}</p>
                        <button id='${index}' onclick='deleteNote(this.id)' class="btn btn-primary">Delete note</button>
                    </div>
                </div>`;*/
                `<li class="taskLi">${element}</li>`;
    });
    let notesElm = document.getElementById('taskUl');
    if(notesObj.length != 0){
        notesElm.innerHTML = html+`<li onclick="togglePopup1()"><span><i class="fas fa-plus" style="margin-right: 10px;"></i>New Item</span></li>`;
    }
    else {
        notesElm.innerHTML = `<li onclick="togglePopup1()"><span><i class="fas fa-plus" style="margin-right: 10px;"></i>New Item</span></li>`
    }
}



let addBtn2 = document.querySelector('.addBtn2');
showNotes();
addBtn2.addEventListener('click', function (e) {
    let addText2 = document.querySelector('#eventInput');
    let notes2 = localStorage.getItem('notes2');
    if (notes2 == null) {
        notesObj2 = []
    }
    else {
        notesObj2 = JSON.parse(notes2)
    }
    notesObj2.push(addText2.value);
    localStorage.setItem('notes2', JSON.stringify(notesObj2))
    addText2.value = '';
    console.log(notesObj2);
    showNotes();
})

function showNotes() {
    let notes2 = localStorage.getItem('notes2');
    if (notes2 == null) {
        notesObj2 = []
    }
    else {
        notesObj2 = JSON.parse(notes2)
    }
    let html2 = '';
    notesObj2.forEach(function (element, index) {
        html2 += /*`<div class="card my-2 mx-2 noteCard" style="width: 18rem;">
                    <div class="card-body">
                        <h5 class="card-title">Note ${index + 1}</h5>
                        <p class="card-text">${element}</p>
                        <button id='${index}' onclick='deleteNote(this.id)' class="btn btn-primary">Delete note</button>
                    </div>
                </div>`;*/
                `<li class="eventLi">${element}</li>`;
    });
    let notesElm2 = document.getElementById('eventUl');
    if(notesObj2.length != 0){
        notesElm2.innerHTML = html2+`<li onclick="togglePopup1()"><span><i class="fas fa-plus" style="margin-right: 10px;"></i>New Item</span></li>`;
    }
    else {
        notesElm2.innerHTML = `<li onclick="togglePopup1()"><span><i class="fas fa-plus" style="margin-right: 10px;"></i>New Item</span></li>`
    }
}



