// document.getElementsByClassName('bulletedList').onclick = function() {
//     document.getElementsByClassName('textArea').append('')
// }
// function hideOtherLogs() {
//     var logs = document.querySelectorAll('.logs');
//     for (var i = 0; i < logs.length; i++) {
//         logs[i].style.display = 'none';
//     }
// }
// window.addEventListener('load', () =>{
//     hideOtherLogs();
//     document.getElementsByClassName('future')[0].style.display = 'block';
// });
// document.getElementById('custom_log').onclick = function() {
//     hideOtherLogs();
//     document.getElementsByClassName('custom')[0].style.display = 'block';
// }
// document.getElementById('future_log').onclick = function() {
//     hideOtherLogs();
//     document.getElementsByClassName('future')[0].style.display = 'block';
// }

// document.querySelector('input.juneSubmit').onclick = function() {
//     var tasks = document.getElementById('juneTasks');
//     var notes = document.getElementById('juneNotes');
//     var events = document.getElementById('juneEvents');
//     if (tasks.value != '') {
//         localStorage.setItem('juneTasks',tasks.value);
//         var myTasks = localStorage.getItem('juneTasks');
//         var h3 = document.createElement('h3');
//         h3.innerHTML = '✔️ ' + myTasks;
//         var div = document.createElement('div');
//         div.className = 'task';
//         div.appendChild(h3);
//         document.querySelector('div.monthJune').appendChild(div);
//     }
//     if (notes.value != '') {
//         localStorage.setItem('juneNotes', notes.value);
//         var myNotes = localStorage.getItem('juneNotes'); 
//         var h3 = document.createElement('h3');
//         h3.innerHTML = '〰️ ' + myNotes;
//         var div = document.createElement('div');
//         div.className = 'task';
//         div.appendChild(h3);
//         document.querySelector('div.monthJune').appendChild(div);
//     }
//     if (events.value != '') {
//         localStorage.setItem('juneEvents',events.value);
//         var myEvents = localStorage.getItem('juneEvents'); 
//         var h3 = document.createElement('h3');
//         h3.innerHTML = '🕭 ' + myEvents;
//         var div = document.createElement('div');
//         div.className = 'task';
//         div.appendChild(h3);
//         document.querySelector('div.monthJune').appendChild(div);
//     }
//     tasks.value = '';
//     notes.value = '';
//     events.value = '';
// }

document.querySelector('input.customSubmit').onclick = function() {
    var title = document.getElementById('customTitle');
    var content = document.getElementById('customLog');
    if (title.value != '') {
        // localStorage.setItem('customTitle',title.value);
        // localStorage.setItem('customContent',content.value);
        var h3 = document.createElement('h3');
        h3.innerHTML = title.value + ':';
        var p = document.createElement('p');
        p.innerHTML = content.value;
        // p.style.display = none;
        var div = document.createElement('div');
        div.className = 'task';
        div.appendChild(h3);
        div.appendChild(p);
        document.querySelector('.custom').appendChild(div);
    }
    title.value = '';
    content.value = '';
}
// document.getElementsByClassName('bulletedList').keyup(function(event){
// var keycode = (event.keyCode ? event.keyCode : event.which);
// if(keycode == '13')
// {
//     document.getElementsByClassName('bulletedList').value +='• ';
// }
// var txtval = document.getElementsByClassName('bulletedList').value;
// if(txtval.substr(txtval.length - 1) == '\n')
// {
//     document.getElementsByClassName('bulletedList').value = txtval.substring(0,txtval.length - 1);
//     }
// });