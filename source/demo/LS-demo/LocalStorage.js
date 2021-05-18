export default class LocalStorage {
    constructor() {
        // if item by key 'tasks' is not defined, empty array
        this.tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    }
  
    // create task
    create(data) {
        data.token = this.token;
        this.tasks.push(data);
        localStorage.setItem('tasks', JSON.stringify(this.tasks));
    }
  
    // update/edit task
    update(data) {
        let index = this.getIndexByToken(data.token);
    
        if (index !== -1) {
            this.tasks[index] = data;
            localStorage.setItem('tasks', JSON.stringify(this.tasks));
        }
    }
  
    // delete task
    delete(data) {
        let index = this.getIndexByToken(data.token);
    
        console.log(data.token);
        console.log(this.tasks);

        // if index is found, delete it from this.tasks and rewrite localStorage item
        if (index !== -1) {
            this.tasks.splice(index, 1);
            localStorage.setItem('tasks', JSON.stringify(this.tasks));
        }
    }
  
    // searches for task index in this.tasks in order to update or delete it
    getIndexByToken(token) {
        for (let i = 0; i < this.tasks.length; i++) {
            if (this.tasks[i].token === token) {
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
  