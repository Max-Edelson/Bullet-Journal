//import Math from './addingTest';
const module = require('./addingTest');

/*test('testing adding fuction', () => {
    expect(module.add(1, 2)).toBe(3);
});

test('testing subtraction fuction', () => {
    expect(module.subtract(1, 2)).toBe(-1);
});*/

// jest.mock('./addingTest');

test('math class', () => {
    const math = new module.mathClass(1, 2);
    expect(math.a).toBe(1);
});