import {Item, Event, Task, Note} from '../../collection/Item.js';
import LocalStorage from '../../../source/collection/LocalStorage.js';

let storage = new LocalStorage();
let entries = storage.entries;

var Calendar = function(model, options, date){
  // Default Values
  this.Options = {
    Color: '',
    LinkColor: '',
    NavShow: true,
    NavVertical: false,
    NavLocation: '',
    DateTimeShow: true,
    DateTimeFormat: 'mmm, yyyy',
    DatetimeLocation: '',
    EventClick: '',
    EventTargetWholeDay: false,
    DisabledDays: [],
    ModelChange: model
  };
  // Overwriting default values
  for(var key in options){
    this.Options[key] = typeof options[key]=='string'?options[key].toLowerCase():options[key];
  }

  model?this.Model=model:this.Model={};
  this.Today = new Date();

  this.Selected = this.Today
  this.Today.Month = this.Today.getMonth();
  this.Today.Year = this.Today.getFullYear();
  if(date){this.Selected = date}
  this.Selected.Month = this.Selected.getMonth();
  this.Selected.Year = this.Selected.getFullYear();

  this.Selected.Days = new Date(this.Selected.Year, (this.Selected.Month + 1), 0).getDate();
  this.Selected.FirstDay = new Date(this.Selected.Year, (this.Selected.Month), 1).getDay();
  this.Selected.LastDay = new Date(this.Selected.Year, (this.Selected.Month + 1), 0).getDay();

  this.Prev = new Date(this.Selected.Year, (this.Selected.Month - 1), 1);
  if(this.Selected.Month==0){this.Prev = new Date(this.Selected.Year-1, 11, 1);}
  this.Prev.Days = new Date(this.Prev.getFullYear(), (this.Prev.getMonth() + 1), 0).getDate();
};

//day selected by user when a day is clicked
let inputDay;

