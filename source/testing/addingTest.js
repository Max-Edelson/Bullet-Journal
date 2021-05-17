export class mathClass {
    constructor(a, b) {
        this.a = a;
        this.b = b;
    }

    add() {
        return a + b;
    }

    subtract() {
        return a - b;
    }
}

// module.exports.add = add;
// module.exports.subtract = subtract;
module.exports = { mathClass };