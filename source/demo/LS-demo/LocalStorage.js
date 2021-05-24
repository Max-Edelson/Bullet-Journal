export default class LocalStorage {
    constructor() {
        // if item by key of array is not defined, empty array
        this.entries = JSON.parse(localStorage.getItem('entries')) || [];
        this.custom = JSON.parse(localStorage.getItem('custom')) || [];
    }
  
    // create task
    create(data) {
        data.token = this.token;

        // add to entries
        if (!data.addToCustom) {
            this.entries.push(data);
            localStorage.setItem('entries', JSON.stringify(this.entries));
        }
        // else add to custom
        else {
            this.custom.push(data);
            localStorage.setItem('custom', JSON.stringify(this.custom));
        }
    }
  
    // update/edit task
    update(data) {
        let index;

        // if entries
        if (!data.addToCustom) {
            index = this.getIndexByToken(data.token);
            // if index is found, update this.entries and rewrite localStorage item
            if (index !== -1) {
                // update entries 
                this.entries[index] = data;
                localStorage.setItem('entries', JSON.stringify(this.entries));
            }
        } 
        // else custom
        else {
            index = this.getIndexByTokenCustom(data.token);
            // if index is found, update this.custom and rewrite localStorage item
            if (index !== -1) {
                // update custom 
                this.custom[index] = data;
                localStorage.setItem('custom', JSON.stringify(this.custom));
            }
        } 
    }
  
    // delete task
    delete(data) {
        let index;

        // if entries
        if (!data.addToCustom) {
            index = this.getIndexByToken(data.token);
            // if index is found, delete it from this.entries and rewrite localStorage item
            if (index !== -1) {
                // delete from entries 
                this.entries.splice(index, 1);
                localStorage.setItem('entries', JSON.stringify(this.entries));
            }
        } 
        // else custom
        else {
            index = this.getIndexByTokenCustom(data.token);
            // if index is found, delete it from this.custom and rewrite localStorage item
            if (index !== -1) {
                // delete from custom 
                this.custom.splice(index, 1);
                localStorage.setItem('custom', JSON.stringify(this.custom));
            }
        } 
    }
  
    // searches for entry index in this.entries in order to update or delete it
    getIndexByToken(token) {
        for (let i = 0; i < this.entries.length; i++) {
            if (this.entries[i].token === token) {
                return i;
            }
        }
        // if not in array
        return -1;
    }

    // searches for entry index in this.custom in order to update or delete it
    getIndexByTokenCustom(token) {
        for (let i = 0; i < this.custom.length; i++) {
            if (this.custom[i].token === token) {
                return i;
            }
        }
        // if not in array
        return -1;
    }
  
    // getter method to generate a random token for a task
    get token() {
        return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
    }
};
  
export.module = LocalStorage;