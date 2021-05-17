let itemModule = require('../source/collection/Item.js');
/* MyMathModule.sum(a, b);
MyMathModule.multiply(a, b);
MyMathModule.subtract(a, b); */

describe('testing event add date function', () => {
    test('testing what date formats are allowed on 2021-05-20', () => {
        const input = [];
        let d = new Date();
        d.setFullYear(2021, 20, 5);
        input.push(d);
        d.setFullYear(2021, 20, 05);
        input.push(d);
        d.setFullYear(2021, 5, 20);
        input.push(d);
        d.setFullYear(2021, 05, 20);
        input.push(d);
        d.setFullYear(2021, 09, 09);
        input.push(d);
        d.setFullYear(2021, 9, 9);
        input.push(d);

        let event = new itemModule.event('textHolder', 'media holder', 'testing event', '...');

        // Date should be in MM-DD-YYYY
        input.forEach(function(date) {
            event.addDate(date);
            expect(event.getDate()).toEqual(d.setFullYear(2021, 20, 05));
        });
    });
});
