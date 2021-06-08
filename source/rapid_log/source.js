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
        html +=  `<li class="taskLi">${element} <div class="deleteOption" id='${index}' onclick='deleteNote(this.id)'><i class="fas fa-minus-circle"></i></div></li>`;
    });
    let notesElm = document.getElementById('taskUl');
    if(notesObj.length != 0){
        notesElm.innerHTML = html+`<li onclick="togglePopup1()" style="list-style: none;"><span><i class="fas fa-plus" style="margin-right: 10px;"></i>New Item</span></li>`;
    }
    else {
        notesElm.innerHTML = `<li onclick="togglePopup1()" style="list-style: none;"><span><i class="fas fa-plus" style="margin-right: 10px;"></i>New Item</span></li>`
    }
}
function deleteNote(index){
    console.log('this is del', index);
    let notes = localStorage.getItem('notes');
    if (notes == null) {
        notesObj = []
    }
    else {
        notesObj = JSON.parse(notes)
    }
    notesObj.splice(index, 1);
    localStorage.setItem('notes', JSON.stringify(notesObj));
    showNotes();
}




let addBtn2 = document.querySelector('.addBtn2');
showTodos();
addBtn2.addEventListener('click', function (e) {
    let addText2 = document.querySelector('#eventInput');
    let todos = localStorage.getItem('todos');
    if (todos == null) {
        todosObj = []
    }
    else {
        todosObj = JSON.parse(todos)
    }
    todosObj.push(addText2.value);
    localStorage.setItem('todos', JSON.stringify(todosObj))
    addText2.value = '';
    console.log(todosObj);
    showTodos();
})

function showTodos() {
    let todos = localStorage.getItem('todos');
    if (todos == null) {
        todosObj = []
    }
    else {
        todosObj = JSON.parse(todos)
    }
    let html2 = '';
    todosObj.forEach(function (element2, index) {
        html2 +=  `<li class="eventLi">${element2} <div class="deleteOption" id='${index}' onclick='deleteTodos(this.id)'><i class="fas fa-minus-circle"></i></div></li>`;
    });
    let todosElm = document.getElementById('eventUl');
    if(todosObj.length != 0){
        todosElm.innerHTML = html2+`<li onclick="togglePopup2()" style="list-style: none;"><span><i class="fas fa-plus" style="margin-right: 10px;"></i>New Item</span></li>`;
    }
    else {
        todosElm.innerHTML = `<li onclick="togglePopup2()" style="list-style: none;"><span><i class="fas fa-plus" style="margin-right: 10px;"></i>New Item</span></li>`
    }
}
function deleteTodos(index){
    console.log('this is del', index);
    let todos = localStorage.getItem('todos');
    if (todos == null) {
        todosObj = []
    }
    else {
        todosObj = JSON.parse(todos)
    }
    todosObj.splice(index, 1);
    localStorage.setItem('todos', JSON.stringify(todosObj));
    showTodos();
}





let addBtn3 = document.querySelector('.addBtn3');
showNewtodo();
addBtn3.addEventListener('click', function (e) {
    let addText3 = document.querySelector('#noteInput');
    let newtodo = localStorage.getItem('newtodo');
    if (newtodo == null) {
        newtodoObj = []
    }
    else {
        newtodoObj = JSON.parse(newtodo)
    }
    newtodoObj.push(addText3.value);
    localStorage.setItem('newtodo', JSON.stringify(newtodoObj))
    addText3.value = '';
    console.log(newtodoObj);
    showNewtodo();
})

function showNewtodo() {
    let newtodo = localStorage.getItem('newtodo');
    if (newtodo == null) {
        newtodoObj = []
    }
    else {
        newtodoObj = JSON.parse(newtodo)
    }
    let html3 = '';
    newtodoObj.forEach(function (element3, index) {
        html3 +=   `<li class="noteLi">${element3} <div class="deleteOption noteDelete" id='${index}' onclick='deleteNewtodo(this.id)'><i class="fas fa-minus-circle"></i></div></li>`;
    });
    let newtodoElm = document.getElementById('noteUl');
    if(newtodoObj.length != 0){
        newtodoElm.innerHTML = html3+`<li onclick="togglePopup3()" style="list-style: none;"><span><i class="fas fa-plus" style="margin-right: 10px;"></i>New Item</span></li>`;
    }
    else {
        newtodoElm.innerHTML = `<li onclick="togglePopup3()" style="list-style: none;"><span><i class="fas fa-plus" style="margin-right: 10px;"></i>New Item</span></li>`
    }
}
function deleteNewtodo(index){
    console.log('this is del', index);
    let newtodo = localStorage.getItem('newtodo');
    if (newtodo == null) {
        newtodoObj = []
    }
    else {
        newtodoObj = JSON.parse(newtodo)
    }
    newtodoObj.splice(index, 1);
    localStorage.setItem('newtodo', JSON.stringify(newtodoObj));
    showNewtodo();
}




const dateMeta = document.getElementById("date");
const today = new Date();
// const options = {weekday : "long", month:"short", day:"numeric"};
dateMeta.innerHTML = today.toLocaleDateString("en-US")