function createCalendar(calendar, element, adjuster){
  if(typeof adjuster !== 'undefined'){
    var newDate = new Date(calendar.Selected.Year, calendar.Selected.Month + adjuster, 1);
    calendar = new Calendar(calendar.Model, calendar.Options, newDate);
    element.innerHTML = '';
  }else{
    for(var key in calendar.Options){
      typeof calendar.Options[key] != 'function' && typeof calendar.Options[key] != 'object' && calendar.Options[key]?element.className += " " + key + "-" + calendar.Options[key]:0;
    }
  }
  var months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

  function AddSidebar(){
    var sidebar = document.createElement('div');
    sidebar.className += 'cld-sidebar';

    var monthList = document.createElement('ul');
    monthList.className += 'cld-monthList';

    for(var i = 0; i < months.length - 3; i++){
      var x = document.createElement('li');
      x.className += 'cld-month';
      var n = i - (4 - calendar.Selected.Month);
      // Account for overflowing month values
      if(n<0){n+=12;}
      else if(n>11){n-=12;}
      // Add Appropriate Class
      if(i==0){
        x.className += ' cld-rwd cld-nav';
        x.addEventListener('click', function(){
          typeof calendar.Options.ModelChange == 'function'?calendar.Model = calendar.Options.ModelChange():calendar.Model = calendar.Options.ModelChange;
          createCalendar(calendar, element, -1);});
        x.innerHTML += '<svg height="15" width="15" viewBox="0 0 100 75" fill="rgba(255,255,255,0.5)"><polyline points="0,75 100,75 50,0"></polyline></svg>';
      }
      else if(i==months.length - 4){
        x.className += ' cld-fwd cld-nav';
        x.addEventListener('click', function(){
          typeof calendar.Options.ModelChange == 'function'?calendar.Model = calendar.Options.ModelChange():calendar.Model = calendar.Options.ModelChange;
          createCalendar(calendar, element, 1);} );
        x.innerHTML += '<svg height="15" width="15" viewBox="0 0 100 75" fill="rgba(255,255,255,0.5)"><polyline points="0,0 100,0 50,75"></polyline></svg>';
      }
      else{
        if(i < 4){x.className += ' cld-pre';}
        else if(i > 4){x.className += ' cld-post';}
        else{x.className += ' cld-curr';}

        //prevent losing var adj value (for whatever reason that is happening)
        (function () {
          var adj = (i-4);
          //x.addEventListener('click', function(){createCalendar(calendar, element, adj);console.log('kk', adj);} );
          x.addEventListener('click', function(){
            typeof calendar.Options.ModelChange == 'function'?calendar.Model = calendar.Options.ModelChange():calendar.Model = calendar.Options.ModelChange;
            createCalendar(calendar, element, adj);} );
          x.setAttribute('style', 'opacity:' + (1 - Math.abs(adj)/4));
          x.innerHTML += months[n].substr(0,3);
        }()); // immediate invocation

        if(n==0){
          var y = document.createElement('li');
          y.className += 'cld-year';
          if(i<5){
            y.innerHTML += calendar.Selected.Year;
          }else{
            y.innerHTML += calendar.Selected.Year + 1;
          }
          monthList.appendChild(y);
        }
      }
      monthList.appendChild(x);
    }
    sidebar.appendChild(monthList);
    if(calendar.Options.NavLocation){
      document.getElementById(calendar.Options.NavLocation).innerHTML = "";
      document.getElementById(calendar.Options.NavLocation).appendChild(sidebar);
    }
    else{element.appendChild(sidebar);}
  }

  var mainSection = document.createElement('div');
  mainSection.className += "cld-main";

  function AddDateTime(){
      var datetime = document.createElement('div');
      datetime.className += "cld-datetime";
      if(calendar.Options.NavShow && !calendar.Options.NavVertical){
        var rwd = document.createElement('div');
        rwd.className += " cld-rwd cld-nav";
        rwd.addEventListener('click', function(){createCalendar(calendar, element, -1);} );
        rwd.innerHTML = '<svg height="15" width="15" viewBox="0 0 75 100" fill="rgba(0,0,0,0.5)"><polyline points="0,50 75,0 75,100"></polyline></svg>';
        datetime.appendChild(rwd);
      }
      var today = document.createElement('div');
      today.className += ' today';
      today.innerHTML = months[calendar.Selected.Month] + ", " + calendar.Selected.Year;
      //+ ", " + calendar.Selected.Year
      datetime.appendChild(today);
      if(calendar.Options.NavShow && !calendar.Options.NavVertical){
        var fwd = document.createElement('div');
        fwd.className += " cld-fwd cld-nav";
        fwd.addEventListener('click', function(){createCalendar(calendar, element, 1);} );
        fwd.innerHTML = '<svg height="15" width="15" viewBox="0 0 75 100" fill="rgba(0,0,0,0.5)"><polyline points="0,0 75,50 0,100"></polyline></svg>';
        datetime.appendChild(fwd);
      }
      if(calendar.Options.DatetimeLocation){
        document.getElementById(calendar.Options.DatetimeLocation).innerHTML = "";
        document.getElementById(calendar.Options.DatetimeLocation).appendChild(datetime);
      }
      else{mainSection.appendChild(datetime);}
  }

  function AddLabels(){
    var labels = document.createElement('ul');
    labels.className = 'cld-labels';
    var labelsList = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    for(var i = 0; i < labelsList.length; i++){
      var label = document.createElement('li');
      label.className += "cld-label";
      label.innerHTML = labelsList[i];
      labels.appendChild(label);
    }
    mainSection.appendChild(labels);
  }

  function AddDays(){
    // Create Number Element
    function DayNumber(n){
      var number = document.createElement('p');
      number.className += "cld-number";
      number.innerHTML += n;
      return number;
    }
    var days = document.createElement('ul');
    days.className += "cld-days";
    
    // Previous Month's Days
    for(var i = 0; i < (calendar.Selected.FirstDay); i++){
      var day = document.createElement('li');
      day.className += "cld-day prevMonth";
      //Disabled Days
      var d = i%7;
      for(var q = 0; q < calendar.Options.DisabledDays.length; q++){
        if(d==calendar.Options.DisabledDays[q]){
          day.className += " disableDay";
        }
      }

      var number = DayNumber((calendar.Prev.Days - calendar.Selected.FirstDay) + (i+1));
      day.appendChild(number);

      days.appendChild(day);
    }
    // Current Month's Days
    for(var i = 0; i < calendar.Selected.Days; i++){
      var day = document.createElement('li');
      day.className += "cld-day currMonth";
      //Disabled Days
      var d = (i + calendar.Selected.FirstDay)%7;
      for(var q = 0; q < calendar.Options.DisabledDays.length; q++){
        if(d==calendar.Options.DisabledDays[q]){
          day.className += " disableDay";
        }
      }
      var number = DayNumber(i+1);
      // Check Date against Event Dates
      for(var n = 0; n < calendar.Model.length; n++){
        var evDate = calendar.Model[n].Date;
        var toDate = new Date(calendar.Selected.Year, calendar.Selected.Month + 1, (i+1));
        if(evDate.getTime() == toDate.getTime()){
          number.className += " eventday";
          var title = document.createElement('span');
          title.className += "cld-title";
          if(typeof calendar.Model[n].Link == 'function' || calendar.Options.EventClick){
            var a = document.createElement('a');
            a.setAttribute('href', '#');
            a.innerHTML += calendar.Model[n].Title;
            if(calendar.Options.EventClick){
              var z = calendar.Model[n].Link;
              if(typeof calendar.Model[n].Link != 'string'){
                  a.addEventListener('click', calendar.Options.EventClick.bind.apply(calendar.Options.EventClick, [null].concat(z)) );
                  if(calendar.Options.EventTargetWholeDay){
                    day.className += " clickable";
                    day.addEventListener('click', calendar.Options.EventClick.bind.apply(calendar.Options.EventClick, [null].concat(z)) );
                  }
              }else{
                a.addEventListener('click', calendar.Options.EventClick.bind(null, z) );
                if(calendar.Options.EventTargetWholeDay){
                  day.className += " clickable";
                  day.addEventListener('click', calendar.Options.EventClick.bind(null, z) );
                }
              }
            }else{
              a.addEventListener('click', calendar.Model[n].Link);
              if(calendar.Options.EventTargetWholeDay){
                day.className += " clickable";
                day.addEventListener('click', calendar.Model[n].Link);
              }
            }
            title.appendChild(a);
          }else{
            title.innerHTML += '<a href="' + calendar.Model[n].Link + '">' + calendar.Model[n].Title + '</a>';
          }
          number.appendChild(title);
        }
      }
      day.appendChild(number);
      // If Today..
      if((i+1) == calendar.Today.getDate() && calendar.Selected.Month == calendar.Today.Month && calendar.Selected.Year == calendar.Today.Year){
        day.className += " today";
      }
      days.appendChild(day);
    }
    // Next Month's Days
    // Always same amount of days in calander
    var extraDays = 13;
    if(days.children.length>35){extraDays = 6;}
    else if(days.children.length<29){extraDays = 20;}

    for(var i = 0; i < (extraDays - calendar.Selected.LastDay); i++){
      var day = document.createElement('li');
      day.className += "cld-day nextMonth";
      //Disabled Days
      var d = (i + calendar.Selected.LastDay + 1)%7;
      for(var q = 0; q < calendar.Options.DisabledDays.length; q++){
        if(d==calendar.Options.DisabledDays[q]){
          day.className += " disableDay";
        }
      }

      var number = DayNumber(i+1);
      day.appendChild(number);

      days.appendChild(day);
    }
    mainSection.appendChild(days);
  }
  if(calendar.Options.Color){
    mainSection.innerHTML += '<style>.cld-main{color:' + calendar.Options.Color + ';}</style>';
  }
  if(calendar.Options.LinkColor){
    mainSection.innerHTML += '<style>.cld-title a{color:' + calendar.Options.LinkColor + ';}</style>';
  }
  element.appendChild(mainSection);

  if(calendar.Options.NavShow && calendar.Options.NavVertical){
    AddSidebar();
  }
  if(calendar.Options.DateTimeShow){
    AddDateTime();
  }
  AddLabels();
  AddDays();
  showEntries(calendar);
}

