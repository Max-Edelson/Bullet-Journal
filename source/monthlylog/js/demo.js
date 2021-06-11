import {Item, Event, Task, Note} from '../../collection/Item.js';
import {caleandar} from './caleandar.js';

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
