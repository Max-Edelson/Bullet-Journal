
require('jest-localstorage-mock');
// require('../../source/demo/custom_element_demo')
import LocalStorage from './LocalStorage.js';
import {Item, Event, Task, Note} from '../../source/collection/Item';

describe('testing local storage with an event object not in custom log', () => {
    let storage1 = new LocalStorage();
    // New date object for 06-20-2021 at 5:30 PM with 0 seconds and milliseconds
    let event = new Event('Be there at 5:30PM or you\'re in deep doodoo', null,'Dinner at Grandmas', new Date('2021', '06', '20', '17', '30', '0', '0'));
    let task = new Task('Change crusty socks', null, new Date('2021', '03', '22', '17', '30', '0', '0'));
    let note = new Note('Kettle sea salt and vinegar chips are all I want for Christmas');

    const eventData = {
        main: event,
        // sub: subItem,
        date: event.date,
        time: event.date.time,
        addToCustom: false
    };
    const taskData = {
        main: task,
        sub: note,
        date: event.date,
        time: new Date().getTime(),
        addToCustom: false
    };
    
    /* test('Test 1: Make sure that the date is held properly from event constructor', () => {
        expect(event.hasDate()).toBe(true);
    }) */

    test('Test 1: Ensure the new local object is empty', () => {
        expect(storage1.entries.length).toBe(0);
        expect(storage1.custom.length).toBe(0);
    })

    test('Test 2: Add the event, task, and note to local storage', () => {
        storage1.create(eventData);
        storage1.create(taskData);
    }) 

    let storage2 = new LocalStorage();
    test('Test 3: Ensure the local data persists through the creation of new LocalStorage objects', () => {
        expect(storage2.entries.length).toBe(2);
        expect(storage2.custom.length).toBe(0);

        expect(storage2.entries[0]).toBe(eventData);
        expect(storage2.entries[1]).toBe(taskData);
    })

    test('Test 4: Update the event item', () => {
        eventData.date = new Date('2021', '03', '24', '17', '30', '0', '0');
        let storage3 = new LocalStorage();
        expect(storage3.entries[0].date).toBe(new Date('2021', '03', '24', '17', '30', '0', '0'));
    })

    test('Test 5: Delete the items', () => {
        storage1.delete(eventData);
        storage1.delete(taskData);

        let storage3 = new LocalStorage();
        expect(storage3.entries.length).toBe(0);
        expect(storage3.custom.length).toBe(0);
    })
});

// let event = new module.Event('textHolder', 'media holder', 'testing event', '...');
    // event.addDate(new Date(2021, 20, 5));
    // expect(event.date).toEqual(new Date(2021, 20, 5));
//export.module = c;assname;
// import { pushToHistory } from '../scripts/router.js'
// export const router = {};