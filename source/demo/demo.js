var form = document.querySelector('#entry-form');
var title = document.querySelector('#entry-title');
var date = document.querySelector('#entry-date');
var note = document.querySelector('#entry-content');


form.addEventListener('submit', (e) => {
    e.preventDefault();

    let mainItem = new Item('', note.textContent, '');
    let newEntry = document.createElement('journal-entry');
    newEntry.mainItem = mainItem;

    let main = document.querySelector('main');
    main.appendChild(newEntry);
})