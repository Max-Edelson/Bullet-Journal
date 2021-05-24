import LocalStorage from '../demo/LS-demo/LocalStorage';

test('testing event object', () => {
    let event = new module.Event('textHolder', 'media holder', 'testing event', '...');
    event.addDate(new Date(2021, 20, 5));
    expect(event.date).toEqual(new Date(2021, 20, 5));
});

//export.module = c;assname;
// import { pushToHistory } from '../scripts/router.js'
// export const router = {};