export default class LocalStorage {
    constructor() {
        // if item by key of array is not defined, empty array
        this.entries = JSON.parse(localStorage.getItem('entries')) || [];
        this.custom = JSON.parse(localStorage.getItem('custom')) || [];
    }
  
    // create task
    create(data) {
        data.token = this.token;
        this.entries.push(data);
        localStorage.setItem('entries', JSON.stringify(this.entries));
    }
  
    // update/edit task
    update(data) {
        let index = this.getIndexByToken(data.token);
    
        if (index !== -1) {
            this.entries[index] = data;
            localStorage.setItem('entries', JSON.stringify(this.entries));
        }
    }
  
    // delete task
    delete(data) {
        let index = this.getIndexByToken(data.token);
    
        console.log(data.token);
        console.log(this.entries);

        // if index is found, delete it from this.tasks and rewrite localStorage item
        if (index !== -1) {
            this.entries.splice(index, 1);
            localStorage.setItem('entries', JSON.stringify(this.entries));
        }
    }
  
    // searches for task index in this.tasks in order to update or delete it
    getIndexByToken(token) {
        for (let i = 0; i < this.entries.length; i++) {
            if (this.entries[i].token === token) {
            return i;
            }
        }
        // if not in this.tasks
        return -1;
    }
  
    // getter method to generate a random token for a task
    get token() {
        return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
    }
};
  