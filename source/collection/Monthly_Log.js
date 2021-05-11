/**
 * monthlyLog class that represents the collection of months.
 * Each month holds a month title, a number of days, and an array of those days. 
 */
class monthlyLog {
    /**
     * Creates an instance of the monthlyLog object
     * @param month title of the month
     * @param numberOfDays number of days in the month
     */
    constructor(month, numberOfDays) {
        this.month = month;
        this.numberOfDays = numberOfDays;
        this.days = [];
    }

    /**
     * getter method for month 
     * @returns month string 
     */
    get month() {
        return this.month;
    }

    /**
     * getter method for number of days 
     * @returns integer that stores number of days 
     */
    get numberOfDays() {
        return this.numberOfDays;
    }

    /**
     * creates an array of days 
     */
    addDays() {
        for (let i=1; i<=this.numberOfDays; i++) {
            this.days.push(i);
        }
    }

    /**
     * getter method for days
     * @returns array of days 
     */
    get days() {
        return this.days;
    }
}