document.querySelector('#note_button').addEventListener('click', () => {
  let popup = document.querySelector('.popup');
  popup.hidden = true;
  let notePopup = document.querySelector('#note_popup');
  notePopup.hidden = false;
});

document.querySelector('#event_button').addEventListener('click', () => {
  let popup = document.querySelector('.popup');
  popup.hidden = true;
  let eventPopup = document.querySelector('#event_popup');
  eventPopup.hidden = false;
});

document.querySelector('#task_button').addEventListener('click', () => {
  let popup = document.querySelector('.popup');
  popup.hidden = true;
  let taskPopup = document.querySelector('#task_popup');
  taskPopup.hidden = false;
});

let cancelButtonList = document.getElementsByClassName('cancel_button');
for(const cancelButton of cancelButtonList){
  cancelButton.addEventListener('click', () => {
    makePopupsDisappear();
  });
}

// SAVE INPUTS
document.querySelector('#save_event').addEventListener('click', () => {
  let titleInput = document.querySelector('#eventTitle').value;
  let dateInput = document.querySelector('#eventDate').value;
  let startTimeInput = document.querySelector('#eventStartTime').value;
  let endTimeInput = document.querySelector('#eventEndTime').value;
  let descriptionInput = document.querySelector('#eventDescription').value;
  
  let newDate = new Date(); 

  let newEvent = new Event(descriptionInput, '', titleInput, dateInput, startTimeInput, endTimeInput);
  let newEntry = document.createElement('journal-entry');
  newEntry.setAttribute('dateMade', newDate.toLocaleDateString("en-US"));
  newEntry.setAttribute('timeMade', '');
  newEntry.setAttribute('dateSet', eventDate.value);
  newEntry.setAttribute('inCustom', false);
  newEntry.setAttribute('inFuture', true);
  newEntry.setAttribute('futureMonth', '');
  newEntry.setAttribute('startTime', startTimeInput.value);
  newEntry.setAttribute('endTime', endTimeInput.value);
  newEntry.setAttribute('taskTime', '');

  //console.log(newDate.toLocaleDateString("en-US"));

  newEntry.mainItem = newEvent;
  // newEntry.date = inputDay;
  newEntry.date = newDate;
  let subItem = null;

  const data = {
    main: newEvent,
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

  let singleDay = newDate.getDate();
  //console.log(singleDay);
  let entry = document.createElement('span');
  entry.className += " cld-title";
  entry.innerHTML = `${data.main.title}<a>${data.main.text}</a>`

  let appendDays = document.querySelectorAll(".cld-day.currMonth");
  appendDays[singleDay-1].appendChild(entry);
  
  
    
  //events.push(createCalendarEntry(newEntry));
  //location.reload();
  //console.log(newDate);
  makePopupsDisappear();
});

document.querySelector('#save_note').addEventListener('click', () =>{
  let descriptionInput = document.querySelector('#noteDescription').value;

  let newDate = new Date();

  let newNote = new Note(descriptionInput, '');
  let newEntry = document.createElement('journal-entry');
  newEntry.setAttribute('dateMade', newDate.toLocaleDateString("en-US"));
  newEntry.setAttribute('timeMade', '');
  newEntry.setAttribute('dateSet', eventDate.value);
  newEntry.setAttribute('inCustom', false);
  newEntry.setAttribute('inFuture', true);
  newEntry.setAttribute('futureMonth', '');
  newEntry.setAttribute('startTime', '');
  newEntry.setAttribute('endTime', '');
  newEntry.setAttribute('taskTime', '');

  newEntry.mainItem = newNote;
  // newEntry.date = inputDay;
  newEntry.date = newDate;

  let subItem = null;

  const data = {
    main: newNote,
    sub: subItem,
    date: newEntry.getAttribute('dateMade'),
    time: newEntry.getAttribute('timeMade'),
    dateSet: newEntry.getAttribute('dateSet'),
    addToCustom: newEntry.getAttribute('inCustom'),
    addToFuture: newEntry.getAttribute('inFuture'),
    futureMonth: newEntry.getAttribute('futureMonth'),
    // startTime: newEntry.getAttribute('startTime'),
    // endTime: newEntry.getAttribute('endTime'),
    taskTime: newEntry.getAttribute('taskTime')
  };

  storage.create(data);

  let singleDay = newDate.getDate();
  //console.log(singleDay);
  let entry = document.createElement('span');
  entry.className += " cld-title";
  entry.innerHTML = `<a>${data.main.text}</a>`


  let appendDays = document.querySelectorAll(".cld-day.currMonth");
  appendDays[singleDay-1].appendChild(entry);

  //console.log(appendDays);

  //events.push(createCalendarEntry(newEntry));
  //console.log(events);

  makePopupsDisappear();
});

console.log(document.querySelector('#addEntry'));
  document.querySelector('#addEntry').addEventListener('click', () => {
    console.log("clicked");
    let popup = document.querySelector('.popup');
    popup.hidden = false;
  });

document.querySelector('#save_task').addEventListener('click', () =>{
  let deadlineInput = document.querySelector('#taskDeadline').value;
  let checkInput = document.querySelector('#taskCheck').value;
  let timeInput = document.querySelector('#taskTime').value;
  let descriptionInput = document.querySelector('#taskDescription').value;

  let newDate = new Date();

  let completed;
  if(checkInput = 'on'){
    completed = true;
  } else{
    completed = false;
  }
  let newTask = new Task(descriptionInput, '', deadlineInput, completed);
  let newEntry = document.createElement('journal-entry');
  newEntry.setAttribute('dateMade', newDate.toLocaleDateString("en-US"));
  newEntry.setAttribute('timeMade', '');
  newEntry.setAttribute('dateSet', eventDate.value);
  newEntry.setAttribute('inCustom', false);
  newEntry.setAttribute('inFuture', true);
  newEntry.setAttribute('futureMonth', '');
  newEntry.setAttribute('startTime', '');
  newEntry.setAttribute('endTime', '');
  newEntry.setAttribute('taskTime', '');

  newEntry.mainItem = newTask;
  // newEntry.date = inputDay;
  newEntry.date = newDate;

  let subItem = null;

  const data = {
    main: newTask,
    sub: subItem,
    date: newEntry.getAttribute('dateMade'),
    time: newEntry.getAttribute('timeMade'),
    dateSet: newEntry.getAttribute('dateSet'),
    addToCustom: newEntry.getAttribute('inCustom'),
    addToFuture: newEntry.getAttribute('inFuture'),
    futureMonth: newEntry.getAttribute('futureMonth'),
    // startTime: newEntry.getAttribute('startTime'),
    // endTime: newEntry.getAttribute('endTime'),
    taskTime: newEntry.getAttribute('taskTime')
  };

  storage.create(data);

  let singleDay = newDate.getDate();
  //console.log(singleDay);

  let entry = document.createElement('span');
  entry.className += " cld-title";
  entry.innerHTML = `<a>${data.main.text}</a>`

  let appendDays = document.querySelectorAll(".cld-day.currMonth");
  appendDays[singleDay-1].appendChild(entry);

  //events.push(createCalendarEntry(newEntry));

  makePopupsDisappear();
});

function caleandar(el, data, settings){
  var obj = new Calendar(data, settings);
  createCalendar(obj, el);
}

function makePopupsDisappear(){
  let popups = document.getElementsByClassName('popup');
    for(const popupItem of popups){
      popupItem.hidden = true;
    }
}

/**
 * @function showEntries goes through local storage and displays entries onto calendar
 */
let showEntries = function(calendar){
  entries.forEach((data) => {
  let entry = document.createElement('span');
  entry.className += " cld-title";
  entry.innerHTML = `<a>${data.main.text}</a>`
  let newDate = new Date(data.date);
  let singleDay = newDate.getDate();
  //console.log(newDate.getMonth());
  if(newDate.getMonth() == calendar.Selected.Month){
    let appendDays = document.querySelectorAll(".cld-day.currMonth");
  //console.log(appendDays)
  appendDays[singleDay-1].appendChild(entry);
  }
 });
}

/**
 * @function createCalendarEntry creates an object to insert into calendar based on context of entry
 * @param entry journal-entry element that holds the item 
 * @returns object that is used by caleandar.js to insert into the calendar
 */
let createCalendarEntry = function(entry){
  return {'Date': entry.date, 'Title': entry.main.text};
};

var events = [
  //{'Date': new Date(2021, 5, 10), 'Title': 'Doctor appointment at 3:25pm.'}, createCalendarEntry(newEntry)
];

var settings = {};
var element = document.getElementById('caleandar');
caleandar(element, events, settings);


let futureSteps = window.location.hash.substr(1);
console.log(futureSteps);
if (parseInt(futureSteps) != NaN) {
  for (let i = 0; i < parseInt(futureSteps); i++) {
    document.getElementsByClassName('cld-fwd')[0].click();
  }
}


export {caleandar};
