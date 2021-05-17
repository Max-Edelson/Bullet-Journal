import module from '../collection/Item';
// let itemModule = require('../source/collection/Item');
/* MyMathModule.sum(a, b);
MyMathModule.multiply(a, b);
MyMathModule.subtract(a, b); */

test('testing event object', () => {
    let event = new module.Event();
});


/*describe('testing event add date function', () => {
    test('testing what date formats are allowed on 2021-05-20', () => {
        const input = [];
        let d = new Date();
        d.setFullYear(2021, 20, 5);
        input.push(d);
        d.setFullYear(2021, 5, 20);
        input.push(d);
        d.setFullYear(2021, 5, 20);
        input.push(d);
        d.setFullYear(2021, 9, 9);
        input.push(d);

        let event = new Event('textHolder', 'media holder', 'testing event', '...');

        // Date should be in MM-DD-YYYY
        input.forEach(function(date) {
            event.addDate(date);
            expect(event.getDate()).toEqual(d.setFullYear(2021, 20, 5));
        });
    });
});*/