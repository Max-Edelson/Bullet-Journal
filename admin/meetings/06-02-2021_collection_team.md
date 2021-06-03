Date: 05-02-2021 <br>
Type of meeting: Weekly Collection Meeting <br>
Team number: 16 <br>
Meeting location: Zoom <br>
Time began: 3:30 PM <br> 
When the meeting finished: 5:00 PM

### Who is in attendance:
- Sophia Klueter
- Javier Galvan
- Carmen Li

## Notes from discussion:
# Documentation/standardization for data organization:
```
const data = {
  main    // actual entry object (includes title, text inside)
  date    // string of default date, unless you choose different date for an event/task
  time    // time attribute for events and tasks specifically 
  addToCustom // boolean value
  addToFuture // boolean value 
  futureMonth // string of month it is in
  customName  // name of custom title if addToCustom is true 
``` 

**Events:**
- display title, optional text 
- select date and time 

**Tasks:**
- display text, no title
- select date and time
- all day option

**Notes:**
- display text, no title

## To do:
- Fix display of data on entry items 
- Have everyone else use LocalStorage.js to manipulate data with the create, edit, and delete functions (?) 
