import {Item, Event, Task, Note} from '../../collection/Item.js';
import {caleandar} from './caleandar.js';
import LocalStorage from '../../collection/LocalStorage.js';

// example note to insert
let mainItem = new Note('Remember to eat', '');
// example day 
let date = new Date(2021, 5, 24); 

//insert note into an entry
let newEntry = document.createElement('journal-entry');
newEntry.mainItem = mainItem;
newEntry.date = date;

/**
 * @function createCalendarEntry creates an object to insert into calendar based on context of entry
 * @param entry journal-entry element that holds the item 
 * @returns object that is used by caleandar.js to insert into the calendar
 */
let createCalendarEntry = function(entry){
  return {'Date': entry.date, 'Title': entry.main.text};
};

var events = [
  {'Date': new Date(2021, 5, 10), 'Title': 'Doctor appointment at 3:25pm.'}, createCalendarEntry(newEntry)
];


var settings = {};
var element = document.getElementById('caleandar');
caleandar(element, events, settings);

let storage = new LocalStorage(); 

$('#sidebar, #content').addClass('active');
$('#sidebarIcon').addClass('active');

$(document).ready(function () {
    $("#sidebar").mCustomScrollbar({
        theme: "minimal"
    });

    $(function(){
        $('#sidebar, #sidebarIcon').hover(function(){
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

